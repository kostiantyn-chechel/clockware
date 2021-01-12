export const dateToString = (date: Date): string => {
    return [
        date.getFullYear(),
        date.getMonth() < 9 ? '0' + (date.getMonth() +1) : date.getMonth() + 1,
        date.getDate() <= 9 ? '0' + date.getDate() : date.getDate(),
    ].join('-');
};

export const today = (): string => {
    const day = new Date();
    return dateToString(day);
};

export const nowTimeString = ():string => {
    const today = new Date();
    today.setHours(today.getHours() + 1, 0, 0);
    return today.getHours() + ':00';
};

export const hoursByWords = (number: string): string => {
    switch (number) {
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

export const dayToString = (day: string): string => {
    return day.slice(0,10)
};