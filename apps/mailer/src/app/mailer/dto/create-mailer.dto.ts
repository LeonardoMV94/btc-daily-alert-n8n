import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateMailerDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  from!: string;

  @IsArray()
  @IsEmail({}, { each: true })
  to!: string[];

  @IsString()
  @IsNotEmpty()
  subject!: string;

  @IsString()
  @IsNotEmpty()
  html!: string;
}
