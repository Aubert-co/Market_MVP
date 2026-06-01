import { manyCartItems } from "@/tests/__fixtures__/cart"
import { orders } from "@/tests/__fixtures__/orders"
import { productsByStore } from "@/tests/__fixtures__/products"
import { manyReviews } from "@/tests/__fixtures__/reviews"
import { views } from "@/tests/__fixtures__/views"
const now = new Date()

const firstDayOfMonth = new Date(
  now.getFullYear(),
  now.getMonth(),
  1
)   

const lastDayOfMonth = new Date(
  now.getFullYear(),
  now.getMonth() + 1,
  0,
  23,
  59,
  59,
  999
)
const storeId = 1
export const storeProductIds = new Set(
productsByStore
    .filter(product => product.storeId === storeId)
    .map(product => product.id)
)

export const cartItems = manyCartItems.reduce((total, item) => {
if (storeProductIds.has(item.productId)) {
    return total + item.quantity
}
return total
}, 0)
export const countViews = views.reduce((total,item)=>{
if(storeProductIds.has(item.productId)){
    return total +=1
}
return total
},0)
export const reviews = manyReviews.reduce((total,item)=>{
if(storeProductIds.has(item.productId)){
        total.totalRating+=item.rating
        total.totalReviews+=1
}
return total
},{totalReviews:0,totalRating:0})
export const monthlyOrders = orders.filter(order => {
  const product = productsByStore.find(
    p => p.id === order.productId
  )

  return (
    product?.storeId === storeId &&
    order.status !== "cancelled" &&
    order.createdAt >= firstDayOfMonth &&
    order.createdAt <= lastDayOfMonth
  )
})

export const expectedRevenue = monthlyOrders.reduce(
  (acc, order) => acc + order.total,
  0
)

export const lastOrders = orders.filter((val)=>{
    if(storeProductIds.has(val.productId) && val.status === "pending")return val
})