import {OmitType} from '@nestjs/mapped-types';
import {CreateAuthDto} from './create-auth.dto.js';

export class PublicUserDto extends OmitType(CreateAuthDto, [
  'password',
] as const) {
  id: string;
}
