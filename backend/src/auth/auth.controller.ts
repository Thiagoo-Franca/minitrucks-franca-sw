import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/auth.dto.js';
import { AuthService } from './auth.service.js';
import { AuthGuard } from './auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() body: SignInDto) {
    return await this.authService.signIn(body);
  }

  @Post('signup')
  async signUp(@Body() body: SignUpDto) {
    return await this.authService.signUp(body);
  }

  // apenas teste de rota protegida, para verificar se o token está sendo validado corretamente
  @UseGuards(AuthGuard) // Apply the AuthGuard to protect this route
  @Get('me')
  async getMe(@Request() req: any): Promise<{ userId: number; email: string }> {
    return req.user; // Assuming the user info is attached to the request object by the AuthGuard
  }
}
