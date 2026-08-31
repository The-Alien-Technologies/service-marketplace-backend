import { NotFoundException } from '@nestjs/common';
import { QuoteService } from './quote.service';

describe('QuoteService provider approval enforcement', () => {
  it('rejects quote requests for an unavailable provider before uploading files', async () => {
    const prisma = {
      user: { findFirst: jest.fn().mockResolvedValue(null) },
      quoteRequest: { create: jest.fn() },
    };
    const fileUpload = { uploadFile: jest.fn() };
    const service = new QuoteService(
      prisma as never,
      fileUpload as never,
      {} as never,
    );

    await expect(
      service.create(
        'client-1',
        {
          providerId: 'provider-1',
          projectTitle: 'Paint a room',
          description: 'One room',
          deliveryTime: '2 days',
          budget: 500 as never,
        },
        [{ originalname: 'brief.pdf' }] as never,
      ),
    ).rejects.toThrow(NotFoundException);

    expect(fileUpload.uploadFile).not.toHaveBeenCalled();
    expect(prisma.quoteRequest.create).not.toHaveBeenCalled();
  });
});
