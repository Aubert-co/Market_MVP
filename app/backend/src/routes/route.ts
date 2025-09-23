import { prisma } from "../lib/prisma";
import redis from "../lib/redis";
import { Router,NextFunction,Request,Response } from "express";
import { generateSignedUrl } from "../lib/googleStorage";
import authRoute from './auth.route'
import products from './products.route'
import storeRoute from './store.route'
import userCartRoute from './userCart.route'
import { fileUpload } from "../lib/fileUpload";




const route = Router();

route.use(authRoute)
route.use( products)
route.use( storeRoute )
route.use( userCartRoute )
route.get('/images/:filename', async (req, res) => {
  const { filename } = req.params;

  const signedUrl = await generateSignedUrl(filename);
  res.set('Content-Type', 'image/png');
  res.redirect(signedUrl);
}); 

 

export default route