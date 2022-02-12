import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../common/test/TestUtil';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockRepository ={
    find : jest.fn(),
    findOne : jest.fn(),
    save : jest.fn(),
    create : jest.fn(),
    update : jest.fn(),
    delete: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
      {
        provide : getRepositoryToken(User),
        useValue : mockRepository,
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("findAllUsers", () =>{
    it("should be list all users", async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.find.mockReturnValue([user,user]);
      const users = await service.findAllUsers();
      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);

    })
  } )
});
