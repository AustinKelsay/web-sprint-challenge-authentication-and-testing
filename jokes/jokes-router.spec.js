const request = require("supertest");
const db = require("../database/dbConfig");
const server = require("../api/server");

describe('/jokes', () => {
    it('returns 400 status code', () => {
        return request(server).get('/api/jokes')
            .expect(400)
    })

    it('returns the message associated with failed auth', () => {
        return request(server).get('/api/jokes')
        .then((res) => {
            expect(res.body.message).toBe("your not logged in and pre you got to be to have access to this privelage");
        })
    })

})