import { IMasterResToCalendar, IMasterToCalendar, IRating } from '../Type/interfaces';

export const masterToCalendar = (masters: IMasterResToCalendar[]): IMasterToCalendar[] => {
    return masters.map(master => {
        return {
            id: master.id,
            name: master.name,
            rating: calculateRating(master.reviews),
        }
    });
};

const calculateRating = (rating: IRating[]): number => {
    const rrr = rating.reduce((sum, current) => {
        return sum + current.rating;
    }, 0);

    return rating.length ? rrr / rating.length : 1
};