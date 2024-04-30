import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import SendEmailConfirmRecoverPasswordUseCase from "../../mail/usecase/sendEmailConfirmRecoveyPassword.usecase";
import { UserRepositoryContract } from "../../user/data/contract/user-repository.contract";
import { RedefinePasswordDTO } from "../presentation/dto/redefine-password.dto";
import * as bcrypt from 'bcrypt';
import { UserMapper } from "../../user/infra/mappers/user.mapper";
import TokenDecryptUseCase from "./token-decrypt.use.case";

@Injectable()
export default class VerifyTokenNewPasswordUseCase {
    constructor(
        private readonly tokenDecryptUseCase: TokenDecryptUseCase,
    ) { }

    async execute(token: string) {
        var resultDescrypt: string = "";
        
        try {
            resultDescrypt = await this.tokenDecryptUseCase.execute(token)
        } catch (err) {
          
            throw new UnauthorizedException('Token is invalid!');

        }
     
        const tokenDecrypt: { expirationDate: string, userId: string } = JSON.parse(resultDescrypt);

        if (!tokenDecrypt || !resultDescrypt) {
            throw new UnauthorizedException('Token not Unauthorized');
        }

        if (new Date() > new Date(tokenDecrypt.expirationDate)) {
            throw new BadRequestException('Token expired');
        }

    }

}

