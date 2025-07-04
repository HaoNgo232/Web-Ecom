import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '@/auth/config/jwt.config';
import { JwtPayload } from '@/auth/interfaces/jwt-payload.interface';
import { User } from '@/auth/entities/user.entity';

interface IGenerateTokensProvider {
  signToken<T>(userId: string, expiresIn: string | number, payload?: T): Promise<string>;
  generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }>;
}

@Injectable()
export class GenerateTokensProvider implements IGenerateTokensProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T>(
    userId: string,
    expiresIn: string | number, // Can be string (e.g., '7d') or number (seconds)
    payload?: T,
  ) {
    const signOptions = {
      secret: this.jwtConfiguration.secret,
      expiresIn: expiresIn,
    };

    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      signOptions,
    );
  }

  public async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // Access token uses the string expirationTime with time unit (e.g. "1h")
    const accessTokenExpiresIn = this.jwtConfiguration.expirationTime;
    // Refresh token uses the string refreshExpirationTime (e.g., '7d')
    const refreshTokenExpiresIn = this.jwtConfiguration.refreshExpirationTime;

    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<JwtPayload>(
        user.id,
        accessTokenExpiresIn, // Pass string with time unit (e.g., "1h")
        payload,
      ),
      this.signToken<JwtPayload>(
        user.id,
        refreshTokenExpiresIn, // Pass string (e.g., '7d')
        payload,
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
