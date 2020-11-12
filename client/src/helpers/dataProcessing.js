export const cityById = (cityId, cityArr) => {
    const city = cityArr.find(city => city.id === cityId);
    if (city) return city.name;
    return  'город удален';
};

export const masterById = (masterId, masterArr) => {
    const master = masterArr.find(master => master.id === masterId);
    if (master) return  master.name;
    return 'мастер удален'
};

export const clientById = (clientId, clientArr) => {
    const oneClient = clientArr.find(client => client.id === clientId);
    if (oneClient) return `${oneClient.name} (${oneClient.email})`;
    return 'клиент удален'
};

export const validName = (obj, name) => {
    if (obj) return obj[name];
    return 'запись удалена';
};

export const validClient = obj => {
    if (obj) return `${obj.name} (${obj.email})`;
    return 'запись удалена';
};

