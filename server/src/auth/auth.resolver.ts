import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse, RegisterResponse } from './entities/auth.entity';
import { LoginDto, RegisterDto } from './dto/auth.dtos';
import { BadRequestException, UseFilters } from '@nestjs/common';
import { Request, Response } from 'express';
import { log } from 'console';
// import { GraphQLErrorFilter } from 'src/filters/custom-exception.filter';

// @UseFilters(GraphQLErrorFilter)
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ) {
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException({
        confirmPassword: 'Password and confirm password are not the same.',
      });
    }
    log(context)
    const { user } = await this.authService.register(registerDto, context.res);
    return { user };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginDto: LoginDto,
    @Context() context: { res: Response },
  ) {
    return this.authService.login(loginDto, context.res);
  }

  @Mutation(() => String)
  async logout(@Context() context: { res: Response }) {
    return this.authService.logout(context.res);
  }

  @Mutation(() => String)
  async refreshToken(@Context() context: { req: Request; res: Response }) {
    try {
      return this.authService.refreshTheAccessToken(context.req, context.res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}