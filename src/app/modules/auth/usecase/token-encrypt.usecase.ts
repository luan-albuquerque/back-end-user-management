import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export default class TokenEncryptUseCase {
    private readonly secretKey: string = process.env.SECRET_ENCRYPT_AND_DECRYPT;
    private readonly algorithm: string = 'aes-256-cbc';
    private readonly IV: string = '5183666c72eec9e4';

    async execute(data: string): Promise<string> {
        let cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.IV);
        let encrypted = cipher.update(data, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    }

}
