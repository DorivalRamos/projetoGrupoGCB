import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { async } from 'rxjs';
import TestUtil from '../common/test/TestUtil';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  
  
  //Mockando as Funções da minha Serviçe.users
  const mockRepository ={
    find : jest.fn(),
    findOne : jest.fn(),
    save : jest.fn(),
    create : jest.fn(),
    update : jest.fn(),
    createUser : jest.fn(),
    softRemove : jest.fn()
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
      {
        provide : getRepositoryToken(UserRepository),
        useValue : mockRepository,
      }],
    }).compile();


    service = module.get<UsersService>(UsersService);
  });

  beforeEach(()=>{
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.save.mockReset();
    mockRepository.create.mockReset();
    mockRepository.update.mockReset();
    mockRepository.createUser.mockReset();
    mockRepository.softRemove.mockReset();

  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("findAllUsers", () =>{
    it("should be list all users", async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.find.mockReturnValue([user,user]);
      const users = await service.findAllUsers();
      console.log(users)
      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
                        
    })			
  } );

  describe("findUserById", () =>{
    it("should find a existing user",async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.findOne.mockReturnValue(user);
      const userFound = await service.findUserById('1');
      expect(userFound).toMatchObject({name: user.name});
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1)
    });

    it("should return a exception when does not find a user",  () => {
      mockRepository.findOne.mockResolvedValue(null);
      expect(service.findUserById("10")).rejects.toBeInstanceOf(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);

    })
  });

  describe("create User", () => {
    it("should create user", async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.create.mockReturnValue(user);
      mockRepository.createUser.mockReturnValue(user);
      mockRepository.save.mockReturnValue(user);
      const createUser = await service.createUser(user);
      expect(createUser).toMatchObject(user);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.createUser).toBeCalledTimes(1);

    })

    it('should return a exception when does not create a user ',async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.create.mockReturnValue(user);
      mockRepository.save.mockReturnValue(null);
      
      await service.createUser(user).catch(e => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'Problem to create a user, Try again',
        });
        expect(mockRepository.create).toBeCalledTimes(1);
        expect(mockRepository.createUser).toBeCalledTimes(1);

      })      
    });

  })

    describe('updateUser', () => {
      it('Should update a user', async () => {
       const user = TestUtil.giveMeAValidUser();
       const updateUser = {name : 'update Name'}
       mockRepository.findOne.mockReturnValue(user);
       mockRepository.update.mockReturnValue({
          ...user,
          ...updateUser,
       });

       mockRepository.create.mockReturnValue({
         ...user,
         ...updateUser,
       });

       const returnUpdatedUser = await service.updateUser('1',{
         ...user,
         name : 'updateName',
       });

       expect(returnUpdatedUser).toMatchObject(updateUser);
       expect(mockRepository.findOne).toBeCalledTimes(1);
       expect(mockRepository.update).toBeCalledTimes(1);
       expect(mockRepository.create).toBeCalledTimes(1);
       
    })});

    describe('deleted user', () => {
      it('should delete a existing user', async () => {
          const user = TestUtil.giveMeAValidUser();
          mockRepository.findOne.mockReturnValue(user);
          mockRepository.softRemove.mockReturnValue(user);

          const deletedUser = await service.deleteUser('c2353ada-427b-4b9d-999e-430603706b0c');

          expect(deletedUser).toMatchObject(deletedUser);
          expect(mockRepository.findOne).toBeCalledTimes(1);
          expect(mockRepository.softRemove).toBeCalledTimes(1);

      }  );

      it('should not delete a inexisting user', async () => {
        const user = TestUtil.giveMeAValidUser();
          mockRepository.findOne.mockReturnValue(user);
          mockRepository.softRemove.mockReturnValue(null);

          await service.deleteUser('c2353ada-427b-4b9d-999e-430603706b0c').catch(e => {
            expect(e).toBeInstanceOf(NotFoundException);
            expect(e).toMatchObject({
              message: 'User not found',
            });
            expect(mockRepository.findOne).toBeCalledTimes(1);
            expect(mockRepository.softRemove).toBeCalledTimes(1);
    
          })  
      })

    })


 


});
