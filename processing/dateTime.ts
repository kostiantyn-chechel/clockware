const timesByWords = (number: string): string => {
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

const dayToString = (day: Date): string => {
    return [
        day.getFullYear(),
        day.getMonth() < 9 ? '0' + (day.getMonth() + 1) : day.getMonth() + 1,
        day.getDate() < 9 ? '0' + day.getDate() : day.getDate(),
    ].join('-');
};

export const onlyDayToString = (day: string): string => {
    return day.slice(0,10)
};

module.exports ={
    dayToString,
    timesByWords,
    onlyDayToString,
};