import jwt from 'jsonwebtoken'
import { CookieOptions } from 'express';

const ACCESS_TOKEN = process.env?.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env?.REFRESH_TOKEN;
const isProduction = process.env.NODE_ENV === "production"
if(!ACCESS_TOKEN || !REFRESH_TOKEN){
  throw new Error("Falha no .env")
}
export const generateAccessToken = (userId: number) => {
  
  return jwt.sign({ id: userId }, ACCESS_TOKEN, { expiresIn: '2h' });
};

export const generateRefreshToken = (userId: number) => {
 
  return jwt.sign({ id: userId }, REFRESH_TOKEN, { expiresIn: '7d' });
};



export const cookieConfig = (): CookieOptions => {
  const baseConfig: CookieOptions = {
    httpOnly: true,
    secure: isProduction,
    maxAge: 15 * 60 * 1000,
    path: '/',
    sameSite: isProduction ? 'none' : 'lax'
  }

  if (isProduction) {
    return {
      ...baseConfig,
      domain: '.aubertdev.com.br'
    }
  }

  return baseConfig
}