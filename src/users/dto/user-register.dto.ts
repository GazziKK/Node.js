import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Invalid Email' })
	email: string;

	@IsString({ message: 'Password not will be Empty' })
	password: string;

	@IsString({ message: 'Name not will be Empty' })
	name: string;
}
