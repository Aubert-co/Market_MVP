import express, { Request,Response, ErrorRequestHandler, NextFunction } from 'express'
import { ErrorMiddleware } from './middleware/error.middleware'
import cookieParser from 'cookie-parser'
import route from './routes/route'
import cors from 'cors'
import { connectRedis } from './lib/redis'
import path from 'path'

import helmet from 'helmet'

const app = express()

const publicPath = path.join(__dirname,'..', "public");


app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "img-src": ["'self'", "data:", "https://storage.googleapis.com"],
      },
    },
  })
);

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials:true,
}));

app.use(cookieParser())
app.use(express.json())
app.use(express.static(publicPath));


app.use( route )

app.get('/*splat',(req,res)=>{
  res.sendFile(publicPath+'/index.html')
})
app.use((error:ErrorRequestHandler,req:Request,res:Response,next:NextFunction)=>ErrorMiddleware(error,req,res,next))

const startServer = async()=>{
    try {
        await connectRedis();
       
        if(process.env.MODE !== "test"){
            app.listen(process.env.PORT,()=>{console.log('server running'+process.env.PORT)});
        }
    } catch (err:any) {
        console.error('Erro ao iniciar servidor:', err);
        process.exit(1);
    }

}
startServer() 
export default app;