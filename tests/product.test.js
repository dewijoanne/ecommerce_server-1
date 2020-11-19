const request = require('supertest');
const app = require('../app');
const {sequelize,User} = require('../models')
const {queryInterface} = sequelize
const jwt = require('jsonwebtoken')

const userDummy = {email: 'john@mail.com', password: '123456', role:'Admin'}
const productDummy = {
    name: 'PS5',
    image_url: 'https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png',
    price: 1000000,
    category: 'Game Console',
    stock: 30
    }
const editedDummy = {
    name: 'PS5 lain',
    image_url: 'https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png',
    price: 15000,
    category: 'Game Console',
    stock: 10
    }
let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huQG1haWwuY29tIiwiaWF0IjoxNjAwNTA2ODU3fQ.hr6VB88EZ53xtsPTDXKqdE47F2dMm-xNTKDb9V_KpXo'


describe.only('Get All Products >> GET /products', function() {
    it('return array of find All object and status 200', function(done) {
    request(app)
        .get('/products')
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        .then(response => {
            const {body,status} = response
            expect(status).toBe(200)
            body.products.forEach(obj => {
                console.log('ini di body',obj);
                expect(obj).toHaveProperty('id', expect.any(Number))
                expect(obj).toHaveProperty('name', expect.any(String))
                expect(obj).toHaveProperty('image_url', expect.any(String))
                expect(obj).toHaveProperty('category', expect.any(String))
                expect(obj).toHaveProperty('price', expect.any(String))
                expect(obj).toHaveProperty('stock', expect.any(Number))
            });
            done()
            })
    });    
});

//CREATE PRODUCT

describe('Products Create >> POST /products', function() {
    it('return array of find All object and status 200', function(done) {
    request(app)
        .post('/products')
        .send(productDummy)
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('name', expect.any(String))
            expect(body).toHaveProperty('image_url', expect.any(String))
            expect(body).toHaveProperty('category', expect.any(String))
            expect(body).toHaveProperty('price', expect.any(Number))
            expect(body).toHaveProperty('stock', expect.any(Number))
            done()
            })
    });    
});

describe.only('Create products without access_token >> POST /products', function() {
    it('failed create product return errors and status 401', function(done) {
    request(app)
        .post('/products')
        .send(productDummy)
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

describe('Create products with wrong access_token >> POST /products', function() {
    it('failed create product return errors and status 401', function(done) {
    request(app)
        .post('/products')
        .send(productDummy)
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

describe('Create products with empty values >> POST /products', function() {
    it('failed create product return errors and status 401', function(done) {
    request(app)
        .post('/products')
        .send( {name: '',image_url: '',})
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

describe('Create products with stocks less than 0 >> POST /products', function() {
    it('failed create product return errors and status 401', function(done) {
    request(app)
        .post('/products')
        .send({
            name: 'PS5',
            image_url: 'https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png',
            price: 1000000,
            category: 'Game Console',
            stock: 30
            })
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

describe('Create products with prices less than 0 >> POST /products', function() {
    it('failed create product return errors and status 401', function(done) {
    request(app)
        .post('/products')
        .send({
            name: 'PS5',
            image_url: 'https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png',
            price: 1000000,
            category: 'Game Console',
            stock: 30
            })
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


describe('Create products with wrong data types >> POST /products', function() {
    it('failed create product return errors and status 500', function(done) {
    request(app)
        .post('/products')
        .send({
            name: 123123,
            image_url: 33333,
            price: 'asdjnajdas',
            stock: 'bashdbsh'
            })
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            expect(status).toBe(500)
            expect(body).toHaveProperty(Object.keys(response.body));
            done()
            })
    });    
});

//UPDATE PRODUCT
describe('Edit Product by Id >> PUT /products', function() {
    it('return edited value and status 200', function(done) {
    request(app)
        .put('/products/4')
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

describe('Update products without access_token >> PUT /products', function() {
    it('failed update product return errors and status 401', function(done) {
    request(app)
        .put('/products/4')
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

describe('Update products with wrong access_token >> PUT /products', function() {
    it('failed update product return errors and status 401', function(done) {
    request(app)
        .put('/products/4')
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

describe('Update products with empty values >> put /products', function() {
    it('failed Update product return errors and status 401', function(done) {
    request(app)
        .put('/products/4')
        .send( {name: '',image_url: '',})
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

describe('Update products with stocks less than 0 >> put /products', function() {
    it('failed Update product return errors and status 401', function(done) {
    request(app)
        .put('/products/4')
        .send({
            name: 'PS5',
            image_url: 'https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png',
            price: 1000000,
            category: 'Game Console',
            stock: 30
            })
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

describe('Update products with prices less than 0 >> put /products', function() {
    it('failed Update product return errors and status 401', function(done) {
    request(app)
        .put('/products/4')
        .send({
            name: 'PS5',
            image_url: 'https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png',
            price: 1000000,
            category: 'Game Console',
            stock: 30
            })
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


describe('Update products with wrong data types >> put /products', function() {
    it('failed Update product return errors and status 500', function(done) {
    request(app)
        .put('/products/4')
        .send({
            name: 123123,
            image_url: 33333,
            price: 'asdjnajdas',
            stock: 'bashdbsh'
            })
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            expect(status).toBe(500)
            expect(body).toHaveProperty(Object.keys(response.body));
            done()
            })
    });    
});

//DELETE PRODUCT

describe('Delete Product by Id >> DELETE /products', function() {
    it('return deleted value and status 200', function(done) {
    request(app)
        .delete('/products/4')
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

describe('Delete products without access_token >> DELETE /products', function() {
    it('failed delete product return errors and status 401', function(done) {
    request(app)
        .delete('/products/4')
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

describe.only('Delete products with wrong access_token >> DELETE /products', function() {
    it('failed delete product return errors and status 401', function(done) {
    request(app)
        .delete('/products/3')
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