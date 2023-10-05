import { IsNotEmpty, Length, Matches, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'El username no debe estar vacío.' })
  @MaxLength(30, {
    message: 'El username debe ser menor o igual a 30 caracteres.',
  })
  username: string;

  @IsNotEmpty({ message: 'La contraseña no debe estar vacío.' })
  @Length(6, 50, {
    message: 'La contraseña debe ser mayor a 6 y menor a 50 caracteres.',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe tener una letra mayúscula, minúscula y un número.',
  })
  password: string;
}
