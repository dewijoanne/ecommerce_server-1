const request = require('supertest');
const app = require('../app');
const {sequelize} = require('../models')


const userData = {email: 'john@mail.com', password: '123456', role: 'Admin'}


describe.only('User Registration Test >> POST /register', function() {
    it('success register and return new object and status 201', function(done) {
    request(app)
    .post('/register')
    .send(userData)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
        const {body,status} =response
        expect(status).toBe(201)
        expect(body).toHaveProperty('email', userData.email)
        expect(body).toHaveProperty('message', 'Successfully registered')
        done()
        })
    })
});


describe.only('User Login Test >> POST /login', function() {
    it('success login and return new token,email, and status 200', (done) => {
        request(app)
        .post('/login')
        .send(userData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} =response
            console.log(body);
            expect(status).toBe(200)
            expect(body).toHaveProperty('role', 'Admin')
            expect(body).toHaveProperty('email', userData.email)
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
    });
});

describe('User Login No Email and Password >> POST /login', function() {
    it('failed login and return errors and status 400', (done) => {
        request(app)
        .post('/login')
        .send({email: '', password: ''})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty(Object.keys(response.body))
            done()
        })
    });
});

describe('User Login Email not registered >> POST /login', function() {
    it('failed login return errors and status 400', (done) => {
        request(app)
        .post('/login')
        .send({email: 'trump@mail.com', password: '123456'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            let errors = body.errors[0]
            expect(status).toBe(400)
            expect(errors).toMatch('Register first!')
            done()
        })
    });
});

describe('User Login with wrong password >> POST /login', function() {
    it('failed login return errors and status 400', (done) => {
        request(app)
        .post('/login')
        .send({email: 'john@mail.com', password: '1453223456'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            let errors = body.errors[0]
            expect(status).toBe(400)
            expect(errors).toMatch('Invalid username or password!')
            done()
        })
    });
});