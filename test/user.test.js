const app = require('../src/app');
const supertest = require('supertest');
const expect = require('expect.js');
require('dotenv').config();
const { connect, disconnect } = require('../src/db/mongoose-test');

describe('用户模块', () => {
  describe('用户注册', () => {
    beforeEach(() => {
      connect()
    })
    afterEach(() => {
      disconnect()
    })
    it('用户注册成功', async () => {
      const result = await supertest(app).post('/user/register').send({ username: 'quitone', password: '123456' })
      expect(result.status).to.be(200)
      expect(result.body).to.eql({ code: 1, message: '注册成功' })
    })

    it('用户注册失败', async () => {
      let result = await supertest(app).post('/user/register').send({ username: '成', password: '' })
      expect(result.status).to.be(400)
      expect(result.body).to.eql({ code: 0, message: '用户名不符合规范，可输入字符为大小写字符与数字' })

      result = await supertest(app).post('/user/register').send({ username: 'quitone', password: '1234..,,' })
      expect(result.status).to.be(400)
      expect(result.body).to.eql({ code: 0, message: '密码不符合规范，可输入字符为大小写字符与数字' })

      result = await supertest(app).post('/user/register').send({ username: 'quitone', password: '123' })
      expect(result.status).to.be(400)
      expect(result.body).to.eql({ code: 0, message: '密码不符合规范，需在6到20位之间' })

      await supertest(app).post('/user/register').send({ username: 'quitone', password: '123456' })
      result = await supertest(app).post('/user/register').send({ username: 'quitone', password: '123456' })
      expect(result.status).to.be(400)
      expect(result.body).to.eql({ code: 0, message: '该用户名已存在' })
    });
  });
  describe('用户登录', () => {
    beforeEach(() => {
      connect()
    })
    afterEach(() => {
      disconnect()
    })
    it('用户登录成功', async() => {
      const formData = { username: 'quitone', password: '123456' }

      await supertest(app).post('/user/register').send(formData)
      const result = await supertest(app).post('/user/login').send(formData)
      expect(result.status).to.be(200)
      expect(result.body).to.eql({ code: 1, message: '登录成功' })
    })

    it('登录失败', async () => {
      const serverWrapper = supertest(app)

      let result = await serverWrapper.post('/user/login').send({ username: '成', password: '' })
      expect(result.status).to.be(400)
      expect(result.body).to.eql({ code: 0, message: '用户名不符合规范，可输入字符为大小写字符与数字' })

      result = await serverWrapper.post('/user/login').send({ username: 'quitone', password: '123' })
      expect(result.status).to.be(400)
      expect(result.body).to.eql({ code: 0, message: '密码不符合规范，需在6到20位之间' })

      result = await serverWrapper.post('/user/login').send({ username: 'quitone', password: '1234..,,' })
      expect(result.status).to.be(400)
      expect(result.body).to.eql({ code: 0, message: '密码不符合规范，可输入字符为大小写字符与数字' })

      const registerResult = await serverWrapper.post('/user/register').send({ username: 'quitone', password: '123456' })
      expect(registerResult.body).to.eql({ code: 1, message: '注册成功' })
      result = await serverWrapper.post('/user/login').send({ username: 'quitone', password: 'abcdef' })
      expect(result.status).to.be(400)
      expect(result.body).to.eql({ code: 0, message: '用户名或密码错误' })
    });
  });
});