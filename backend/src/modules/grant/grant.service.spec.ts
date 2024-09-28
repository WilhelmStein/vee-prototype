import {
  ApplicationStatus,
  GrantInteractionType,
  LikedStatus,
} from '@common/graphql-typings.generated';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockGrantUserInteractions, mockGrants, mockUser } from '@test/mocks/data';
import { Repository } from 'typeorm';
import { GrantService } from './grant.service';
import { GrantUserInteraction } from './schema/grant-user-interaction.entity';
import { Grant } from './schema/grant.entity';

describe('GrantsService', () => {
  let service: GrantService;
  let grantRepo: Repository<Grant>;
  let grantUserInteractionRepo: Repository<GrantUserInteraction>;

  const mockGrantRepo = {
    createQueryBuilder: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  };

  const mockGrantUserInteractionRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const grantRepoToken = getRepositoryToken(Grant);
    const grantUserInteractionRepoToken = getRepositoryToken(GrantUserInteraction);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GrantService,
        {
          provide: grantRepoToken,
          useValue: mockGrantRepo,
        },
        {
          provide: grantUserInteractionRepoToken,
          useValue: mockGrantUserInteractionRepo,
        },
      ],
    }).compile();

    service = module.get<GrantService>(GrantService);
    grantRepo = module.get<Repository<Grant>>(grantRepoToken);
    grantUserInteractionRepo = module.get<Repository<GrantUserInteraction>>(
      grantUserInteractionRepoToken,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMatchingGrantsOfUser', () => {
    it('Should return matching grants for a user', async () => {
      mockGrantRepo.getMany.mockResolvedValue([mockGrants[0]]);

      const result = await service.getMatchingGrantsOfUser(mockUser.id);

      expect(result).toEqual([mockGrants[0]]);
      expect(mockGrantRepo.getMany).toHaveBeenCalled();
    });
  });

  describe('getAllGrantUserInteractionsOfUser', () => {
    it('should return all the interactions between a given user and the grants they interacted with', async () => {
      mockGrantUserInteractionRepo.find.mockResolvedValue(mockGrantUserInteractions);

      const result = await service.getAllGrantUserInteractionsOfUser(mockUser[0]);

      expect(result).toEqual([mockGrantUserInteractions[0]]);
      expect(mockGrantUserInteractionRepo.find).toHaveBeenCalled();
    });
  });

  describe('interactWithGrant', () => {
    it('should create an interaction when one does not exist', async () => {
      const targetGrant = mockGrants[1];
      const targetUser = mockUser;
      const interactionType = GrantInteractionType.THUMBS_UP;

      // Mocking findOne to return null, indicating no existing interaction
      mockGrantUserInteractionRepo.findOne.mockResolvedValue(null);
      mockGrantUserInteractionRepo.create.mockReturnValue({
        matchDate: new Date(),
        grant: targetGrant,
        user: targetUser,
        likedStatus: null,
      });

      mockGrantUserInteractionRepo.save.mockResolvedValue({
        id: String(mockGrantUserInteractions.length),
        grant: targetGrant,
        user: targetUser,
        likedStatus: LikedStatus.LIKED,
      });

      const result = await service.interactWithGrant(
        targetGrant.id,
        targetUser.id,
        interactionType,
      );

      expect(mockGrantUserInteractionRepo.create).toHaveBeenCalledWith({
        matchDate: expect.any(Date),
        grant: { id: targetGrant.id },
        user: { id: targetUser.id },
      });

      expect(mockGrantUserInteractionRepo.save).toHaveBeenCalled();
      expect(result.likedStatus).toBe(LikedStatus.LIKED);
    });

    it('should update an interaction', async () => {
      const targetGrant = mockGrants[1];
      const targetUser = mockUser;
      const interactionType = GrantInteractionType.APPLY;

      // Mocking findOne to return an existing interaction
      mockGrantUserInteractionRepo.findOne.mockResolvedValue({
        grant: { id: targetGrant.id },
        user: { id: targetUser.id },
        likedStatus: null,
      });

      const result = await service.interactWithGrant(
        targetGrant.id,
        targetUser.id,
        interactionType,
      );

      expect(mockGrantUserInteractionRepo.save).toHaveBeenCalledWith({
        grant: { id: targetGrant.id },
        user: { id: targetUser.id },
        likedStatus: null,
        status: ApplicationStatus.PENDING,
      });
    });

    it('should throw an error when trying to dislike a grant that has been applied to', async () => {
      const targetGrant = mockGrants[0];
      const targetUser = mockUser;
      const interactionType = GrantInteractionType.THUMBS_DOWN;

      // Mocking findOne to return an existing interaction with a status
      mockGrantUserInteractionRepo.findOne.mockResolvedValue({
        grant: { id: targetGrant.id },
        user: { id: targetUser.id },
        status: ApplicationStatus.PENDING,
      });

      // Expect exception
      await expect(
        service.interactWithGrant(targetGrant.id, targetUser.id, interactionType),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw an error for unknown interaction types', async () => {
      const targetGrant = mockGrants[0];
      const targetUser = mockUser;

      await expect(
        service.interactWithGrant(
          targetGrant.id,
          targetUser.id,
          'UNKNOWN_TYPE' as GrantInteractionType,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
