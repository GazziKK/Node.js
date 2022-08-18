import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Invalid Email' })
	email: string;

	@IsString()
	password: string;
}
