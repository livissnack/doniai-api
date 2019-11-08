'use strict'
const Mail = use('Mail')

class EmailController {
  async send({ request }) {
    try {
      const formMail = request.input('form', 'livissnack@mail.doniai.com')
      const toMail = request.input('to', 'guanxin@tinytiger.cn')
      const data = await Mail.send(
        'emails.index',
        { username: 'livissnack' },
        message => {
          message.from(formMail)
          message.to(toMail)
          message.subject('Doniai Team')
        }
      )
      return data
    } catch (error) {
      return error.toString()
    }
  }
}

module.exports = EmailController
