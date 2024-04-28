import { HttpException, HttpStatus } from "@nestjs/common";
import { UpdateUserDto } from "../../presentation/dto/update-user.dto";
import { UserEntity } from "../../domain/user.entity";
import { UserRepositoryContract } from "../../data/contract/user-repository.contract";
import { UserMapper } from "../../infra/mappers/user.mapper";
import { UpdateUserUseCase } from "../update-user.usecase";
import { AccessLevel } from "../../data/enums/acess-level.enum";

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: UpdateUserUseCase;
  let mockUserRepository: UserRepositoryContract;
  let mockUserMapper: UserMapper;

  beforeEach(() => {
    mockUserRepository = {
      findOne: jest.fn(),
      findByEmail: jest.fn(),
      save: jest.fn(),
    } as unknown as UserRepositoryContract;

    mockUserMapper = {
      modelToEntity: jest.fn(),
      entityToModel: jest.fn(),
    } as unknown as UserMapper;

    updateUserUseCase = new UpdateUserUseCase(mockUserRepository, mockUserMapper);
  });

  describe('execute', () => {
    it('should update user successfully', async () => {
      const userId = 'user-id';
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
        access_level: AccessLevel.ADMIN,
        surname: 'Updated Surname',
        password: 'updatedPassword123',
        email: 'updated@example.com',
      };

      const existingUserModel = {
        id: userId,
        name: 'Existing Name',
        surname: 'Existing Surname',
        password: 'existingPassword123',
        email: 'existing@example.com',
        access_level: AccessLevel.STANDARD,
      };

      const existingUserEntity = UserEntity.create({
        ...existingUserModel,
        createdAt: new Date()
      });

      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(existingUserModel);
      (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(null);
      (mockUserMapper.modelToEntity as jest.Mock).mockReturnValue(existingUserEntity);

      await expect(updateUserUseCase.execute(userId, updateUserDto)).resolves.toEqual(existingUserEntity);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith(userId);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(updateUserDto.email);
      expect(mockUserMapper.modelToEntity).toHaveBeenCalledWith(existingUserModel);
    //   expect(mockUserRepository.save).toHaveBeenCalledWith(existingUserModel);
    });

    it('should throw HttpException with NOT_FOUND status if user not found', async () => {
      const userId = 'non-existing-user-id';
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
        access_level: AccessLevel.ADMIN,
        surname: 'Updated Surname',
        password: 'updatedPassword123',
        email: 'updated@example.com',
      };

      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(updateUserUseCase.execute(userId, updateUserDto)).rejects.toThrowError(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );

      expect(mockUserRepository.findOne).toHaveBeenCalledWith(userId);
      expect(mockUserRepository.findByEmail).not.toHaveBeenCalled();
      expect(mockUserMapper.modelToEntity).not.toHaveBeenCalled();
      expect(mockUserRepository.save).not.toHaveBeenCalled();
    });
  });
});
