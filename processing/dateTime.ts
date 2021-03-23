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
        day.getDate() < 10 ? '0' + day.getDate() : day.getDate(),
    ].join('-');
};

export const onlyDayToString = (day: string): string => {
    return day.slice(0,10)
};

export const eventDateWithTime = (date: string, time: string, addTime: number = 0): string => {
    const day = new Date(date);
    day.setHours(+time.slice(0, time.length - 3) + addTime);
    const hours = day.getHours() < 10 ? '0' + day.getHours() : ''+ day.getHours();
    return  dayToString(day) + `T${hours}:00:00+02:00`;
}; // 2021-03-19T12:00:00+02:00

module.exports ={
    dayToString,
    timesByWords,
    onlyDayToString,
    eventDateWithTime,
};