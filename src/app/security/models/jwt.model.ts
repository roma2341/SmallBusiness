import { User } from './user.model';

export class JWTModel extends User{
    iss: string;
    iat: number;
    exp: number;
    sub: string;
    user?: User;
    encoded?: string;
    auth_key: string;
}