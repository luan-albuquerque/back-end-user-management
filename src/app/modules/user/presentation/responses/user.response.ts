import { ApiProperty } from '@nestjs/swagger';

export class UserResponse<T> {
  @ApiProperty({ description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({ description: 'Message describing the response' })
  message: string;

  @ApiProperty({ description: 'Additional details about the response' })
  details?: T;


  constructor(statusCode: number, message: string, details?: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }

  static success<T>(message: string, details?: T): UserResponse<T> {
    return new UserResponse<T>(200, message, details);
  }

  static created<T>(message: string, details?: T): UserResponse<T> {
    return new UserResponse<T>(201, message, details);
  }

  static error<T>(statusCode: number = 400, message: string, details?: T): UserResponse<T> {
    return new UserResponse<T>(statusCode, message, details);
  }
}
