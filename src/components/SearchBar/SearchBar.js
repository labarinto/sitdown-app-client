import React, { useState, useEffect, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './SearchBar.module.scss';
import { Card, Text } from '../';

const SearchBar = (props) => {

    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [matchedData, setMatchedData] = useState([]);
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const inputRef = useRef(null)

    useEffect( () => {
        setData(props.data);
    }, [props.data]);

    const queryHandler = (event) => {
        
        const searchQuery = event.target.value;
        const formattedSearchQuery = formatWords(searchQuery.toLowerCase());
        let matched = [];
        let showPlaceholder = true;

        if(searchQuery) {
            matched = data && data.filter(data => formatWords(data).startsWith(formattedSearchQuery));
            showPlaceholder = false;
        }

        setShowPlaceholder(showPlaceholder);
        setMatchedData(matched);
        setQuery(searchQuery);
    }

    const formatWords = data => data.replace(/[\s-]/g, "");

    const searchHandler = (search) => {

        props.onSearch(search);
        setQuery('');
        setMatchedData([]);
        setShowPlaceholder(true);
    }

    const placeholderHandler = () => {
        inputRef.current.focus();
    }

    return (
        <Card className={classes.card}>
            <div className={classes.searchBar}>
                {showPlaceholder && <div className={classes.seachLabel} onClick={placeholderHandler}>
                    <FontAwesomeIcon icon={faSearch} className={classes.icon} />
                    <label>{props.placeholder}</label>
                </div>}
                
                <input 
                    type="text" 
                    name="search" 
                    value={query} 
                    onChange={queryHandler} 
                    autoComplete="off" 
                    ref={inputRef}
                    disabled={props.disabled}
                />

                <div className={classes.searchRight}>
                    <Text type="h2" size20 opac70 padL15>Search</Text>
                    {props.children}
                </div>
            </div>

            { matchedData && matchedData.length > 0 && <Card className={classes.searchSuggestions}>
                {matchedData.map(item => <div key={item} onClick={() => searchHandler(item)}>
                    <Text size20 padY5>{item}</Text>
                </div>)}
            </Card>} 
        </Card>
    )
}

export default SearchBar;
