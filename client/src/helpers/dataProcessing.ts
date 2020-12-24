import {ICity, OrderCityType, OrderClientType, OrderMasterType} from "../interfaces";

export const cityById = (cityId: number, cityArr: ICity[]): string => {
    const city = cityArr.find(city => city.id === cityId);
    if (city) return city.name;
    return  'город удален';
};

export const validName = (obj: OrderMasterType | OrderCityType): string => {
    if (obj) return obj.name;
    return 'запись удалена';
};

export const validClient = (obj: OrderClientType): string => {
    if (obj) return `${obj.name} (${obj.login})`;
    return 'запись удалена';
};

