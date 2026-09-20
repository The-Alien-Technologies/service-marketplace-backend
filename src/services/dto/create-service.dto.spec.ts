import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ServiceAvailability } from '../../../generated/prisma';
import { CreateServiceDto } from './create-service.dto';

describe('CreateServiceDto multipart transformation', () => {
  it('validates JSON-encoded arrays from multipart form data', async () => {
    const dto = plainToInstance(CreateServiceDto, {
      marketId: 'market-gh',
      availability: ServiceAvailability.GLOBAL,
      title: 'House painting',
      categoryId: 'category-1',
      overview: 'Interior and exterior painting',
      tags: JSON.stringify(['painting', 'home']),
      plans: JSON.stringify([
        { title: 'Room', price: 100, inclusions: 'Paint one room' },
      ]),
      addons: JSON.stringify([]),
    });

    expect(await validate(dto)).toEqual([]);
    expect(dto.tags).toEqual(['painting', 'home']);
    expect(dto.plans).toHaveLength(1);
  });

  it('rejects malformed plan JSON instead of bypassing validation', async () => {
    const dto = plainToInstance(CreateServiceDto, {
      marketId: 'market-gh',
      title: 'House painting',
      categoryId: 'category-1',
      overview: 'Interior and exterior painting',
      plans: '{not-json',
    });

    expect(await validate(dto)).not.toEqual([]);
  });
});
