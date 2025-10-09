import jwt from 'jsonwebtoken'
import { ErrorMessage } from './ErrorMessage';

const ACCESS_TOKEN = process.env?.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env?.REFRESH_TOKEN;

if(!ACCESS_TOKEN || !REFRESH_TOKEN){
  throw new Error("Falha no .env")
}
export const generateAccessToken = (userId: number) => {
  
  return jwt.sign({ id: userId }, ACCESS_TOKEN, { expiresIn: '2h' });
};

export const generateRefreshToken = (userId: number) => {
 
  return jwt.sign({ id: userId }, REFRESH_TOKEN, { expiresIn: '7d' });
};