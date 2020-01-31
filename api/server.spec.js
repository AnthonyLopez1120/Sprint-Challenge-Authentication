const request = require("supertest")
const server = require('./server')

describe('server.js accessing routes', ()=>{
    describe('register', ()=>{
        it('returns 200', async()=>{
            const res = await request(server)
            .post('/api/auth/register')
            .send({
                username: Date.now(),
                password: "password"
            });
            expect(res.status).toBe(200)
        })

        it('checks for error if missing user info', async ()=>{
            const res = await request(server)
            .post('/api/auth/register')
            // .send({
            //     username: Date.now(),
            //     password: "password"
            // })
            expect(res.status).toBe(500)
        })
    })

    describe('Attempting to login', ()=>{
        it('returns 200', async ()=>{
            const res = await request(server)
            .post('api/auth/login')
            .send({
                username: "anthony",
                password: 'lopez'
            })
            expect(res.status).toBe(200)
        })

        it("Error if login info is missing", async () => {
            const res = await request(server).post("/api/auth/login")
            // .post('api/auth/login')
            // .send({
            //     username: "anthony",
            //     password: 'lopez'
            // })
            expect(res.status).toBe(500);
        });

        
    })
})