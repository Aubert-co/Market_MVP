import { NextFunction, Request, Response } from "express";
import { checkIsAValidNumber } from "../helpers";
import { IUserCartService } from "../services/useCart.services";
import { ErrorMessage } from "../helpers/ErrorMessage";

export class UserCartController{
    public constructor(protected userCart:IUserCartService){}

    public async addItemToCart(req:Request,res:Response,next:NextFunction):Promise<any>{
        const quantity = Number(req.body.quantity)
        const productId = Number(req.body.productId)
        if (!checkIsAValidNumber(quantity) || !Number.isInteger(quantity)) {
                return res.status(400).send({
                    message: "Invalid quantity. Please provide a valid number."
                });
            }
        if (!checkIsAValidNumber(productId)) {
            return res.status(400).send({
                message: "Invalid product ID. Please provide a valid number."
            });
        }
        if (quantity > 5) {
            return res.status(400).send({
                message: "You can only add up to 5 items of this product to the cart."
            });
        }
        try{
            const userId = req.user
           
            

            await this.userCart.create(userId,productId,quantity)

            res.status(201).send({message:'Sucess'})
        }catch(err:any){
            next(err)
        }
    }
    public async getCartItems(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            const userId = req.user
            const datas = await this.userCart.getAllCartItems(userId)
            
            res.status(200).send({message:'Sucess',datas})
        }catch(err:any){
            next(err)
        }
    }
    public async removeItemFromCart(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            const cart = req.body?.cart
          if (!Array.isArray( cart ) || cart.length >5) {
                return res.status(400).send({
                    message: "Invalid cart. Please provide a valid cart."
                });
            }
            const userId  =req.user
            const mapedDatas = cart.map((val:any)=>{
                if(!checkIsAValidNumber(val)){
                    throw new ErrorMessage("Invalid cart id. Please provide a valid cart id",400)
                }
                return {
                    id:Number(val),userId
                }
            })
            await this.userCart.removeItem(mapedDatas)
            res.status(200).send({message:'Sucess'})
        }catch(err:any){
            next(err)
        }
    }
    public async updateCart(req:Request,res:Response,next:NextFunction):Promise<any>{
        try{
            const cart = req.body?.cart
            if(!Array.isArray( cart ) || cart.length > 5){
                return res.status(400).send({message:'Invalid cart. Please provide a valid cart.'})
            }
            const userId = req.user
            const mapCart = cart.map((val: any) => {
                if (!checkIsAValidNumber(val.id) || !checkIsAValidNumber(val.quantity) || !Number.isInteger(val.quantity)) {
                    throw new ErrorMessage("Invalid cart id. Please provide a valid cart id", 400);
                }
                if(val.quantity > 5){
                    throw new ErrorMessage("You can only add up to 5 items of this product to the cart.",400)
                }
                return {
                    cartId: val.id,
                    quantity: val.quantity,
                };
            });

            await this.userCart.updateCart(userId,mapCart);
            res.status(201).send({message:'Sucess'})
        }catch(err:any){
            next(err)
        }
    }
}