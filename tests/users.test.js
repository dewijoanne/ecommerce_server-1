const request = require("supertest")
const app = require("../app")
describe('Test User Register router', function () {

    describe('Test /users/register route', () => {
        it('should return user, token and status code 201', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({ 
                    username: 'Hindra',
                    email: 'hindra@gmail.com',
                    password: 'martabakcoklat',
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(201)
            expect(res.body).toHaveProperty('user')
            expect(res.body.user).toHaveProperty('id')
            expect(res.body.user).toHaveProperty('username')
            expect(res.body.user.username).toEqual('Hindra')
            expect(res.body.user).toHaveProperty('email')
            expect(res.body.user.email).toEqual('hindra@gmail.com')
            expect(res.body.user).toHaveProperty('password')
            expect(res.body.user.password).not.toEqual('martabakcoklat')
            expect(res.body.user).toHaveProperty('role')
            expect(res.body.user.role).toEqual('customer')
            expect(res.body).toHaveProperty('token')
        })
    })

    describe('Test Validation Username', () => {
        it('should return status code 400 when property username is empty', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: '',
                    email: 'hindra@gmail.com',
                    password: 'martabakcoklat',
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Oops! Enter username here!')
        })

        it('should return status code 400 when property username is null', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: null,
                    email: 'hindra@gmail.com',
                    password: 'martabakcoklat',
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Oops! Enter username here!')
        })

        it('should return status code 400 when property username is duplicate', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'Hindra',
                    email: 'hinndra@gmail.com',
                    password: 'martabakcoklat',
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Yikes! Username already exists!')
        })
    })

    describe('Test Validation Email', () => {
        it('should return status code 400 when property email is empty', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'Hindra',
                    email: '',
                    password: 'martabakcoklat',
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Oops! Enter email here!')
        })

        it('should return status code 400 when property email is null', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'Hindra',
                    email: null,
                    password: 'martabakcoklat',
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Oops! Enter email here!')
        })

        it('should return status code 400 when property email is not use @ and .', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'Hindra',
                    email: 'hindragmail.com',
                    password: 'martabakcoklat',
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Oops! Invalid email format!')
        })

        it('should return status code 400 when property email is duplicate', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'hindro',
                    email: 'hindra@gmail.com',
                    password: 'martabakcoklat',
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Yikes! Email address already exists!')
        })
    })

    describe('Test Validation Password', () => {
        it('should return status code 400 when property password is null', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'Hindra',
                    email: 'hindra@gmail.com',
                    password: null,
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Oops! Enter password here!')
        })

        it('should return status code 400 when property password is empty', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'Hindra',
                    email: 'hindra@gmail.com',
                    password: "",
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Oops! Enter password here!')
        })

        it('should return status code 400 when property password length is less than 6', async () => {
            const res = await request(app)
                .post('/users/register')
                .send({
                    username: 'Hindra',
                    email: 'hindra@gmail.com',
                    password: '12345',
                    role: 'customer'
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Yikes! Minimum 6 characters!')
        })
    })
})

describe('Test User Login Router', function () {

    describe('Test /users/login route', () => {
        it('should return user, token and status code 200', async () => {
            const res = await request(app)
                .post('/users/login')
                .send({
                    email: 'hindra@gmail.com',
                    password: 'martabakcoklat'
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('user')
            expect(res.body.user).toHaveProperty('id')
            expect(res.body.user).toHaveProperty('username')
            expect(res.body.user.username).toEqual('Hindra')
            expect(res.body.user).toHaveProperty('email')
            expect(res.body.user.email).toEqual('hindra@gmail.com')
            expect(res.body.user).toHaveProperty('password')
            expect(res.body.user.password).not.toEqual('martabakcoklat')
            expect(res.body.user).toHaveProperty('role')
            expect(res.body.user.role).toEqual('customer')
            expect(res.body).toHaveProperty('token')
        })

        it('should return status code 404 when password is wrong', async () => {
            const res = await request(app)
                .post('/users/login')
                .send({
                    email: 'hindra@gmail.com',
                    password: 'beda password',
                })
            expect(res.statusCode).toEqual(404)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Wrong password or email!')
        })

        it('should return status code 404 when email is wrong', async () => {
            const res = await request(app)
                .post('/users/login')
                .send({
                    email: 'hindro@gmail.com',
                    password: 'martabakcoklat',
                })
            expect(res.statusCode).toEqual(404)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Wrong password or email!')
        })
    })

})