// import { mockToken } from '../processing/auth';

const axios = require('axios');
const auth = require('../processing/auth');

axios.defaults.baseURL = 'http://localhost:3001';

const token = auth.mockToken();

describe('API: /cities', () => {
    beforeAll(async (done) => {
        // ТУТ залить seeds ???
        done()
    });

    test('/get should response [Dnipro, Kyiv, Lviv]', async () => {
        const cityList = await axios.get('/cities');

        const expCityList = [
            { id: 1, name: 'Dnipro' },
            { id: 2, name: 'Kyiv' },
            { id: 3, name: 'Lviv' },
        ];
        expect(cityList.data).toEqual(expCityList);
    });

    test('/get/:id should response 1: Dnipro,  3: Lviv', async () => {
        const city1 = await axios.get('/cities/1', {headers: { 'x-access-token': token }});
        const city3 = await axios.get('/cities/3', {headers: { 'x-access-token': token }});

        expect(city1.data.name).toBe('Dnipro');
        expect(city3.data.name).toBe('Lviv');
    });

});