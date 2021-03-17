import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './CardStatistic.module.scss';
import { Card, Text } from '../';

const CardStatistic = (props) => {

    let iconClasses = [classes.circle];
    switch(props.iconBG) {
        case "yellow": iconClasses.push(classes.yellow); break;
        case "blue": iconClasses.push(classes.blue); break;
        case "purple": iconClasses.push(classes.purple); break;
        case "pink": iconClasses.push(classes.pink); break;
        default: iconClasses.push(classes.blue);
    };

    let percClasses = [classes.percText];
    if (props.perc) {
        switch (props.perc.color) {
            case "red": percClasses.push(classes.red); break;
            default: percClasses.push(classes.green);
        }
    }

    let cardClasses = [classes.card];
    props.className && cardClasses.push(props.className);

    return (
        <Card className={cardClasses.join(' ')}>
            <div className={iconClasses.join(' ')}>
                <FontAwesomeIcon icon={props.icon} />
            </div>

            <Text type="h2" className={classes.largeText}>{props.value}</Text>
            <Text size16 opac70 padB15>{props.title}</Text>

            {
                props.perc && (
                    <Text size16 className={percClasses.join(' ')}>
                        <FontAwesomeIcon icon={props.perc.icon} /> {props.perc.value}%
                    </Text>
                )
            }

        </Card>
    )
}

export default CardStatistic;
