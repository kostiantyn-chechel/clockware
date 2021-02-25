const axios = require('axios');
const auth = require('../processing/auth');

axios.defaults.baseURL = 'http://localhost:3001';

const token = auth.mockToken();

describe('API: /cities', () => {
    beforeAll(async (done) => {
        // ТУТ залить seeds ???
        done()
    });

    describe('GET city', () => {

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

    describe('ADD & DEL city', () => {
        let newCityId = 0;

        test('/post should add Kharkiv', async () => {
            const newCity = {name: 'Kharkiv'};
            const expCity = await axios.post('/cities', newCity, { headers: { 'x-access-token': token } });

            newCityId = expCity.data.id;

            expect(expCity.data.name).toBe(newCity.name);
        });

        test('/del/id should deleted Kharkiv', async () => {
            const expCity = await axios.delete(`/cities/${newCityId}`, { headers: { 'x-access-token': token } });

            expect(expCity.data.message).toBe(`City with id=${newCityId} was deleted successfully!`);
        });

        test('/del/id (id = 0) should return error message', async () => {
            const id = 0;
            const expCity = await axios.delete(`/cities/${id}`, { headers: { 'x-access-token': token } });

            expect(expCity.data.message).toBe(`Cannot delete City with id=${id}. Maybe City was not found!`);
        });
    });

    describe('PUT city', () => {
        let newCityId;
        beforeEach(async (done) => {
            const newCity = {name: 'Kharkiv'};
            const expCity = await axios.post('/cities', newCity, { headers: { 'x-access-token': token } });
            newCityId = expCity.data.id;
            done();
        });
        afterEach(async (done) => {
            await axios.delete(`/cities/${newCityId}`, { headers: { 'x-access-token': token } });
            done()
        });

        test('/put/id should return successes message & successes change name city', async () => {
            const newNameCity = {name: 'Kherson'};
            const expCity = await axios.put(`/cities/${newCityId}`, newNameCity,{ headers: { 'x-access-token': token } });

            const city = await axios.get(`/cities/${newCityId}`, {headers: { 'x-access-token': token }});

            expect(city.data.name).toBe(newNameCity.name);
            expect(expCity.data.message).toBe(`City with id=${newCityId} was updated successfully.`);
        });
    });

});