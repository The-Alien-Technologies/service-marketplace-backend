import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale?: string;
}

@Injectable()
export class GoogleAuthService {
  private client: OAuth2Client;

  constructor(private configService: ConfigService) {
    this.client = new OAuth2Client(
      this.configService.get('GOOGLE_CLIENT_ID'),
      this.configService.get('GOOGLE_CLIENT_SECRET')
    );
  }

  async validateAccessToken(accessToken: string): Promise<GoogleUserInfo> {
    try {
      // Use Google's userinfo endpoint to validate the access token
      const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Google userinfo API error:', errorText);
        throw new BadRequestException('Invalid Google access token');
      }

      const userInfo = await response.json();
      
      // Validate that we have the required fields
      if (!userInfo.id || !userInfo.email) {
        throw new BadRequestException('Invalid user information from Google');
      }

      // Additional security checks
      if (!userInfo.verified_email) {
        throw new BadRequestException('Google account email is not verified');
      }

      return userInfo;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error validating Google access token:', error);
      throw new BadRequestException('Failed to validate Google access token');
    }
  }

  async validateIdToken(idToken: string): Promise<GoogleUserInfo> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken,
        audience: this.configService.get('GOOGLE_CLIENT_ID'),
      });

      const payload = ticket.getPayload();
      
      if (!payload) {
        throw new BadRequestException('Invalid Google ID token');
      }

      // Additional security validations
      if (payload.iss !== 'accounts.google.com' && payload.iss !== 'https://accounts.google.com') {
        throw new BadRequestException('Invalid token issuer');
      }

      if (payload.aud !== this.configService.get('GOOGLE_CLIENT_ID')) {
        throw new BadRequestException('Token audience mismatch');
      }

      if (!payload.email_verified) {
        throw new BadRequestException('Google account email is not verified');
      }

      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        throw new BadRequestException('Token has expired');
      }

      return {
        id: payload.sub,
        email: payload.email!,
        verified_email: payload.email_verified || false,
        name: payload.name || '',
        given_name: payload.given_name || '',
        family_name: payload.family_name || '',
        picture: payload.picture || '',
        locale: payload.locale,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error validating Google ID token:', error);
      throw new BadRequestException('Failed to validate Google ID token');
    }
  }

  async validateTokens(accessToken: string, idToken?: string): Promise<GoogleUserInfo> {
    // If we have an ID token, prefer that for validation as it's more secure
    if (idToken) {
      try {
        return await this.validateIdToken(idToken);
      } catch (error) {
        // If ID token validation fails, fall back to access token
        console.warn('ID token validation failed, falling back to access token:', error.message);
      }
    }

    // Validate using access token
    return await this.validateAccessToken(accessToken);
  }
}
