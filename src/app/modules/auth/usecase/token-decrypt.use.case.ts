import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export default class TokenDecryptUseCase {
    private readonly secretKey: string = process.env.SECRET_ENCRYPT_AND_DECRYPT;
    private readonly algorithm: string = 'aes-256-cbc';
    private readonly IV: string = '5183666c72eec9e4';

    async execute(encryptedData: string): Promise<string> {
        
        let decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, this.IV);
        let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
        return (decrypted + decipher.final('utf8'));
    }
}
