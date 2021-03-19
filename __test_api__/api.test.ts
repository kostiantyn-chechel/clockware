// @ts-ignore
const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:3001';

describe('test server port 3001', () => {

    test('/get should response "zzz"', async () => {
        const zzz = await axios.get('/zzz');
        expect(zzz.data).toEqual('ZZZ')
    });

});