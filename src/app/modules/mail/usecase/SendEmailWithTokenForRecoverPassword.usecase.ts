import { MailerService } from "@nestjs-modules/mailer";
import * as dayjs from "dayjs"
import { Injectable } from "@nestjs/common"
@Injectable()
export default class SendEmailWithTokenForRecoverPasswordUseCase {
  constructor(private mailer: MailerService) { }
  async execute( email: string, token : string) {
    
    await this.mailer.sendMail({
      to: email,
      from: 'User Management' + process.env.EMAIL_MAIL,
      subject: "Recuperar Senha",
      context: {
        name: email,
        token: token,
        date: dayjs(new Date()).format('DD/MM/YYYY HH:mm:ss')
      },
      template: 'sendToken',

    }).catch((error) => {
      console.log('ERROR SEND EMAIL WITH TOKEN' + error)
    })
  }

}