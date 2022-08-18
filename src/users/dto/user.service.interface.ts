import { UserModel } from '@prisma/client';
import { UserLoginDto } from './user-login.dto';
import { UserRegisterDto } from './user-register.dto';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
