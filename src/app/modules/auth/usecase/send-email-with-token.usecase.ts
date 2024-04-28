import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import SendEmailWithTokenForRecoverPasswordUseCase from '../../mail/usecase/SendEmailWithTokenForRecoverPassword.usecase';
import { UserRepositoryContract } from '../../user/data/contract/user-repository.contract';
import TokenEncryptUseCase from './token-encrypt.usecase';

@Injectable()
export default class SendEmailWithTokenUseCase {

    constructor(
        private readonly userRepository: UserRepositoryContract, 
        private readonly mail: SendEmailWithTokenForRecoverPasswordUseCase,
        private readonly  tokenEncryptUseCase: TokenEncryptUseCase, 
    ) { }

    async execute(email: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundException('This user does not exist in the database');
        }
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 20);

        const token = await this.tokenEncryptUseCase.execute(JSON.stringify({expirationDate, userId: user.id}));
                
        await this.mail.execute(user.email, token );

    }
}
