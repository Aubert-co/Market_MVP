import jwt, { JwtHeader, JwtPayload } from 'jsonwebtoken'
export enum routes {
    postLogin="/login",
    postRegister="/register",
    postProductCreate="/product/create",
    deleteProductDelete ="/product/delete",
    getUserCart = "/user/cart",
    deleteUserCartRemove="/user/cart/remove",
    postUserCartAdd="/user/cart/add",
    putUserCartUpdate="/user/cart/update",
    postStoreCreateCoupon="/store/create/coupon",
    postUserAddCoupon="/user/add/coupon",
    getMyStores="/store/mystores",
    getStoreProducts="/admin/store/products/:storeId/:page",
    postCreateStore="/store/create",
    GetProductsByCategory="/product/category/:category",
    GetProducts="/product/page/:page",
    
}
