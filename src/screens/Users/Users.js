import React from 'react';
import classes from './Users.module.scss';
import { connect } from 'react-redux';

import { SearchBar, Text, ProfileImg } from '../../components';

const Users = (props) => {
    return (
        <main className={classes.users}>

            <SearchBar placeholder="Find Users" disabled/>

            <div className={classes.headings}>
                <Text size20>Updates</Text>
                <Text size20>Teams</Text>
                <Text size20>Projects</Text>
            </div>

            <section>

                { props.user.users.map( user => (
                    <article key={user.userId}>
                        <div className={classes.flex}>
                            <ProfileImg src={user.imageUrl} className={classes.circle}/>

                            <div className={classes.text}>
                                <Text type="h3" size20 padB5 capitalise>{user.name}</Text>
                                <Text size16 opac60>{user.position ? user.position : 'N/A'}</Text>
                            </div>
                        </div>

                        <div className={`${classes.flex} ${classes.stats}`}>
                            <div className={classes.red}>0</div>
                            <div className={classes.blue}>4</div>
                            <div className={classes.green}>4</div>
                        </div>
                    </article>
                ))}

            </section>
        </main>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(Users);
