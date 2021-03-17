import React, { useEffect } from 'react';
import classes from './Dashboard.module.scss';
import { connect } from 'react-redux';
import { getAllStatus, getAllProjects } from '../../redux/actions'

import { Button, CardProject, CardStatistic, CardStatus,  Text } from '../../components';
import { faTag, faSync, faCopy, faUserFriends, faLongArrowAltUp, faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons';

const Dashboard = (props) => {

    const stats = [ 
        { icon: faSync, iconBG: "yellow", title: "Status updates", value: 50, perc: { value: 10, color: "green", icon: faLongArrowAltUp} },
        { icon: faCopy, iconBG: "blue", title: "Projects", value: 24, perc: { value: 5, color: "red", icon: faLongArrowAltDown} },
        { icon: faTag, iconBG: "purple", title: "Tags", value: 156 },
        { icon: faUserFriends, iconBG: "pink", title: "Users", value: 86, },
    ];

    // get all status
    useEffect( () => {
        //props.getAllStatus();
        //props.getAllProjects();
    }, [])

    useEffect( () => {

    })

    const { statuses } = props.status;
    const { projects } = props.project;
    return (
        <main className={classes.dashboard}>

            <header>
                <div className={classes.title}>
                    <Text type="h1" light opac80 size24>Overview Statistics</Text>
                    <Button primary fontSize="s">Last 30 Days</Button>
                </div>

                <div className={classes.cards}> 
                    { stats.map( 
                        item => <CardStatistic 
                            key={item.title}
                            icon={item.icon}
                            iconBG={item.iconBG}
                            title={item.title}
                            value={item.value}
                            perc={item.perc && item.perc}
                            className={classes.card}
                        />)
                    }
                </div>
            </header>

            <section className={classes.content}>
                <article className={classes.statuses}>
                    <Text type="h1" size24 opac80 light padB10>Status Updates</Text>
                    
                    { statuses.length > 0 ?
                        statuses.map( status => <CardStatus key={status.statusId} {...status}/>)
                        : 
                        <Text>No status found!</Text>
                    }
                </article>

                <article className={classes.projects}>
                    <div className={classes.header}>
                        <Text type="h1" size24 opac80 light>Projects</Text>

                        <div className={classes.headerRight}>
                            <Text opac80 underline>See All Projects</Text>
                            <Text type="span" primary size24 padL15>&laquo;</Text>
                            <Text type="span" primary size24 padL10>&raquo;</Text>
                        </div>
                    </div>

                    <section className={classes.projectsCards}>
                        { projects.length > 0 ?
                            projects.map( project => <CardProject key={project.projectId} {...project} />)
                            :
                            <Text>No Projects Found!</Text>
                        }
                    </section>

                </article>
            </section>
            
        </main>
    )
}

const mapStateToProps = state => ({
    status: state.status,
    project: state.project
});

const mapDispatchToProps = {
    getAllStatus,
    getAllProjects
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
