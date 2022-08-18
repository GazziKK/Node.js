import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { LoggerService } from '../../logger/logger.service';
import { TYPES } from '../../types';
import { User } from '../user.entity';
import { IUsersRepository } from '../users.interface';
import { UserLoginDto } from './user-login.dto';
import { UserRegisterDto } from './user-register.dto';
import { IUserService } from './user.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
		@inject(TYPES.ILogger) private loggerService: LoggerService,
	) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, salt);

		const existedUser = await this.usersRepository.find(newUser.email);
		console.log(existedUser);

		if (existedUser) {
			return null;
		}
		return this.usersRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email);
		console.log(existedUser);

		if (existedUser) {
			const newUser = new User(existedUser.email, existedUser.name, existedUser.password);
			return await newUser.comparePassword(password);
		} else {
			return false;
		}
	}
}
