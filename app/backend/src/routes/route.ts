import { Router } from "express";
import products from '@/modules/products/routes/products.route'
import storeRoute from '@/modules/storeAdmin/store/routes/store.route'
import userCartRoute from '@/modules/userCart/routes/userCart.route'

import productAdminRoute from '@/modules/storeAdmin/products/products.route'
import orderRoute from '@/modules/orders/route/order.route'
import couponRoute from '@/modules/coupon/route/coupon.route'
import reviewsRoute from '@/modules/reviews/routes/reviews.route'
//import storeDashboard from '@/modules/storeAdmin/store/routes/storeDash.route'
import { makeUploadFile } from "@/config/imageUpload/uploadFIles";
import { httpLogger } from "@/middleware/loggerHttp";
import CouponStore from "@/modules/storeAdmin/coupon/coupon.route"
import orderAdminRoute from "@/modules/storeAdmin/orders/orders.routes"
import Auth from "@/modules/auth/route/auth.route"
import RouteTest from "./testes"
const imageUpload = makeUploadFile()
const route = Router();
const isTestE2E = process.env.NODE_ENV ==="test-e2e"
route.use( httpLogger)
route.use('/api',Auth)
route.use('/api', products)
route.use( '/api',storeRoute )
route.use('/api', userCartRoute )
route.use( '/api',productAdminRoute )
route.use( '/api',orderRoute)
route.use('/api', couponRoute)
route.use('/api',reviewsRoute)
route.use('/api',orderAdminRoute)
if(isTestE2E){
  console.log("testes e2e estao lgiados")
  route.use(RouteTest)
}
//route.use(storeDashboard)
route.use('/api',CouponStore)

route.get('/images/:filename', async (req, res) => {
  const { filename } = req.params;

  const signedUrl = await imageUpload.generateSignedUrl(filename);
  res.set('Content-Type', 'image/png');
  res.redirect(signedUrl);
}); 

 

export default route