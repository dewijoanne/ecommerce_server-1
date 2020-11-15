const request = require('supertest')
const app = require('../app.js')
const { User, sequelize } = require('../models')
const { jwtSign , jwtVerify} = require('../helpers/jwt')
const { queryInterface } = sequelize

let userCreate = {
    email : "admin@mail.com",
    password : "1234",
    role: "admin"
}

let user1 = {
    email : "admin@mail.com",
    password : "1234"
}

let user2 = {
    email : "mail@admin.com",
    password : "1234",
}

let user3 = {
    email : "",
    password : "12345",
}

let user4 = {
    email : "admin@mail.com",
    password : "",
}

beforeAll( done =>{
    User.create(userCreate)
    .then( data => {
        access_token = jwtSign({
            id : data.id,
            email: data.email
        })

        done()
    })
    .catch( err => {
        done(err)
    })
    
})

describe("User Routes", () => {

    test("200 success login - return access_token and id", (done) => {
        return request(app)
            .post('/login')
            .send(user1)
            .set("Accept", "application/json")
            .then( response => {
                const { body, status } = response

                expect(status).toBe(200)
                // expect(body).toHaveProperty("message","success login")
                expect(body).toHaveProperty("access_token")
                done()
            })
            .catch( (err) => {
                done(err)
            });
    })

    test("404 failed login - return message : data not found", (done) => {
        return request(app)
            .post('/login')
            .send(user2)
            .set("Accept", "appliaction/json")
            .then( response => {
                const { body, status } = response

                expect(status).toBe(404)
                expect(body).toHaveProperty("message","data not found")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    test("400 failed login - return message : email cannot be empty", done =>{
        return request(app)
        .post('/login')
        .send(user3)
        .set("Accept", "application/json")
        .then( response => {
            const { body, status } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "email cannot be empty")
            done()
        })
        .catch( err =>{
            done(err)
        })
    })

    test("400 failed login - return message : password cannot be empty", done =>{
        return request(app)
        .post('/login')
        .send(user4)
        .set("Accept", "application/json")
        .then( response => {
            const { body, status } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "password cannot be empty")
            done()
        })
        .catch( err =>{
            done(err)
        })
    })
})