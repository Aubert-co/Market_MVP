import request from 'supertest'
import * as FileUpload from "../../lib/googleStorage"
import app from "../../serve"
import path from "path"
import jwt from "jsonwebtoken"
import { prisma } from "../../lib/prisma"
import { cleanAllDb, deleteProduct, deleteStore } from '../__mocks__'


if(!process.env.ACCESS_TOKEN)throw new Error();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const users = [{id:3,name:'lucas',password:'12345667e',email:'lucsssas@gmail.com'},
    {id:4,name:'jose',password:'123456eee',email:'jossse@gmail.com'}
]
const stores = [{id:1,name:'stores',description:'description',userId:3}]
const cookies  = jwt.sign({id:users[0].id},ACCESS_TOKEN )
describe("When try to create a product with invalid name",()=>{
    beforeAll(async()=>{
        await cleanAllDb()
        await deleteProduct()
        await deleteStore()
        await prisma.user.createMany({data:users})
          
        await prisma.store.createMany({data:stores})
    
    })
    it("should return 422 when the product name is '' ",async()=>{   
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', '')
        .field('description', 'Descrição detalhada do produto')
        .field('price',199.99)
        .field('stock',15)
        .field('category','Eletrônicos')
        .field('storeId',1)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid name. Please check and try again.')
        expect(response.statusCode).toEqual(422)
    })
    it("should return 422 when the product name is smaller than 4 ",async()=>{   
        
        
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abc')
        .field('description', 'Descrição detalhada do produto')
        .field('price',199.99)
        .field('stock',15)
        .field('category','Eletrônicos')
        .field('storeId',1)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid name. Please check and try again.')
        expect(response.statusCode).toEqual(422)
    })
     it("should return 422 when the product name is greater than 15 ",async()=>{   
        
        
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'a'.repeat(16))
        .field('description', 'Descrição detalhada do produto')
        .field('price',199.99)
        .field('stock',15)
        .field('category','Eletrônicos')
        .field('storeId',1)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid name. Please check and try again.')
        expect(response.statusCode).toEqual(422)
    })
})

describe("When try to create a product with an invalid category",()=>{
   
    it("should return 422 when the product category is equal ''",async()=>{
        
        
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abcdee')
        .field('description', 'Descrição detalhada do produto')
        .field('price',199.99)
        .field('stock',15)
        .field('category','')
        .field('storeId',1)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid category. Please check and try again.')
        expect(response.statusCode).toEqual(422)
    })
    it("should return 422 when the product category is greater than 20",async()=>{
        
        
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abcdee')
        .field('description', 'Descrição detalhada do produto')
        .field('price',199.99)
        .field('stock',15)
        .field('category','a'.repeat(21))
        .field('storeId',1)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid category. Please check and try again.')
        expect(response.statusCode).toEqual(422)
    })
    it("should return 422 when the product category is smaller than 4",async()=>{
        
 
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abcdee')
        .field('description', 'Descrição detalhada do produto')
        .field('price',199.99)
        .field('stock',15)
        .field('category','abc')
        .field('storeId',1)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 

        expect(response.body.message).toEqual('Invalid category. Please check and try again.')
        expect(response.statusCode).toEqual(422)
    })
})


describe("When try to create a product with an invalid price",()=>{
  
    it("should return 422 when the product price is equal 0",async()=>{
        
        
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abcdee')
        .field('description', 'Descrição detalhada do produto')
        .field('price',0)
        .field('stock',15)
        .field('category','Eletrônicos')
        .field('storeId',1)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid or missing price value. Must be a non-negative number.')
        expect(response.statusCode).toEqual(422)
    })
    it("should return 422 when the product price is negative",async()=>{
        
        
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abcdee')
        .field('description', 'Descrição detalhada do produto')
        .field('price',-1)
        .field('stock',15)
        .field('category','Eletrônicos')
        .field('storeId',1)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid or missing price value. Must be a non-negative number.')
        expect(response.statusCode).toEqual(422)
    })
    it("should return 422 when the product price is ''",async()=>{
       const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abcdee')
        .field('description', 'Descrição detalhada do produto')
        .field('price','')
        .field('stock',15)
        .field('category','Eletrônicos')
        .field('storeId',1)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid or missing price value. Must be a non-negative number.')
        expect(response.statusCode).toEqual(422)
    })
    it("should return 422 when the product price is NaN",async()=>{
       const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abcdee')
        .field('description', 'Descrição detalhada do produto')
        .field('price','1e1')
        .field('stock',15)
        .field('category','Eletrônicos')
        .field('storeId',1)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid or missing price value. Must be a non-negative number.')
        expect(response.statusCode).toEqual(422)
    })
}) 

