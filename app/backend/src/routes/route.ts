import { Router } from "express";
import { generateSignedUrl } from "../lib/googleStorage";
import products from './products.route'
import storeRoute from './store.route'
import userCartRoute from './userCart.route'

import productAdminRoute from './productAdmin.route'
import orderRoute from './order.route'
import couponRoute from './coupon.route'
import reviewsRoute from './reviews.route'
import storeDashboard from './storeDash.route'
const route = Router();


route.use( products)
route.use( storeRoute )
route.use( userCartRoute )
route.use( productAdminRoute )
route.use( orderRoute)
route.use( couponRoute)
route.use(reviewsRoute)
route.use(storeDashboard)
route.get('/images/:filename', async (req, res) => {
  const { filename } = req.params;

  const signedUrl = await generateSignedUrl(filename);
  res.set('Content-Type', 'image/png');
  res.redirect(signedUrl);
}); 

 

export default route