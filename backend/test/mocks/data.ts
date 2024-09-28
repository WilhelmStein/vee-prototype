import { ApplicationStatus } from '@common/graphql-typings.generated';
import { Foundation } from '@modules/foundation/schema/foundation.entity';
import { GrantUserInteraction } from '@modules/grant/schema/grant-user-interaction.entity';
import { Grant } from '@modules/grant/schema/grant.entity';
import { User } from '@modules/user/schema/user.entity';
import { getFutureDate } from '@utils/dates';
import { DeepPartial } from 'typeorm';

export const mockUser: Partial<User> = {
  id: '1',
  email: 'ioannis.cheilaris@gmail.com',
};

export const mockFoundations: Partial<Foundation>[] = [
  {
    id: '1',
    name: 'Cretonian Foundation',
  },
];

export const mockGrants: DeepPartial<Grant>[] = [
  {
    id: '1',
    name: 'Ship Automation Grant',
    location: 'Attiki, Greece',
    areasOfFunding: ['Shipworks', 'Transportation', 'AI', 'Automation'],
    amountDollars: 70000,
    applicationStartDate: new Date(),
    applicationEndDate: getFutureDate(25),
    foundation: mockFoundations[0],
  },
  {
    id: '2',
    name: 'Automated Whale Oil Extraction Grant',
    location: 'Attiki, Greece',
    areasOfFunding: ['Shipworks', 'Extraction', 'Whales', 'AI', 'Automation'],
    amountDollars: 25000,
    applicationStartDate: new Date(),
    applicationEndDate: getFutureDate(15),
    foundation: mockFoundations[0],
  },
];

export const mockGrantUserInteractions: DeepPartial<GrantUserInteraction>[] = [
  {
    id: '1',
    status: ApplicationStatus.ACCEPTED,
    likedStatus: null,
    grant: mockGrants[0],
    user: mockUser,
    matchDate: new Date(),
  },
];
