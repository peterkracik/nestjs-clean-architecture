import { Injectable } from '@nestjs/common';
import { IAuthService } from 'src/gateways/guards/auth-service.interface';

@Injectable()
export class AuthService implements IAuthService {
  async validate(token: string): Promise<boolean> {
    console.log('Validating user...', token);

    return '123' === token;
  }
}
