const relativeDateFormat = (previousDate) => {

    const minutes = 60 * 1000;
    const hours = minutes * 60;
    const days = hours * 24;
    const months = days * 30; //28, 31
    const years = days * 365;

    const currentDate = new Date();
    const secondsPast = (currentDate.getTime() - previousDate.getTime());

    let timeName, time;
    if (secondsPast < minutes) {
        time = 1000;
        timeName = 'seconds';
    } else if (secondsPast < hours) {
        time = minutes;
        timeName = 'minutes';
    } else if (secondsPast < days) {
        time = hours;
        timeName = 'hours';
    } else if (secondsPast < months) {
        time = days;
        timeName = 'days';
    } else if (secondsPast < years) {
        time = months;
        timeName = 'months';
    }

    const value = Math.round(secondsPast/time);
    if (value === 1) timeName = timeName.slice(0, -1);
    
    return `${value} ${timeName} ago`;
}

export default relativeDateFormat;