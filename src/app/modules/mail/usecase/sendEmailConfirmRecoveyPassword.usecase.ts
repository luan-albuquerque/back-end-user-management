import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common"

@Injectable()
export default class SendEmailConfirmRecoverPasswordUseCase {
    constructor(private mailer: MailerService) {}

    async execute(email: string){
        await this.mailer.sendMail({
              to: email,
              from: "User Management" + process.env.EMAIL_MAIL,
              subject: "Senha Redefinida com Sucesso",
              template: "confirmRedefinePassword",
              context:{
                name: email
              }
        }).catch((error)=>{
            console.log('ERROR SEND MAIL WITH TOKEN' + error)
        })

    }
}