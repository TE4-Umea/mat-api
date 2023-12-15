const app = require('../app');
const request = require('supertest');

describe('1. Setup', () => {
    describe('GET /api/dish ', () => {
        it('should return a 200 response', async () => {
            expect.assertions(1);
            const response = await request(app).get('/');
            expect(response.statusCode).toBe(200);
        });
    });
});