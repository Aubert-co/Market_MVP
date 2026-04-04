import { Router } from "express";
import products from '@/modules/products/routes/products.route'
import storeRoute from '@/modules/storeAdmin/store/routes/store.route'
import userCartRoute from '@/modules/userCart/routes/userCart.route'

import productAdminRoute from '@/modules/storeAdmin/products/products.route'
import orderRoute from '@/modules/orders/route/order.route'
import couponRoute from '@/modules/coupon/route/coupon.route'
import reviewsRoute from '@/modules/reviews/routes/reviews.route'
//import storeDashboard from '@/modules/storeAdmin/store/routes/storeDash.route'
import { makeUploadFile } from "@/factory/uploadFIles";
import { httpLogger } from "@/middleware/loggerHttp";
import CouponStore from "@/modules/storeAdmin/coupon/coupon.route"
 
const imageUpload = makeUploadFile()
const route = Router();

route.use( httpLogger)
route.use( products)
route.use( storeRoute )
route.use( userCartRoute )
route.use( productAdminRoute )
route.use( orderRoute)
route.use( couponRoute)
route.use(reviewsRoute)
//route.use(storeDashboard)
route.use(CouponStore)

route.get('/images/:filename', async (req, res) => {
  const { filename } = req.params;

  const signedUrl = await imageUpload.generateSignedUrl(filename);
  res.set('Content-Type', 'image/png');
  res.redirect(signedUrl);
}); 

 

export default route