describe("When try to create a product with an invalid stock",()=>{
    
    it("should return 422 when the product stock is equal 0",async()=>{
        
        
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abcdee')
        .field('description', 'Descrição detalhada do produto')
        .field('price',199.99)
        .field('stock',0)
        .field('category','Eletrônicos')
        .field('storeId',1)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid or missing stock value. Must be a non-negative number.')
        expect(response.statusCode).toEqual(422)
    })
    it("should return 422 when the product stock is negative",async()=>{
        
        
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abcdee')
        .field('description', 'Descrição detalhada do produto')
        .field('price',199.99)
        .field('stock',-15)
        .field('category','Eletrônicos')
        .field('storeId',1)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid or missing stock value. Must be a non-negative number.')
        expect(response.statusCode).toEqual(422)
    })
    it("should return 422 when the product stock is ''",async()=>{
       const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abcdee')
        .field('description', 'Descrição detalhada do produto')
        .field('price',199.99)
        .field('stock','')
        .field('category','Eletrônicos')
        .field('storeId',1)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid or missing stock value. Must be a non-negative number.')
        expect(response.statusCode).toEqual(422)
    })
    it("should return 422 when the product stock is NaN",async()=>{
       const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abcdee')
        .field('description', 'Descrição detalhada do produto')
        .field('price',199.99)
        .field('stock','dez reais')
        .field('category','Eletrônicos')
        .field('storeId',1)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid or missing stock value. Must be a non-negative number.')
        expect(response.statusCode).toEqual(422)
    })
})   


describe("When try to create a product with an invalid description",()=>{
   
    it("should return 422 when the product description is ''",async()=>{
        
        
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abcdee')
        .field('description', '')
        .field('price',199.99)
        .field('stock',0)
        .field('category','Eletrônicos')
        .field('storeId',1)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid description. Please check and try again.')
        expect(response.statusCode).toEqual(422)
    })
    it("should return 422 when the product description is smaller than 4",async()=>{
        
        
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abcdee')
        .field('description', 'curt')
        .field('price',199.99)
        .field('stock',-15)
        .field('category','Eletrônicos')
        .field('storeId',1)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid description. Please check and try again.')
        expect(response.statusCode).toEqual(422)
    })
    it("should return 422 when the product description is greater than 200",async()=>{
       const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abcdee')
        .field('description', 'a'.repeat(201))
        .field('price',199.99)
        .field('stock','')
        .field('category','Eletrônicos')
        .field('storeId',1)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('Invalid description. Please check and try again.')
        expect(response.statusCode).toEqual(422)
    })
   
})   
describe("db actions",()=>{
    let  newCookies  = jwt.sign({id:users[1].id},ACCESS_TOKEN )
    let googleStorage:any
    let prismaProductCreate:any
    beforeAll(async()=>{
        await cleanAllDb()
        await prisma.user.createMany({data:users})
          
        await prisma.store.createMany({data:stores})
    })
    beforeEach(async()=>{
        googleStorage= jest.spyOn(FileUpload,"uploadFileToGCS")
        prismaProductCreate =jest.spyOn(prisma.product,'create')
        jest.clearAllMocks()
    })
    afterAll(async()=>{ 
       await cleanAllDb()
        jest.clearAllMocks()
    })
    it("should return an error message when the user tries to create a product in a store that belongs to another user",async()=>{
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${newCookies}`])
        .field('name', 'abcdee')
        .field('description', 'a'.repeat(20))
        .field('price',199.99)
        .field('stock',10)
        .field('category','Eletrônicos')
        .field('storeId',stores[0].id)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('You do not have permission to access this store.')
        expect(response.statusCode).toEqual(403)
    })
    it("should sucessfully create a new product",async()=>{
        googleStorage.mockResolvedValue("sucess")
                  
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abcdee')
        .field('description', 'a'.repeat(20))
        .field('price',199.99)
        .field('stock',10)
        .field('category','Eletrônicos')
        .field('storeId',stores[0].id)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('Product sucessfully created.')
        expect(response.statusCode).toEqual(201)
        expect(googleStorage).toHaveBeenCalledTimes(1)
    })
    it("should return an error when the db throwns an error",async()=>{
        googleStorage.mockResolvedValue("sucess")
        prismaProductCreate.mockRejectedValueOnce(()=>new Error('something went wrong'))
        const response = await request(app)
        .post('/product/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abcdee')
        .field('description', 'a'.repeat(20))
        .field('price',199.99)
        .field('stock',10)
        .field('category','Eletrônicos')
        .field('storeId',stores[0].id)
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('An unexpected error occurred. Please try again later.')
        expect(response.statusCode).toEqual(500)
        expect(googleStorage).toHaveBeenCalledTimes(0)
    })
}) 