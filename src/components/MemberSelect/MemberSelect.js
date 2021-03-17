import React, { useState, useEffect } from 'react';
import classes from './MemberSelect.module.scss';
import { connect } from 'react-redux';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text, Modal, Tooltip, ProfileImg } from '..';

const MemberSelect = (props) => {

    const [chosenMembers, setChosenMembers] = useState([]);
    const [members, setMembers] = useState();
    const [showMembers, setShowMembers] = useState(false);

    useEffect(() => {

        const chosen = [], notChosen = [];
        props.user.users.forEach( user => { //props.value = {userId: true, userId2: true}
            const isUserFound = props.value && props.value.find( userId => userId === user.userId);
            if(isUserFound) chosen.push(user);
            else notChosen.push(user);
        });

        setMembers(notChosen);
        setChosenMembers(chosen);
    }, [props.value, props.user.users]);

    const onChange = (newChosenMembers) => {
        const memberIds = [];
        newChosenMembers.forEach( member => memberIds.push(member.userId));
        console.log(memberIds);
        props.onChange(memberIds);
    }

    const addMemberHandler = () => {
        setShowMembers(!showMembers);
    }

    const addToChosenMembers = (member) => {

        let newChosenMembers = [...chosenMembers];
        newChosenMembers.push(member);

        const filteredMembers = members.filter( person => person.userId !== member.userId);

        onChange(newChosenMembers);
        setShowMembers(false);
        setChosenMembers(newChosenMembers);
        setMembers(filteredMembers);
    }

    const removeChosenMembers = (member) => {
        let newMembers = [...members];
        newMembers.push(member);

        const filteredChosenMembers = chosenMembers.filter( person => person.userId !== member.userId);

        onChange(filteredChosenMembers);
        setShowMembers(false);
        setChosenMembers(filteredChosenMembers);
        setMembers(newMembers);
    }
    
    return (
        <div className={classes.memberSelect}>

            <FontAwesomeIcon icon={faPlusSquare} className={classes.addMemberIcon} onClick={addMemberHandler} />

            <div className={classes.members}>
                {chosenMembers && chosenMembers.map(member => (
                    <div className={classes.member} key={member.userId}>
                        <div onClick={removeChosenMembers.bind(this, member)}>
                            <Tooltip text={`remove`} >
                                <ProfileImg src={member.imageUrl} className={classes.memberImg}/>
                            </Tooltip>
                        </div>
                        <Text>{member.name}</Text>
                    </div>
                ))}
            </div>


            <Modal isOpen={showMembers} onClose={() => setShowMembers(false)} title="Select members:">
                <div className={classes.members}>
                    {showMembers && members && members.map(member => (
                        <div className={classes.member} onClick={addToChosenMembers.bind(this, member)} key={member.userId}>
                            <ProfileImg src={member.imageUrl} className={classes.memberImg}/>
                            <Text>{member.name}</Text>
                        </div>
                    ))}
                </div>
            </Modal>

        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps)(MemberSelect);
