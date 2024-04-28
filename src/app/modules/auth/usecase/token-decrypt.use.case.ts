import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export default class TokenDecryptUseCase {
    private readonly secretKey: string = process.env.SECRET_ENCRYPT_AND_DECRYPT;
    private readonly algorithm: string = 'aes-256-cbc';

    async execute(encryptedData: string): Promise<string> {
        
        const decipher = crypto.createDecipher(this.algorithm, this.secretKey);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }
}
