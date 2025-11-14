import express, { Request,Response, ErrorRequestHandler, NextFunction } from 'express'
import { ErrorMiddleware } from './middleware/error.middleware'
import cookieParser from 'cookie-parser'
import route from './routes/route'
import cors from 'cors'
import { connectRedis } from './lib/redis'
import path from 'path'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'


if(!process.env.NODE_ENV){
  throw new Error("NO NODE_ENV")
}
const NODE_ENV =process.env.NODE_ENV;

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: "Too many requests from this IP, please try again later."
  }
});
const app = express()

const publicPath = path.join(__dirname,'..', "public");


if(NODE_ENV ==="production"){
  app.set('trust proxy',1)
}

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        imgSrc: ["'self'", "data:", "https://storage.googleapis.com"],
        connectSrc:["'self'","https://auth.aubertdev.com.br"]
      },
    },
  })
);

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials:true,
  origin: 'https://auth.aubertdev.com.br'
}));

app.use(cookieParser())
app.use(express.json())
app.use(express.static(publicPath));

app.use( globalLimiter )
app.use( route )

app.get('/*splat',(req,res)=>{
  res.sendFile(publicPath+'/index.html')
})
app.use((error:ErrorRequestHandler,req:Request,res:Response,next:NextFunction)=>ErrorMiddleware(error,req,res,next))

const startServer = async()=>{
    try {
        await connectRedis();
       
        if(NODE_ENV === "production"){
            app.listen(process.env.PORT,()=>{console.log('server running'+process.env.PORT)});
        }
    } catch (err:any) {
        console.error('Erro ao iniciar servidor:', err);
        process.exit(1);
    }

}
startServer() 
export default app;