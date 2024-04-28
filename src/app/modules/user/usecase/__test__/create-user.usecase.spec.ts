import { HttpException, HttpStatus } from "@nestjs/common";
import { UserRepositoryContract } from "../../data/contract/user-repository.contract";
import { UserEntity } from "../../domain/user.entity";
import { UserMapper } from "../../infra/mappers/user.mapper";
import { CreateUserDto } from "../../presentation/dto/create-user.dto";
import { CreateUserUseCase } from "../create-user.usecase";
import { AccessLevel } from "../../data/enums/acess-level.enum";

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let mockUserRepository: UserRepositoryContract;
  let mockUserMapper: UserMapper;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    } as unknown as UserRepositoryContract;

    mockUserMapper = {
      entityToModel: jest.fn(),
    } as unknown as UserMapper;

    // Inicializando o mock para mockUserMapper.entityToModel
    (mockUserMapper as any).entityToModel = jest.fn();

    // Inicializando o mock para mockUserRepository.save
    (mockUserRepository as any).save = jest.fn();

    createUserUseCase = new CreateUserUseCase(mockUserRepository, mockUserMapper);
  });

  describe('execute', () => {
    it('should create a new user successfully', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John',
        access_level:  AccessLevel.ADMIN,
        surname: 'Doe',
        password: 'password123',
        email: 'john@example.com',
      };

      (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(null); 

      const expectedUserEntity = UserEntity.create({
        name: 'John',
        access_level: AccessLevel.ADMIN,
        surname: 'Doe',
        password: 'password123',
        email: 'john@example.com',
        createdAt: new Date(),
      });

      const expectedUserModel = mockUserMapper.entityToModel(expectedUserEntity);

      (mockUserRepository as any).save.mockResolvedValue(expectedUserModel);

      const result = await createUserUseCase.execute(createUserDto);

      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(createUserDto.email);
      expect(mockUserMapper.entityToModel).toHaveBeenCalledWith(expectedUserEntity);
      expect(mockUserRepository.save).toHaveBeenCalledWith(expectedUserModel);
      expect(result.name).toEqual(expectedUserEntity.name);
      expect(result.surname).toEqual(expectedUserEntity.surname);
      expect(result.email).toEqual(expectedUserEntity.email);
      expect(result.access_level).toEqual(expectedUserEntity.access_level);
    });

    it('should throw HttpException with CONFLICT status if email already exists', async () => {
        const createUserDto: CreateUserDto = {
          name: 'John',
          access_level: AccessLevel.ADMIN,
          surname: 'Doe',
          password: 'password123',
          email: 'john@example.com',
        };
      
        (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue({}); 
      
        await expect(createUserUseCase.execute(createUserDto)).rejects.toThrowError(
          new HttpException('email already exists', HttpStatus.CONFLICT)
        );
      
        expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(createUserDto.email);
        expect(mockUserMapper.entityToModel).not.toHaveBeenCalled();
        expect(mockUserRepository.save).not.toHaveBeenCalled();
      });
      
  });
});
