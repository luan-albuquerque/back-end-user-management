import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserEntity } from '../domain/user.entity';
import { CreateUserDto } from '../presentation/dto/create-user.dto';
import { UpdateUserDto } from '../presentation/dto/update-user.dto';
import { CreateUserUseCase } from '../usecase/create-user.usecase';
import { UpdateUserUseCase } from '../usecase/update-user.usecase';
import { DeleteUserUseCase } from '../usecase/delete-user.usecase';
import { FindAllUsersUseCase } from '../usecase/find-all-users.usecase';
import { FindUserByIdUseCase } from '../usecase/find-user-by-id.usecase';
import { UserResponse } from '../presentation/responses/user.response';


@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly findAllUsersUseCase: FindAllUsersUseCase,
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
    ) {

    }

    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBody({ type: CreateUserDto, description: 'Data for creating a new user.' })
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponse<UserEntity>> {
        try {
            const user: UserEntity = await this.createUserUseCase.execute(createUserDto);
            return UserResponse.created<UserEntity>("The user has been successfully created.", user)
        } catch (error) {
            return UserResponse.error(HttpStatus.BAD_REQUEST, 'Bad request', error.message);
        }

    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Return all users.', type: UserEntity, isArray: true })
    @Get()
    async findAllUsers(): Promise<UserEntity[]> {
        return null;
    }

    @ApiOperation({ summary: 'Get user by ID' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'Return the user with the specified ID.', type: UserEntity })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @Get(':id')
    async findUserById(@Param('id') id: string): Promise<UserEntity> {
        return null;
    }

    @ApiOperation({ summary: 'Update user by ID' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'Return the updated user.', type: UserEntity })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @ApiBody({ type: UpdateUserDto, description: 'Data for updating the user.' })
    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<UserEntity> {
        return null;
    }

    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiResponse({ status: 204, description: 'User has been deleted.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<void> {
        return null;
    }
}
