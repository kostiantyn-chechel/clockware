const selectMasters = (orders: any, masters: any, time: any, hours: any) => {
    const clientTime = addReservedTime(time, hours);
    const masterList = masters.slice();

    masters.forEach((master: any) => {
        let reservedTime = <any>[];
        orders.forEach((order: any) => {
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

type NewMasterType = {
    id: number
    cityId: number
    name: string
    login: string
    rating: number
    review: string[]
}

const masterRating = (masterList: any) => {
    const mastersList = <any>[];
    masterList.forEach((master: any) => {
        const newMaster: NewMasterType = {
            id: master.id,
            cityId: master.cityId,
            name: master.name,
            login: master.login,
            rating: 0,
            review: [],
        };

        let ratingSum = 0;
        let ratingCnt = 0;
        let masterReview = <any>[];

        if (master.reviews.length){
            master.reviews.forEach((review: any) => {
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

const addReservedTime = (time: string, hours: number) => {
    const arrTime = [];
    for (let i = 0; i < hours; i++){
        // @ts-ignore
        arrTime.push(addHours(time, i))
    }
    return arrTime
};

const timeToInteger = (time: string) => {
    return parseInt(time.slice(0, 2));
};

const addHours = (time: string, hours: number) => {
    let stringTime = (timeToInteger(time) + hours) + ':00';
    if (stringTime.length < 5) {
        stringTime = '0' + stringTime;
    }
    return  stringTime;
};

const timeIsFree = (clientTime: any[], reservedTime: any[]): boolean => {
    let result = true;
    clientTime.forEach((cTime) => {
        if (reservedTime.includes(cTime)) {
            result = false;
        }
    });
    return result
};