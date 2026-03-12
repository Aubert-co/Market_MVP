import { Router } from "express";
import { generateSignedUrl } from "../lib/googleStorage";
import products from '../modules/products/routes/products.route'
import storeRoute from '../modules/store/routes/store.route'
import userCartRoute from '../modules/userCart/routes/userCart.route'

import productAdminRoute from '../modules/products/routes/productAdmin.route'
import orderRoute from '../modules/orders/route/order.route'
import couponRoute from '../modules/coupon/route/coupon.route'
import reviewsRoute from '../modules/reviews/routes/reviews.route'
import storeDashboard from '../modules/store/routes/storeDash.route'
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