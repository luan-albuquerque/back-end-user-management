import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export default class TokenEncryptUseCase {
    private readonly algorithm: string = 'aes-256-cbc';
    private readonly secretKey: string = process.env.SECRET_ENCRYPT_AND_DECRYPT;

    async execute(data: string): Promise<string> {
        const cipher = crypto.createCipher(this.algorithm, this.secretKey);
        let encrypted = cipher.update(data, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

}
