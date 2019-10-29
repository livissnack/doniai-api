'use strict'
const randomize = use('randomatic')

class PasswdController {
  async generate({ request, response }) {
    const type = request.input('type')
    const length = request.input('length', 8)
    const options = request.input('options', { chars: 'jonschlinkert' })
    let password = ''
    switch (type) {
      //小写英文字母
      case 'lowercase':
        password = await randomize('a', length)
        break
      //大写英文字母
      case 'uppercase':
        password = await randomize('A', length)
        break
      //常用密码
      case 'normal':
        password = await randomize('Aa0!', length)
        break
      //全数字密码
      case 'numeric':
        password = await randomize('0', length)
        break
      //特效字符密码
      case 'special':
        password = await randomize('!', length)
      //包含所有内容密码
      case 'all':
        password = await randomize('*', length)
      //自定义内容生成密码
      case 'custom':
        password = await randomize('?', length, options)
        break
      default:
        password = await randomize('a0', 8)
    }
    return response.json({
      status: 'success',
      msg: '随机字符串获取成功',
      data: password
    })
  }
}

module.exports = PasswdController
