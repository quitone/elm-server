import formidable from 'formidable';
import UserModel from '../../model/user';
import BaseComponent from '../../prototype/baseComponent';
const crypto = require('crypto');
const userModel = require('../../model/user');

class User extends BaseComponent {
  constructor() {
    super()
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.validateUsername = this.validateUsername.bind(this)
    this.validatePassword = this.validatePassword.bind(this)
    this.encrypt = this.encrypt.bind(this)
  }
  /**
   * @description 注册接口
   * @author quitone
   * @date 2020-10-18
   * @param {*} request
   * @param {*} response
   * @memberof User
   */
  register(request, response) {
    const form = new formidable.IncomingForm()
    form.parse(request, async (err, fields, files) => {
      if (err) {
        return this.catchError(response, err)
      }
      const { username, password } = fields
      try {
        this.validateUsername(username) && this.validatePassword(password)
        const foundResult = await userModel.findOne({ username, password })
        if (foundResult) {
          throw new Error('该用户名已存在')
        }
        await UserModel.create({ username, password })
        return response.status(200).json({ code: 1, message: '注册成功' })
      } catch(error) {
        return this.catchError(response, error)
      }
    })
  }
  /**
   * @description 登录接口
   * @author quitone
   * @date 2020-10-18
   * @param {*} request
   * @param {*} response
   * @memberof User
   */
  login(request, response) {
    const form = new formidable.IncomingForm()
    form.parse(request, async (err, fields, files) => {
      if (err) {
        return this.catchError(response, err)
      }
      const { username, password } = fields
      try {
        this.validateUsername(username) && this.validatePassword(password)
        const foundResult = await userModel.findOne({ username, password })
        if (!foundResult) {
          throw new Error('用户名或密码错误')
        }
        return response.json({ code: 1, message: '登录成功' })
      } catch(error) {
        return this.catchError(response, error)
      }
    })
  }
  /**
   * @description 验证密码
   * @author quitone
   * @date 2020-10-18
   * @param {string} password
   * @returns boolean
   * @memberof User
   */
  validatePassword(password) {
    if (6 > password.length || password.length > 20) {
      throw new Error('密码不符合规范，需在6到20位之间')
    }
    if (!/^[a-zA-Z0-9]+$/.test(password)) {
      throw new Error('密码不符合规范，可输入字符为大小写字符与数字')
    }
    return true
  }
  /**
   * @description 验证用户名
   * @author quitone
   * @date 2020-10-18
   * @param {string} username
   * @returns boolean
   * @memberof User
   */
  validateUsername(username) {
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      throw new Error('用户名不符合规范，可输入字符为大小写字符与数字')
    }
    return true
  }
  /**
   * @description 加密密码
   * @author quitone
   * @date 2020-10-18
   * @param {string} password
   * @returns string
   * @memberof User
   */
  encrypt(password) {
    const md5 = crypto.createHash('md5')
    return md5.update(password.substr(0, 4) + password).digest('base64')
  }
}

module.exports = new User()