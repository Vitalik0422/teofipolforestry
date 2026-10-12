export interface JwtPayload {
  sub: string;
  id: string;
  login: string;
  iat?: number;
  exp?: number;
}
