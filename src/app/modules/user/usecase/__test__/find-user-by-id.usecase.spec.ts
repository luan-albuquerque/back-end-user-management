import { NotFoundException } from '@nestjs/common';
import { FindUserByIdUseCase } from '../find-user-by-id.usecase';
import { UserRepositoryContract } from '../../data/contract/user-repository.contract';
import { UserMapper } from '../../infra/mappers/user.mapper';
import { UserEntity } from '../../domain/user.entity';

describe('FindUserByIdUseCase', () => {
  let findUserByIdUseCase: FindUserByIdUseCase;
  let mockUserRepository: UserRepositoryContract;
  let mockUserMapper: UserMapper;

  beforeEach(() => {
    mockUserRepository = {
      findOne: jest.fn(),
    } as unknown as UserRepositoryContract;

    mockUserMapper = {
      modelToEntity: jest.fn(),
    } as unknown as UserMapper;

    findUserByIdUseCase = new FindUserByIdUseCase(mockUserRepository, mockUserMapper);
  });

  describe('execute', () => {
    it('should return user by ID successfully', async () => {
      const userId = '04eed189-fd1f-49f1-a8e4-cb55a29d40f3';
      const userData = {
        id: userId,
        name: "luan",
        surname: "albuquerque",
        email: "luan2@gmail.com",
        password: "string",
        is_enabled: true,
        access_level: 1,
        createdAt: new Date(),
        updatedAt: null
       };

      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(userData);

      const userEntity =  UserEntity.create(userData);

      (mockUserMapper.modelToEntity as jest.Mock).mockReturnValue(userEntity);

      const result = await findUserByIdUseCase.execute(userId);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith(userId);

      expect(mockUserMapper.modelToEntity).toHaveBeenCalledWith(userData);

      expect(result).toEqual(userEntity);
    });

    it('should throw NotFoundException if user not found', async () => {
      const userId = 'non-existing-user-id';

      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(findUserByIdUseCase.execute(userId)).rejects.toThrowError(NotFoundException);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith(userId);

      expect(mockUserMapper.modelToEntity).not.toHaveBeenCalled();
    });
  });
});
