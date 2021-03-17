import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getStatusByTag } from '../../redux/actions';
import { useLocation, Link } from 'react-router-dom';

import classes from './Tags.module.scss';
import { Text, Divider, SearchBar, IconCard, IconTable, CardStatus, Button } from '../../components';
import Loading from '../Loading/Loading';
import relativeDateFormat from '../../util/relativeDateFormat';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

const Tags = (props) => {

    const [dateTitles, setDateTitles] = useState();
    const [dateKeys, setDateKeys] = useState([]);
    const [activeTag, setActiveTag] = useState();
    const queryParams = useQuery();

    const prepareTitles = (statuses) => {
        let dateTitlesObject = {};

        statuses && statuses.forEach( status => {
            let formattedDate = relativeDateFormat(new Date(status.createdAt));
            const time = formattedDate.split(' ')[1].substring(0, 3); //[43, minutes, ago]
            if(time === 'min' || time === 'hou' || time === 'sec') formattedDate = 'Today';

            const isFound = Object.keys(dateTitlesObject).find( title => title === formattedDate);
            if (!isFound) {
                dateTitlesObject[formattedDate] = [status];
            } else {
                dateTitlesObject[formattedDate].push(status);
            }
        });

        setDateTitles(dateTitlesObject);
        setDateKeys(Object.keys(dateTitlesObject));
    }

    useEffect( () => {
        prepareTitles(props.status.filteredStatus);
    }, [props.status.filteredStatus]);
    

    useEffect(() => {
        prepareTitles(props.status.statuses);
    }, [props.status.statuses]);

    const clearSearch = () => {
        prepareTitles(props.status.statuses);
        setActiveTag('');
    };

    const searchHandler = (query) => {
        props.getStatusByTag(query);
        setActiveTag(query);
    }

    const queryParamsTag = queryParams.get("tag");
    const { getStatusByTag } = props;
    useEffect(() => {
        if (queryParamsTag) {
            getStatusByTag(queryParamsTag);
            setActiveTag(queryParamsTag);
        };
    }, [queryParamsTag, getStatusByTag]); 

    if (props.status.isLoading) return <Loading />

    return (
        <main className={classes.tags}>

            <SearchBar 
                data={props.status.tags}
                placeholder="Find updates by tags"
                onSearch={searchHandler}
            >
                <Link to="/tags"><Button primary onClick={clearSearch} className={classes.button}>Clear search</Button></Link>
            </SearchBar>
            
            <div className={classes.optionsContainer}>
                <div className={classes.icon}>
                    <IconTable /><Text type="span" size16 padL5>Table</Text>
                </div>

                <div className={`${classes.icon} ${classes.active}`}>
                    <IconCard /><Text type="span" size16 padL5>Card</Text>
                </div>
            </div>

            <section className={classes.statuses}>

                {activeTag && <Text primary size24 padB15>
                    Search results for tag: <Text type="span" size24>{activeTag}</Text>
                </Text>}

                { dateKeys.length > 0 ? dateKeys.map( (date, index) => (
                    <section key={`${date}-${index}`}>
                        <Divider title={date} />

                        <article>
                            { dateTitles[date].map( status => (
                                <CardStatus key={status.statusId} {...status} view="table" margin/>
                            ))}
                        </article>
                    </section>
                    
                )) : <h1>No Status Found! Please search again!</h1>}
            </section>

        </main>
    )
}

const mapStateToProps = state => ({
    status: state.status,
});

const mapDispatchToProps = {
    getStatusByTag
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
