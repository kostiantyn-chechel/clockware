const axios = require('axios');
const models = require('../models');
const sf = require('sequelize-fixtures');
const auth = require('../processing/auth');

axios.defaults.baseURL = 'http://localhost:3001';

const token = auth.mockToken();
const tokenHeader = { 'x-access-token': token };

describe('API: /cities', () => {
    beforeAll(async (done) => {
        // ТУТ залить seeds ???
        // await models.sequelize.sync({ alter: true }).then(() => {
        //     // Load Fixtures
        //     sf.loadFiles([
        //         'fixtures/city.json',
        //     ], models).then(() => process.exit());
        // });

        done()
    });

    describe('GET city', () => {

        test('/get should response [Dnipro, Kyiv, Lviv]', async () => {
            const cityList = await axios.get('/cities');

            const expCityList = [
                { id: 3, name: 'Dnipro' },
                { id: 4, name: 'Kyiv' },
                { id: 5, name: 'Lviv' },
            ];
            expect(cityList.data).toEqual(expCityList);
        });

        test('/get/:id should response Dnipro,  Lviv', async () => {
            const city1 = await axios.get('/cities/3', { headers: tokenHeader});
            const city3 = await axios.get('/cities/5', {headers: tokenHeader});

            expect(city1.data.name).toBe('Dnipro');
            expect(city3.data.name).toBe('Lviv');
        });

    });

    describe('ADD & DEL city', () => {
        let newCityId = 0;

        test('/post should add Kharkiv', async () => {
            const newCity = {name: 'Kharkiv'};
            const expCity = await axios.post('/cities', newCity, { headers: tokenHeader });

            newCityId = expCity.data.id;

            expect(expCity.data.name).toBe(newCity.name);
        });

        test('/del/id should deleted Kharkiv', async () => {
            const expCity = await axios.delete(`/cities/${newCityId}`, { headers: tokenHeader });

            expect(expCity.data.message).toBe(`City with id=${newCityId} was deleted successfully!`);
        });

        test('/del/id (id = 0) should return error message', async () => {
            const id = 0;
            const expCity = await axios.delete(`/cities/${id}`, { headers: tokenHeader });

            expect(expCity.data.message).toBe(`Cannot delete City with id=${id}. Maybe City was not found!`);
        });
    });

    describe('PUT city', () => {
        let newCityId;
        beforeEach(async (done) => {
            const newCity = {name: 'Kharkiv'};
            const expCity = await axios.post('/cities', newCity, { headers: tokenHeader });
            newCityId = expCity.data.id;
            done();
        });
        afterEach(async (done) => {
            await axios.delete(`/cities/${newCityId}`, { headers: tokenHeader });
            done()
        });

        test('/put/id should return successes message & successes change name city', async () => {
            const newNameCity = {name: 'Kherson'};
            const expCity = await axios.put(`/cities/${newCityId}`, newNameCity,{ headers: tokenHeader });

            const city = await axios.get(`/cities/${newCityId}`, {headers: tokenHeader});

            expect(city.data.name).toBe(newNameCity.name);
            expect(expCity.data.message).toBe(`City with id=${newCityId} was updated successfully.`);
        });
    });

});