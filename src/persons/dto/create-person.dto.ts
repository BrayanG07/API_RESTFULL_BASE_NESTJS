import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreatePersonDto {
  @IsNotEmpty({ message: 'El nombre no debe estar vacío.' })
  @MaxLength(80, {
    message: 'El nombre debe ser menor o igual a 80 caracteres.',
  })
  firstName: string;

  @IsNotEmpty({ message: 'El apellido no debe estar vacío.' })
  @MaxLength(80, {
    message: 'El apellido debe ser menor o igual a 80 caracteres.',
  })
  lastName: string;

  @IsOptional()
  @MaxLength(20, {
    message: 'El DNI debe ser menor o igual a 20 caracteres.',
  })
  dni: string;

  @IsEmail()
  @MaxLength(100, {
    message: 'El correo electrónico debe ser menor o igual a 100 caracteres.',
  })
  email: string;

  @IsOptional()
  @MaxLength(20, {
    message: 'El numero de celular debe ser menor o igual a 20 caracteres.',
  })
  phone: string;
}
