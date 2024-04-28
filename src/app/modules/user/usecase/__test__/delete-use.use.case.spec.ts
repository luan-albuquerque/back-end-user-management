import { NotFoundException } from '@nestjs/common';
import { DeleteUserUseCase } from '../delete-user.usecase';
import { UserRepositoryContract } from '../../data/contract/user-repository.contract';
import { UserMapper } from '../../infra/mappers/user.mapper';

describe('DeleteUserUseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let mockUserRepository: UserRepositoryContract;
  let mockUserMapper: UserMapper;

  beforeEach(() => {
    mockUserRepository = {
      findOne: jest.fn(),
      delete: jest.fn(),
    } as unknown as UserRepositoryContract;

    mockUserMapper = {} as UserMapper;

    deleteUserUseCase = new DeleteUserUseCase(mockUserRepository, mockUserMapper);
  });

  describe('execute', () => {
    it('should delete user successfully', async () => {
      const userId = 'user-id';

      (mockUserRepository.findOne as jest.Mock).mockResolvedValue({ id: userId });

      await expect(deleteUserUseCase.execute(userId)).resolves.toBeUndefined();

      expect(mockUserRepository.findOne).toHaveBeenCalledWith(userId);

      expect(mockUserRepository.delete).toHaveBeenCalledWith(userId);
    });

    it('should throw NotFoundException if user not found', async () => {
      const userId = 'non-existing-user-id';

      (mockUserRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(deleteUserUseCase.execute(userId)).rejects.toThrowError(NotFoundException);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith(userId);

      expect(mockUserRepository.delete).not.toHaveBeenCalled();
    });
  });
});
