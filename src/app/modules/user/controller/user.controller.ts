import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UserEntity } from '../domain/user.entity';
import { CreateUserDto } from '../presentation/dto/create-user.dto';
import { UpdateUserDto } from '../presentation/dto/update-user.dto';
import { CreateUserUseCase } from '../usecase/create-user.usecase';
import { UpdateUserUseCase } from '../usecase/update-user.usecase';
import { DeleteUserUseCase } from '../usecase/delete-user.usecase';
import { FindAllUsersUseCase } from '../usecase/find-all-users.usecase';
import { FindUserByIdUseCase } from '../usecase/find-user-by-id.usecase';
import { UserResponse } from '../presentation/responses/user.response';
import { AdminAuthGuard } from 'src/app/core/guards/admin.guard';
import { JwtAuthGuard } from 'src/app/core/guards/jwt.guard';
import { FindUsersByTypeStatusUseCase } from '../usecase/find-users-by-type-status.usecase';


@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AdminAuthGuard)
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly findAllUsersUseCase: FindAllUsersUseCase,
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
        private readonly findUsersByTypeStatusUseCase: FindUsersByTypeStatusUseCase
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
            throw UserResponse.error(error.status, error.message);
        }
        
    }

    @ApiOperation({ summary: 'Data users for dashboard' })
    @ApiResponse({ status: 200, description: 'Return data users for dashboard'})
    @Get('dashboard')
    async dashboardUserStatusAndType(): Promise<UserResponse<any>> {
        try {
             const dash = await this.findUsersByTypeStatusUseCase.execute()
            
            return UserResponse.success<{ type: string, status: boolean, count: number }[]>("Data users for dashboard.", dash)
        } catch (error) {
            throw UserResponse.error(error.status, error.message);
        }
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Return all users.', type: UserEntity, isArray: true })
    @Get()
    async findAllUsers(): Promise<UserResponse<UserEntity[]>> {
        try {
            const users: UserEntity[] = await this.findAllUsersUseCase.execute()
            return UserResponse.success<UserEntity[]>("Return all users.", users)
        } catch (error) {
            throw UserResponse.error(error.status, error.message);
        }
    }

    @ApiOperation({ summary: 'Get user by ID' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'Return the user with the specified ID.', type: UserEntity })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @Get(':id')
    async findUserById(@Param('id') id: string): Promise<UserResponse<UserEntity>> {
        try {
            const user: UserEntity = await this.findUserByIdUseCase.execute(id)
            return UserResponse.success<UserEntity>("Return the user with the specified ID.", user)
        } catch (error) {
            throw UserResponse.error(error.status, error.message);
        }
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
    ): Promise<UserResponse<UserEntity>> {
        try {
            const user: UserEntity = await this.updateUserUseCase.execute(id, updateUserDto)
            return UserResponse.success<UserEntity>("Return the updated user.", user)
        } catch (error) {
            throw UserResponse.error(error.status, error.message);
        }
    }

    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiResponse({ status: 204, description: 'User has been deleted.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<UserResponse<UserEntity>> {
        try {
            await this.deleteUserUseCase.execute(id)
            return UserResponse.success<UserEntity>("user deleted.")
        } catch (error) {
            throw UserResponse.error(error.status, error.message);
        }
    }

}


