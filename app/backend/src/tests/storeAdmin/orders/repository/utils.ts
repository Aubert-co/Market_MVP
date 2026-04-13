import { productsByStore } from "@/tests/__fixtures__/products";
import { storeId } from "./adminOrderRep.spec";

export const isProductFromStore = (ordersDatas:any)=>{
  
   ordersDatas.forEach((order:any) => {
    
  const foundProduct = productsByStore.find(
    (product) =>
      product.id === order.productId &&
      product.storeId === storeId
  )
  
  expect(foundProduct).not.toBeUndefined()
})
}

export const checkSearchReturn = (values:any)=>{
    values.map((val:any)=>{
        if(val.coupon){
            expect(val.coupon).toHaveProperty('code')
            expect(val.coupon).toHaveProperty('discountType')

        }
        expect(val).toHaveProperty('coupon')
        
       
        expect(val).toHaveProperty('price')
        expect(val).toHaveProperty('quantity')
        expect(val).toHaveProperty('id')
        expect(val).toHaveProperty('total')
        expect(val).toHaveProperty('createdAt')

        expect(val).toHaveProperty('user')
        expect(val.user).toHaveProperty('name')
        expect(val.user).not.toHaveProperty('password')

        expect(val.product).toHaveProperty('name')
        expect(val.product).toHaveProperty('imageUrl')
        expect(val.product).toHaveProperty('price')
        expect(val.product).not.toHaveProperty('description')
        expect(val.product).not.toHaveProperty('stock')
        expect(val.product).not.toHaveProperty('quantity')
    })
}

export const checkLastOrdersReturn = (values:any)=>{
    values.map((val:any)=>{
        expect(val).not.toHaveProperty('coupon')
        expect(val).not.toHaveProperty('couponId')

        expect(val).toHaveProperty('price')
        expect(val).toHaveProperty('quantity')
        expect(val).toHaveProperty('id')
        expect(val).toHaveProperty('total')
        expect(val).toHaveProperty('createdAt')
        expect(val).not.toHaveProperty('user')

        expect(val.product).toHaveProperty('name')
        expect(val.product).toHaveProperty('imageUrl')
        expect(val.product).not.toHaveProperty('price')
        expect(val.product).not.toHaveProperty('description')
        expect(val.product).not.toHaveProperty('stock')
        expect(val.product).not.toHaveProperty('quantity')
    })
}