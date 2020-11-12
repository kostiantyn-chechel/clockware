const timesByWords = number => {
    switch (number + '') {
        case '1':
            return 'один час';
        case '2':
            return 'два часа';
        case '3':
            return 'три часа';
        default:
            return 'несколько часов';
    }
};

const dayToString = day => {
    return [
        day.getFullYear(),
        day.getMonth() < 9 ? '0' + (day.getMonth() + 1) : day.getMonth() + 1,
        day.getDate() < 9 ? '0' + day.getDate() : day.getDate(),
    ].join('-');
};

module.exports ={
    dayToString,
    timesByWords,
};