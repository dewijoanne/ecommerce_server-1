const request = require('supertest');
const app = require('../app');
const {sequelize,User} = require('../models')
const {queryInterface} = sequelize
const jwt = require('jsonwebtoken')

const userDummy = {email: 'john@mail.com', password: '123456', role:'Admin'}
const bannerDummy = {
    title: 'PS5',
    image_url: 'https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png',
    status: 'on',
    }

const editedDummy = {
  title: 'PS5 lain',
  image_url: 'https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png',
  status: 'off',
    }

let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huQG1haWwuY29tIiwiaWF0IjoxNjAwNTA2ODU3fQ.hr6VB88EZ53xtsPTDXKqdE47F2dMm-xNTKDb9V_KpXo'


describe.only('Get All banners >> GET /banners', function() {
    it('return array of find All object and status 200', function(done) {
    request(app)
        .get('/banners')
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        .then(response => {
            const {body,status} = response
            expect(status).toBe(200)
            body.forEach(obj => {
                console.log('ini di body',obj);
                expect(obj).toHaveProperty('title', expect.any(String))
                expect(obj).toHaveProperty('image_url', expect.any(String))
                expect(obj).toHaveProperty('status', expect.any(String))
            });
            done()
            })
    });    
});

//CREATE BANNER 

describe('banners Create >> POST /banners', function() {
    it('return array of find All object and status 200', function(done) {
    request(app)
        .post('/banners')
        .send(bannerDummy)
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('title', expect.any(String))
            expect(body).toHaveProperty('image_url', expect.any(String))
            expect(body).toHaveProperty('status', expect.any(String))
            done()
            })
    });    
});

describe('Create banners without access_token >> POST /banners', function() {
    it('failed create banner return errors and status 401', function(done) {
    request(app)
        .post('/banners')
        .send(bannerDummy)
        .set('access_token', '')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            let errors = body.errors[0]
            expect(status).toBe(401)
            expect(errors).toMatch('User not authenticated')
            done()
        })
    });    
});

describe('Create banners with wrong access_token >> POST /banners', function() {
    it('failed create banner return errors and status 401', function(done) {
    request(app)
        .post('/banners')
        .send(bannerDummy)
        .set('access_token', 'tokensiapanichhh')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            let errors = body.errors[0]
            expect(status).toBe(401)
            expect(errors).toMatch('User not authenticated')
            done()
        })
    });    
});

describe('Create banners with empty values >> POST /banners', function() {
    it('failed create banner return errors and status 401', function(done) {
    request(app)
        .post('/banners')
        .send( {title: '',image_url: '',status:''})
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty(Object.keys(response.body));
            done()
        })
    });    
});

//UPDATE banner
describe('Edit banner by Id >> PUT /banners', function() {
    it('return edited value and status 200', function(done) {
    request(app)
        .put('/banners/16')
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        .send(editedDummy)
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            expect(status).toBe(200)
            expect(body[0]).toBe(1);
            done()
            })
    });    
});

describe('Update banners without access_token >> PUT /banners', function() {
    it('failed update banner return errors and status 401', function(done) {
    request(app)
        .put('/banners/16')
        .send(editedDummy)
        .set('access_token', '')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            let errors = body.errors[0]
            expect(status).toBe(401)
            expect(errors).toMatch('User not authenticated')
            done()
        })
    });    
});

describe('Update banners with wrong access_token >> PUT /banners', function() {
    it('failed update banner return errors and status 401', function(done) {
    request(app)
        .put('/banners/16')
        .send(editedDummy)
        .set('access_token', 'tokensiapanichhh')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            let errors = body.errors[0]
            expect(status).toBe(401)
            expect(errors).toMatch('User not authenticated')
            done()
        })
    });    
});

describe('Update banners with empty values >> put /banners', function() {
    it('failed Update banner return errors and status 401', function(done) {
    request(app)
        .put('/banners/16')
        .send( {title: '',image_url: '',status:''})
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty(Object.keys(response.body));
            done()
        })
    });    
});

//DELETE banner

describe('Delete banner by Id >> DELETE /banners', function() {
    it('return deleted value and status 200', function(done) {
    request(app)
        .delete('/banners/16')
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            expect(status).toBe(200)
            expect(body).toBe(1);
            done()
            })
    });    
});

describe.only('Delete banners without access_token >> DELETE /banners', function() {
    it('failed delete banner return errors and status 401', function(done) {
    request(app)
        .delete('/banners/16')
        .set('access_token', '')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            let errors = body.errors[0]
            expect(status).toBe(401)
            expect(errors).toMatch('User not authenticated')
            done()
        })
    });    
});

describe.only('Delete banners with wrong access_token >> DELETE /banners', function() {
    it('failed delete banner return errors and status 401', function(done) {
    request(app)
        .delete('/banners/16')
        .set('access_token', 'tokensiapanichhh')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            let errors = body.errors[0]
            expect(status).toBe(401)
            expect(errors).toMatch('User not authenticated')
            done()
        })
    });    
});