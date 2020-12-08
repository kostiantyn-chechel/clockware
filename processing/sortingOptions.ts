import { TSortBy, TSortIn, TSortOut } from "../Type/interfaces";

const sortingOrders = (sortBy: TSortBy, sort: TSortIn): string[] => {
    const sortArr = sortColumn(sortBy);
    sortArr.push(sortDirection(sort));
    return sortArr
};

const sortColumn = (sortBy: TSortBy): string[] => {
    switch (sortBy) {
        case 'date':
            return ['date'];
        case 'time':
            return ['time'];
        case 'hours':
            return ['hours'];
        case 'photo':
            return ['photoURL'];
        case 'client':
            return ['order_client', 'name'];
        case 'master':
            return ['order_master', 'name'];
        case 'city':
            return ['order_city', 'name'];
        default:
            return ['id']
    }
};

const sortDirection = (sort: TSortIn): TSortOut => sort === 'asc' ? 'ASC' : 'DESC';

module.exports = {
    sortingOrders,
};