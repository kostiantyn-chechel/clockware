const sortingOrders = (sortBy, sort) => {
    const sortArr = sortColumn(sortBy);
    sortArr.push(sortDirection(sort));
    return sortArr
};

const sortColumn = sortBy => {
    console.log('sortBy', sortBy);
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

const sortDirection = sort => sort === 'asc' ? 'ASC' : 'DESC';

module.exports = {
    sortingOrders,
};