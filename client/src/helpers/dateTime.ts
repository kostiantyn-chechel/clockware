export const dateToString = (date: Date): string => {
    return [
        date.getFullYear(),
        date.getMonth() < 9 ? '0' + (date.getMonth() +1) : date.getMonth() + 1,
        date.getDate() <= 9 ? '0' + date.getDate() : date.getDate(),
    ].join('-');
};

export const today = (): string => {
    const day = new Date(Date.now());
    return dateToString(day);
};

export const todayPlus = (shift: number): string => {
    const d = new Date(Date.now());
    d.setMonth(d.getMonth() + shift);
    return dateToString(d)
};

export const nowTimeString = ():string => {
    const today = new Date(Date.now());
    today.setHours(today.getHours() + 1, 0, 0);
    return today.getHours() + ':00';
};

export const hoursToWords = (number: string): string => {
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

export const sizeByNumber = (number: number): string => {
    switch (number) {
        case 1:
            return 'маленькие';
        case 2:
            return 'средние';
        case 3:
            return 'большие';
        default:
            return 'неизвестно';
    }
};

export const dayToString = (day: string): string => day.slice(0, 10);

export const nowTimePlus = (): string => {
    const time = new Date();
    if (time.getHours() < 9 ) return `0${time.getHours() +1}:00`;
    if (time.getHours() === 23 ) return '00:00';
    if (time.getHours() === 24 ) return '01:00';
    return `${time.getHours() +1}:00`;
};

export const checkingDeadline = (date: string, time: string, hours: number) => {
    const rightNow = new Date();
    const orderDate = new Date(date);
    orderDate.setHours(+time.slice(0, time.length - 3) + hours, 0, 0);

    const dateDifference = orderDate.valueOf() - rightNow.valueOf();
    if (dateDifference <= 0) return `overdue: ${ - Math.round(dateDifference/(1000*60*60*24))} дней`;
    if (dateDifference > 86400000) {
        console.log(orderDate);
        console.log(rightNow);
        return `дней: ${Math.round(dateDifference/(1000*60*60*24))}`;
    } else {
        console.log('orderDate', orderDate);
        console.log('rightNow', rightNow);
        return `часов: ${Math.round(dateDifference/(1000*60*60))}`
    }
};