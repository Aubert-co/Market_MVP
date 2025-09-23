import request from "supertest"
import * as FileUpload from "../../lib/googleStorage"
import app from "../../serve"
import path from "path"
import { prisma } from "../../lib/prisma"
import { cleanAllDb, deleteStore, deleteUser } from "../__mocks__"
import { generateAccessToken } from '../../helpers/AuthTokens'

const cookies =  generateAccessToken(1)

describe("Post:/store/create try to create a store without token",()=>{
    let spyFileUpload:any;
    beforeAll(async()=>{
        await cleanAllDb()
        spyFileUpload = jest.spyOn(FileUpload,"uploadFileToGCS").mockResolvedValue("sucess")
    })
    it("should return 'Acess denied' and status 401 when try to create a store withou login",async()=>{
        const response = await request(app)
        .post('/store/create')
        .field('name', 'Minha Loja')
        .field('description', 'Descrição da loja')
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('Access Denied')
        expect(response.statusCode).toEqual(401)
    })
})

describe("Post:/store/create  DB actions",()=>{
    let googleStorage:any;
    beforeAll(async ()=>{
        const data = { id:1,name:'lucas',password:'123456',email:'lucas@gmail.com'}
        await deleteStore()
        await prisma.user.create({data})
        googleStorage = jest.spyOn(FileUpload,"uploadFileToGCS").mockResolvedValue("sucess")
    })
     afterAll(async()=>{
        await deleteStore()
        await deleteUser()
     })
     it("should sucessfully create a new store",async()=>{
         
         
        
        const response = await request(app)
        .post('/store/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'Minha Loja')
        .field('description', 'Descrição da loja')
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.statusCode).toEqual(201)
        expect(response.body.message).toEqual('Store sucessfully created')
    
        expect(googleStorage).toHaveBeenCalledTimes(1)
    })
})

describe("Post:/store/create - Invalid store name",()=>{
    it("should return status 422 and message 'Invalid name. Please check and try again.' when name is empty.",async()=>{
        const response = await request(app)
        .post('/store/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', '')
        .field('description', 'Descrição da loja')
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual("Invalid name. Please check and try again.")
        expect(response.statusCode).toEqual(422)
    })
     it("should return status 422 and message 'Invalid name. Please check and try again.' when name is shorter than 4",async()=>{
       
        
        const response = await request(app)
        .post('/store/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abc')
        .field('description', 'Descrição da loja')
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual("Invalid name. Please check and try again.")
        expect(response.statusCode).toEqual(422)
    })
     it("should return status 422 and message 'Invalid name. Please check and try again.' when name is greater than 15",async()=>{
   
        
        const response = await request(app)
        .post('/store/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'a'.repeat(16))
        .field('description', 'Descrição da loja')
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual("Invalid name. Please check and try again.")
        expect(response.statusCode).toEqual(422)
    })
})

describe("Post:/store/create - Invalid store description ",()=>{
    it("should return status 422 and message 'Invalid store description. Please check and try again.' when description is empty.",async()=>{
        
        
        const response = await request(app)
        .post('/store/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'MinhaLoja')
        .field('description', '')
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual("Invalid store description. Please check and try again.")
        expect(response.statusCode).toEqual(422)
    })
     it("should return status 422 and message 'Invalid store description. Please check and try again.' when store description is shorter than 4",async()=>{
       
        
        const response = await request(app)
        .post('/store/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'MinhaLoja')
        .field('description', 'abc')
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual("Invalid store description. Please check and try again.")
        expect(response.statusCode).toEqual(422)
    })
     it("should return status 422 and message 'Invalid store description. Please check and try again.' when store description is greater than 200",async()=>{
      
        
        const response = await request(app)
        .post('/store/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'MinhaLoja')
        .field('description', 'a'.repeat(201))
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual("Invalid store description. Please check and try again.")
        expect(response.statusCode).toEqual(422)
    })
})

describe("Post:/store/create - Invalid image",()=>{
   
    
    it("should return 'Invalid or missing image file.' when not send a image",async()=>{
        const response = await request(app)
        .post('/store/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'MinhaLoja')
        .field('description', 'a description')
        .attach('image', ''); 
        
        expect(response.body.message).toEqual("Invalid or missing image file.")
        expect(response.statusCode).toEqual(422)
    })
     it("should return 'Invalid or missing image file.' the image is greater than 5mb",async()=>{
        const response = await request(app)
        .post('/store/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'MinhaLoja')
        .field('description', 'a description')
        .attach('image', path.resolve(__dirname, '../assets/tmp/large-image.jpg')); 
         
        expect(response.body.message).toEqual("Image file size exceeds the 5MB limit.")
        expect(response.statusCode).toEqual(422)
    })
    it("should return 'Invalid or missing image file.' when send a pdf",async()=>{
        const response = await request(app)
        .post('/store/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'MinhaLoja')
        .field('description', 'a description')
         .attach('image', path.resolve(__dirname, '../assets/tmp/image.pdf')); 
        
        expect(response.body.message).toEqual("Invalid or missing image file.")
        expect(response.statusCode).toEqual(422)
    })
    it("should return 'Invalid or missing image file.' when send a mp4",async()=>{
        const response = await request(app)
        .post('/store/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'MinhaLoja')
        .field('description', 'a description')
         .attach('image', path.resolve(__dirname, '../assets/tmp/image.mp4')); 
        
        expect(response.body.message).toEqual("Invalid or missing image file.")
        expect(response.statusCode).toEqual(422)
    })
})

describe("Post:/store/create - db actions",()=>{
    const data = { id:2,name:'lucas',password:'123456',email:'lucas@gmail.com'}
    const storeData = {id:111,name:'stores',description:'description',userId:2}
    let googleStorage:any;
    beforeEach(()=>{
        googleStorage= jest.spyOn(FileUpload,"uploadFileToGCS").mockResolvedValue("sucess")
          
        jest.clearAllMocks()
    
    })
    beforeAll(async ()=>{
        
            await deleteStore()
            
            await prisma.user.create({data})
            await prisma.store.create({data:storeData})
        })
    afterAll(async()=>{
        await deleteStore()
        await deleteUser()
           
     
            
    }) 
    it("should return the message 'A store with this name already exists.' when trying to use an existing name.",async()=>{
          googleStorage.mockResolvedValue("sucess")
          
        const response = await request(app)
        .post('/store/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', storeData.name)
        .field('description', 'Descrição da loja')
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(response.body.message).toEqual('A store with this name already exists.')
        expect(response.statusCode).toEqual(409)
        expect(googleStorage).not.toHaveBeenCalled()
    })
    it("should return an error when the database throws an error and not call google storage",async()=>{
        jest.spyOn(prisma.store,'create').mockRejectedValueOnce(new Error('Simulated DB error: Connection lost.'));
        const googleStorage = jest.spyOn(FileUpload,"uploadFileToGCS").mockResolvedValue("sucess")
        
        const response = await request(app)
        .post('/store/create')
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'newName')
        .field('description', 'Descrição da loja')
        .attach('image', path.resolve(__dirname, '../assets/tmp/image.jpg')); 
        
        expect(googleStorage).not.toHaveBeenCalled()
        expect(response.body.message).toEqual('Failed to create a store')
        expect(response.statusCode).toEqual(409)
       
    })
})
   