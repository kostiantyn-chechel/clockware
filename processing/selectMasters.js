const selectMasters = (orders, masters, time, hours) => {
    const clientTime = addReservedTime(time, hours);
    const masterList = masters.slice();

    masters.forEach((master) => {
        let reservedTime = [];
        orders.forEach((order) => {
            if (master.id === order.masterId) {
                reservedTime = reservedTime.concat(addReservedTime(order.time, order.hours));
            }
        });
        if (!timeIsFree(clientTime, reservedTime)){
            masterList.splice(masterList.indexOf(master), 1);
        }
    });
    return masterRating(masterList);
};

const masterRating =(masterList) => {
    const mastersList = [];
    masterList.forEach((master) => {
        const newMaster = {};
        newMaster.id = master.id;
        newMaster.cityId = master.cityId;
        newMaster.name = master.name;

        let ratingSum = 0;
        let ratingCnt = 0;
        let masterReview = [];

        if (master.reviews.length){
            master.reviews.forEach((review) => {
                ratingSum += review.rating;
                ratingCnt ++;
                masterReview.push(review.review)
            });
            newMaster.rating = ratingSum / ratingCnt ? ratingSum / ratingCnt : 1;
            newMaster.review = masterReview;
        } else {
            newMaster.rating = 1;
            newMaster.review = [];
        }
        mastersList.push(newMaster);
    });

    return mastersList;
};

module.exports = {
    selectMasters,
    masterRating,
};

const addReservedTime = (time, hours) => {
    const arrTime = [];
    for (let i = 0; i < hours; i++){
        arrTime.push(addHours(time, i))
    }
    return arrTime
};

const timeToInteger = time => {
    return parseInt(time.slice(0, 2));
};

const addHours = (time, hours) => {
    let stringTime = (timeToInteger(time) + hours) + ':00';
    if (stringTime.length < 5) {
        stringTime = '0' + stringTime;
    }
    return  stringTime;
};

const timeIsFree = (clientTime, reservedTime) => {
    let result = true;
    clientTime.forEach((cTime) => {
        if (reservedTime.includes(cTime)) {
            result = false;
        }
    });
    return result
};
