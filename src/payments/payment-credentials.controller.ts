import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { IsSuperAdmin } from '../common/decorators/roles.decorator';
import { ResponseUtil } from '../common/utils/response.util';
import { StagePaymentCredentialDto } from './dto/payment-credential.dto';
import { PaymentCredentialsService } from './payment-credentials.service';

@Controller('payments/admin/integrations')
@IsSuperAdmin()
export class PaymentCredentialsController {
  constructor(private readonly credentials: PaymentCredentialsService) {}

  @Get()
  async list() {
    return ResponseUtil.success(
      await this.credentials.listIntegrations(),
      'Payment integrations retrieved',
    );
  }

  @Post(':integrationId/credentials')
  async stage(
    @Param('integrationId') integrationId: string,
    @CurrentUser('userId') actorId: string,
    @Body() dto: StagePaymentCredentialDto,
  ) {
    return ResponseUtil.success(
      await this.credentials.stage(integrationId, dto.secretKey, actorId),
      'Credential validated and staged',
    );
  }

  @Post('credentials/:credentialId/activate')
  async activate(
    @Param('credentialId') credentialId: string,
    @CurrentUser('userId') actorId: string,
  ) {
    return ResponseUtil.success(
      await this.credentials.activate(credentialId, actorId),
      'Credential activated',
    );
  }

  @Post('credentials/:credentialId/revoke')
  async revoke(
    @Param('credentialId') credentialId: string,
    @CurrentUser('userId') actorId: string,
  ) {
    return ResponseUtil.success(
      await this.credentials.revoke(credentialId, actorId),
      'Credential revoked',
    );
  }
}
