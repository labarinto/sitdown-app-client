import React, { useState, useEffect } from 'react';
import classes from './Projects.module.scss';
import { connect } from 'react-redux';
import { openAddProjectModal } from '../../redux/actions';

import { SearchBar, Divider, CardProject, Button } from '../../components';

const Projects = (props) => {

    const [myProjects, setMyProjects] = useState();
    const [otherProjects, setOtherProjects] = useState();

    const userId = props.auth.credentials.userId;
    useEffect( () => {
        const myProjects = [], otherProjects = [];

        props.project.projects.forEach( project => {
            if (project.userId === userId || project.teamMembers[userId]) myProjects.push(project)
            else otherProjects.push(project);
        });

        setMyProjects(myProjects);
        setOtherProjects(otherProjects);
    }, [props.project.cfmMessage, props.project.projects, userId]);

    const openModalHandler = () => {
        props.openAddProjectModal();
    }

    return (
        <main className={classes.projects}>

            <SearchBar
                placeholder="Find Projects"
                onSearch={() => {}}
                disabled
            >   
                <Button primary className={classes.button} onClick={openModalHandler}>Add New Project</Button>
            </SearchBar>
            
            <article>
                <Divider title="My Projects" />

                <section className={classes.container}>
                    { myProjects && myProjects.length > 0 &&
                        myProjects.map( project => 
                            <CardProject key={project.projectId} {...project} className={classes.cardProject} />)
                    }
                </section>
            </article>

            <article>
                <Divider title="Other Projects" />

                <section className={classes.container}>
                    { otherProjects && otherProjects.length > 0 &&
                        otherProjects.map(project => 
                            <CardProject key={project.projectId} {...project} className={classes.cardProject} />)
                    }
                </section>
            </article>
        </main>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    project: state.project,
});


export default connect(mapStateToProps, { openAddProjectModal })(Projects);
