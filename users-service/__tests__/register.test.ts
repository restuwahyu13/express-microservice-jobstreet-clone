import request, { Response } from 'supertest'
import mongoose from 'mongoose'
import app from '../src/app'

describe('REGISTER.ts', () => {
	let randomNumber
	let uniqueEmail
	let uniquePhone
	let getUniqueEmail = ''
	let getUniquePhone = ''

	beforeEach(() => {
		jest.setTimeout(50000)
		randomNumber = Math.floor(Math.random() * 60 * 2)
		uniqueEmail = `jamal${randomNumber}@zetmail.com`
		uniquePhone = `0821568941${randomNumber}`
	})

	afterAll(async (done) => {
		jest.clearAllTimers()
		await mongoose.connection.close()
		done()
	})

	it('get response if create new account successfully', async (done) => {
		const res: Response = await request(app)
			.post('/api/v1/user/register')
			.send({
				firstName: 'jamal',
				lastName: 'mirdad',
				email: uniqueEmail,
				password: 'bukopin12',
				location: 'indonesia',
				phone: uniquePhone
			})
			.set('Content-Type', 'application/json')
			.expect(201)

		expect(res.body.method).toBe('POST')
		expect(res.body.status).toEqual(201)
		expect(res.body.message).toEqual(`create new account successfully, please check your email ${uniqueEmail}`)

		getUniqueEmail = uniqueEmail
		getUniquePhone = uniquePhone

		done()
	})

	it('get response failed if account already exist', async (done) => {
		const res: Response = await request(app)
			.post('/api/v1/user/register')
			.send({
				firstName: 'jamal',
				lastName: 'mirdad',
				email: getUniqueEmail,
				password: 'bukopin12',
				location: 'indonesia',
				phone: getUniquePhone
			})
			.set('Content-Type', 'application/json')
			.expect(409)

		expect(res.body.method).toBe('POST')
		expect(res.body.status).toEqual(409)
		expect(res.body.message).toEqual('email already taken, please try again')
		done()
	})

	it('get response failed if request body is not valid', async (done) => {
		const res: Response = await request(app)
			.post('/api/v1/user/register')
			.send({
				firstName: 'kama123',
				lastName: 'cavalera123',
				email: 'kamal13#grr.la',
				password: '123',
				location: 'indonesia',
				phone: '083845229122'
			})
			.set('Content-Type', 'application/json')
			.expect(400)

		expect(res.body.method).toBe('POST')
		expect(res.body.status).toEqual(400)
		expect(res.body.errors[0].msg).toEqual('firstName cannot include unique character')
		expect(res.body.errors[1].msg).toEqual('lastName cannot include unique character')
		expect(res.body.errors[2].msg).toEqual('email is not valid')
		expect(res.body.errors[3].msg).toEqual('password must be at least 8 characters')
		done()
	})

	it('get response if response header is json', async (done) => {
		const res: Response = await request(app)
			.post('/api/v1/user/register')
			.send({
				firstName: 'kama123',
				lastName: 'cavalera123',
				email: 'kamal13#grr.la',
				password: '123',
				location: 'indonesia',
				phone: '083845229122'
			})
			.set('Content-Type', 'application/json')
			.expect(400)

		expect(res.header['content-type']).toMatch(/json/)
		done()
	})
})
