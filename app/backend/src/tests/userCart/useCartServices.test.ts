import { IProductRepository } from '../../repository/product.repository'
import { UserCartService} from '../../services/useCart.services'
import {UserCartRepository} from '../../repository/userCart.repository'
import { ErrorMessage } from '../../helpers/ErrorMessage'


describe("UserCartService method create",()=>{
    let mockRepository:any
    let countUserCart = jest.fn()
    let create = jest.fn()
    let mockProduct:any
    let getProductById = jest.fn()
    beforeEach(()=>{
         jest.clearAllMocks()
        mockRepository = {
           countUserCart,
           create
        }
        mockProduct = {
            getProductById
        }
       
    })
    it("should default quantity to 1 if quantity is 0",async()=>{
        mockRepository.countUserCart.mockResolvedValueOnce(5)
        mockProduct.getProductById.mockResolvedValueOnce({product:'test'})
        const userCart = new UserCartService(
            mockRepository as UserCartRepository,
            mockProduct as IProductRepository
        );
        let userId = 3
        let quantity = 0
        let productId = 393

        await userCart.create(userId,productId,quantity)
        expect(mockRepository.countUserCart).toHaveBeenCalledTimes(1)
        expect(mockRepository.countUserCart).toHaveBeenCalledWith(userId)
        expect(mockProduct.getProductById).toHaveBeenCalledTimes(1)
        expect(mockProduct.getProductById).toHaveBeenCalledWith(productId)

        expect(mockRepository.create).toHaveBeenCalledTimes(1)
        expect(mockRepository.create).toHaveBeenCalledWith(userId,productId,1)
    })
    it("should throw an error when countUserCart returns a number greater than 5",async()=>{
        mockRepository.countUserCart.mockResolvedValueOnce(6)
        mockProduct.getProductById.mockResolvedValueOnce({product:'test'})
        const userCart = new UserCartService(
            mockRepository as UserCartRepository,
            mockProduct as IProductRepository
        );
        let userId = 3
        let quantity = 0
        let productId = 393

       try {
            await userCart.create(userId, productId, quantity)
          
        } catch (err: any) {
           
            expect(err).toBeInstanceOf(ErrorMessage);
            expect(err.message).toBe('Cart limit reached. You can only have up to 5 items in your cart.');
            expect(err.status).toEqual(400);

   
            expect(mockRepository.countUserCart).toHaveBeenCalledTimes(1);
            expect(mockRepository.countUserCart).toHaveBeenCalledWith(userId);

     
            expect(mockProduct.getProductById).not.toHaveBeenCalled();
            expect(mockRepository.create).not.toHaveBeenCalled();
        }
    
    })
    it("should throw an error when product is not found",async()=>{
        mockRepository.countUserCart.mockResolvedValueOnce(2)
        mockProduct.getProductById.mockResolvedValueOnce({product:''})
        const userCart = new UserCartService(
            mockRepository as UserCartRepository,
            mockProduct as IProductRepository
        );
        let userId = 3
        let quantity = 0
        let productId = 393

       try {
            await userCart.create(userId, productId, quantity)
          
        } catch (err: any) {
           
            expect(err).toBeInstanceOf(ErrorMessage);
            expect(err.message).toBe('Product not found.');
            expect(err.status).toEqual(404);

   
            expect(mockRepository.countUserCart).toHaveBeenCalledTimes(1);
            expect(mockRepository.countUserCart).toHaveBeenCalledWith(userId);

     
            expect(mockProduct.getProductById).toHaveBeenCalled();
            expect(mockProduct.getProductById).toHaveBeenCalledWith(productId);
            expect(mockRepository.create).not.toHaveBeenCalled();
        }
    
    })
    
})