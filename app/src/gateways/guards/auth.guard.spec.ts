import { AuthGuard } from './auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { IAuthService } from './auth-service.interface';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: IAuthService;

  beforeEach(() => {
    authService = {
      validate: jest.fn(),
    };

    authGuard = new AuthGuard(authService);
  });

  describe('canActivate', () => {
    it('should return true if the token is valid', async () => {
      const context: Partial<ExecutionContext> = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({
            headers: {
              authorization: 'Bearer valid-token',
            },
          }),
        }),
      };

      jest.spyOn(authService, 'validate').mockResolvedValue(true);

      await expect(
        authGuard.canActivate(context as ExecutionContext),
      ).resolves.toBe(true);
      expect(authService.validate).toHaveBeenCalledWith('valid-token');
    });

    it('should return false if there is no authorization header', async () => {
      const context: Partial<ExecutionContext> = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({
            headers: {},
          }),
        }),
      };

      const result = authGuard.canActivate(context as ExecutionContext);
      expect(result).toBe(false);
    });

    it('should return false if the token is invalid', async () => {
      const context: Partial<ExecutionContext> = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({
            headers: {
              authorization: 'Bearer invalid-token',
            },
          }),
        }),
      };

      jest.spyOn(authService, 'validate').mockResolvedValue(false);

      await expect(
        authGuard.canActivate(context as ExecutionContext),
      ).resolves.toBe(false);
      expect(authService.validate).toHaveBeenCalledWith('invalid-token');
    });

    it('should return false if the authorization type is not Bearer', () => {
      const context: Partial<ExecutionContext> = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({
            headers: {
              authorization: 'Basic some-token',
            },
          }),
        }),
      };

      const result = authGuard.canActivate(context as ExecutionContext);
      expect(result).toBe(false);
      expect(authService.validate).not.toHaveBeenCalled();
    });
  });

  describe('extractTokenFromHeader', () => {
    it('should extract the token from a Bearer authorization header', () => {
      const request = {
        headers: {
          authorization: 'Bearer some-token',
        },
      };

      const token = (authGuard as any).extractTokenFromHeader(request as any);
      expect(token).toBe('some-token');
    });

    it('should return undefined if the authorization header is not Bearer', () => {
      const request = {
        headers: {
          authorization: 'Basic some-token',
        },
      };

      const token = (authGuard as any).extractTokenFromHeader(request as any);
      expect(token).toBeUndefined();
    });

    it('should return undefined if there is no authorization header', () => {
      const request = {
        headers: {},
      };

      const token = (authGuard as any).extractTokenFromHeader(request as any);
      expect(token).toBeUndefined();
    });
  });
});
