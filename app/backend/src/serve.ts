import 'module-alias/register'
import express, { Request,Response, ErrorRequestHandler, NextFunction } from 'express'
import { ErrorMiddleware } from '@/middleware/error.middleware'
import cookieParser from 'cookie-parser'
import route from '@/routes/route'
import cors from 'cors'
import { connectRedis } from '@/config/cache/redis'
import helmet from 'helmet'
import { globalLimiter } from '@/middleware/globalLimiter'


if(!process.env.NODE_ENV){
  throw new Error("NO NODE_ENV")
}
const NODE_ENV =process.env.NODE_ENV;
const PORT = Number(process.env.PORT) || 3000;
const isDev = NODE_ENV !== "production"

const app = express()

app.set('trust proxy',1)


app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "https://market.aubertbarbosa.com"],
        imgSrc: ["'self'", "data:", "https://aubertbarbosa.com"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  origin: isDev
    ? 'http://localhost:5173'
    : 'https://market.aubertbarbosa.com'
}));


app.use(cookieParser())
app.use(express.json())

app.use( globalLimiter )
app.use( route )


app.use((error:ErrorRequestHandler,req:Request,res:Response,next:NextFunction)=>ErrorMiddleware(error,req,res,next))

const startServer = async()=>{
    try {
        await connectRedis();
       
        if(NODE_ENV === "production" || NODE_ENV==="test-e2e"){
            app.listen(PORT, '0.0.0.0', () => {
              console.log(`server running on port ${PORT}`);
            });
        }
    } catch (err:any) {
        console.error('Erro ao iniciar servidor:', err);
        process.exit(1);
    }

}
startServer() 
export default app;