export interface IAuthService {
  validate(token: string): Promise<boolean>;
}
