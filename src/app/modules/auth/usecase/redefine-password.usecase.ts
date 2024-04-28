import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import SendEmailConfirmRecoverPasswordUseCase from "../../mail/usecase/sendEmailConfirmRecoveyPassword.usecase";
import { UserRepositoryContract } from "../../user/data/contract/user-repository.contract";
import { RedefinePasswordDTO } from "../presentation/dto/redefine-password.dto";
import * as bcrypt from 'bcrypt';
import { UserMapper } from "../../user/infra/mappers/user.mapper";
import TokenDecryptUseCase from "./token-decrypt.use.case";

@Injectable()
export default class RedefinePasswordService {
    constructor(
        private readonly userRepository: UserRepositoryContract,
        private mail: SendEmailConfirmRecoverPasswordUseCase,
        private readonly tokenDecryptUseCase: TokenDecryptUseCase,
        private readonly userMapper: UserMapper,
    ) { }

    async execute({ token, password, confirmpassword }: RedefinePasswordDTO) {

        const tokenDecrypt: { expirationDate: string, userId: string } = JSON.parse(await this.tokenDecryptUseCase.execute(token));

        if (!tokenDecrypt) {
            throw new UnauthorizedException('Token not Unauthorized');
        }

        if (new Date() > new Date(tokenDecrypt.expirationDate)) {
            throw new BadRequestException('Token expired');
        }


        const user = await this.userRepository.findOne(tokenDecrypt.userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }


        if (password != confirmpassword) {
            throw new UnauthorizedException('Estas senhas repassadas não correspondem',)
        }

        // Verificar se senha é igual a antiga
        const newPassIsEqualLastPassword: boolean = await bcrypt.compare(password, user.password);
        if (newPassIsEqualLastPassword) {
            throw new UnauthorizedException('Esta nova senha é igual a última senha, tente outra',)
        }

        const existingUser = this.userMapper.modelToEntity(user);


        existingUser.updatePassword(bcrypt.hashSync(password, 10));

        await this.userRepository.save(this.userMapper.entityToModel(existingUser));

        await this.mail.execute(user.email)

    }

}

