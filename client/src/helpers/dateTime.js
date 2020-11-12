export const today = () => {
    const day = new Date();

    const arrDay = [
        day.getFullYear(),
        day.getMonth() < 9 ? '0' + (day.getMonth() +1) : day.getMonth() + 1,
        day.getDate() <= 9 ? '0' + day.getDate() : day.getDate(),
    ];
    return arrDay.join('-');
};

export const hoursByWords = number => {
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

export const dayToString = day => {
    return day.slice(0,10)
};