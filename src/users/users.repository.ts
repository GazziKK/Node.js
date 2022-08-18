import { Prisma, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../data-base/prisma.service';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUsersRepository } from './users.interface';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	public async create({ email, password, name }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				name,
			},
		});
	}

	public async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}
}
