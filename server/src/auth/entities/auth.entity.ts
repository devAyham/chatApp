import { ObjectType, Field, } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class RegisterResponse {
  @Field(() => User)
  exampleField: User;
}


@ObjectType()
export class LoginResponse {
  @Field(() => User)
  exampleField: User;
}
