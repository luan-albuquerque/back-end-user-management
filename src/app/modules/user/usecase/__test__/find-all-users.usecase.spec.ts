import { FindAllUsersUseCase } from '../find-all-users.usecase';
import { UserRepositoryContract } from '../../data/contract/user-repository.contract';
import { UserMapper } from '../../infra/mappers/user.mapper';
import { UserEntity } from '../../domain/user.entity';

describe('FindAllUsersUseCase', () => {
    let findAllUsersUseCase: FindAllUsersUseCase;
    let mockUserRepository: UserRepositoryContract;
    let mockUserMapper: UserMapper;

    beforeEach(() => {
        mockUserRepository = {
            findAll: jest.fn(),
        } as unknown as UserRepositoryContract;

        mockUserMapper = {
            modelsToEntities: jest.fn(),
        } as unknown as UserMapper;

        findAllUsersUseCase = new FindAllUsersUseCase(mockUserRepository, mockUserMapper);
    });

    describe('execute', () => {
        it('should return all users successfully', async () => {
            const usersData = [
               {
                id: "04eed189-fd1f-49f1-a8e4-cb55a29d40f3",
                name: "luan",
                surname: "albuquerque",
                email: "luan2@gmail.com",
                password: "string",
                is_enabled: true,
                access_level: 1,
                createdAt: new Date(),
                updatedAt: null
               }

            ];

            (mockUserRepository.findAll as jest.Mock).mockResolvedValue(usersData);

            const usersEntities = usersData.map(data => UserEntity.create(data));

            (mockUserMapper.modelsToEntities as jest.Mock).mockReturnValue(usersEntities);

            const result = await findAllUsersUseCase.execute();

            expect(mockUserRepository.findAll).toHaveBeenCalled();

            expect(mockUserMapper.modelsToEntities).toHaveBeenCalledWith(usersData);

            expect(result).toEqual(usersEntities);
        });
    });
});
