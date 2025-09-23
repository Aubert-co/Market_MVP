import { checkIsAValidNumber } from "../helpers";
import { ErrorMessage } from "../helpers/ErrorMessage"
import { IProductRepository } from "../repository/product.repository";
import {  IUserCartRepository} from "../repository/userCart.repository";
import { CartWithItems ,DatasId} from "../types/cart.types";

export interface IUserCartService{
    create(userId:number,productId:number,quantity:number):Promise<void>,
    removeItem(datas:DatasId[]):Promise<void>,
    getAllCartItems(userId:number):Promise< CartWithItems[]  >,
    updateCart(userId:number,datas:UserCartItems[]):Promise<void>
}

type UserCartItems = {
    cartId:number,
    quantity:number
}
export class UserCartService implements IUserCartService{
    constructor(protected cart:IUserCartRepository,protected product:IProductRepository){}
   
    public async create(userId:number,productId:number,quantity:number):Promise<void>{
    
        if(quantity <=0){
            quantity = 1
        }
        const countCartItems = await this.cart.countUserCart(userId)
        if (countCartItems > 5) {
            throw new ErrorMessage("Cart limit reached. You can only have up to 5 items in your cart.",400)
        }
        const {product} = await this.product.getProductById(productId)
        if (!product) {
           
            throw new ErrorMessage("Product not found.", 404);
        }

        await this.cart.create(userId,productId,quantity)
    }
    public async removeItem(datas:DatasId[]):Promise<void>{
        await this.cart.removeItem(datas)
    }
    public async getAllCartItems(userId:number):Promise< CartWithItems[]  >{
        return await this.cart.getAllCartItems(userId);
    }
    public async updateCart(userId:number,datas:UserCartItems[]):Promise<void>{
        for( const {quantity,cartId} of datas){
            await this.cart.updateCart(cartId,userId,quantity)
        }
    }
}
