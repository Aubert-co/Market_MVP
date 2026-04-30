import request from "supertest"
import { ImageUploadService } from "@/services/ImageUploadService"
import app from "@/serve"
import path from "path"
import { prisma } from "@/lib/prisma"
import { cleanAllDb, deleteStore, deleteUser } from "@/tests/__mocks__"
import { generateAccessToken } from '@/helpers/AuthTokens'

const cookies =  generateAccessToken(1)
const cookieWithouStore = generateAccessToken(2)

const checkExistsStore = async()=>{
    const count = await prisma.store.count()
    return count
}
const endpoint = "/api/stores"
const spyFileUpload = jest.spyOn(ImageUploadService.prototype,'uploadImage')
const IMAGEJPG =  path.join(process.cwd(), 'src/tests/assets/tmp/image.jpg')
const LARGEIMAGE = path.join(process.cwd(),'src/tests/assets/tmp/large-image.jpg')
const IMAGEPDF = path.join(process.cwd(),'src/tests/assets/tmp/image.pdf')
const IMAGEMP4 = path.join(process.cwd(),'src/tests/assets/tmp/image.mp4')
describe("Post:/stores try to create a store without token",()=>{
    beforeAll(async()=>{
        await cleanAllDb()
    })
    afterAll(async()=>{
        try{
            await checkExistsStore()
        }catch(err:any){
            throw new Error("Some test created a store");
        }
    })
    it("should return 'Acess denied' and status 401 when try to create a store withou login",async()=>{
        const response = await request(app)
        .post(endpoint)
        .field('name', 'Minha Loja')
        .field('description', 'Descrição da loja')
        .attach('image',IMAGEJPG); 
        
        expect(response.body.message).toEqual('Access Denied')
        expect(response.statusCode).toEqual(401)
    })
})

describe("Post:/stores  DB actions",()=>{
    
    const data = { id:1,name:'lucas',password:'123456',email:'lucas@gmail.com'}
    beforeAll(async ()=>{
      
        await deleteStore()
        await prisma.user.create({data})
        spyFileUpload.mockResolvedValue({success:true})
    })
     afterAll(async()=>{
        await deleteStore()
        await deleteUser()
     })
     it("should sucessfully create a new store",async()=>{  
        const name = 'Minha Loja'
        const description = 'Lorem iptus testing'
        const response = await request(app)
        .post(endpoint)
        .set('Cookie', [`token=${cookies}`])
        .field('name', name)
        .field('description', description)
        .attach('image', IMAGEJPG); 
        
        expect(response.statusCode).toEqual(201)
        expect(response.body.message).toEqual('Store sucessfully created')
    
        expect(spyFileUpload).toHaveBeenCalledTimes(1)

        const selectStore = await prisma.store.findMany({where:{userId:data.id}})
        const [newStore] = selectStore
        expect( selectStore ).toHaveLength(1)
        expect( newStore.name).toEqual(name)
        expect( newStore.description ).toEqual( description )
    })
})

describe("Post:/stores - Invalid store name",()=>{
    afterAll(async()=>{
        try{
            await checkExistsStore()
        }catch(err:any){
            throw new Error("Some test created a store");
        }
    })
    it("should return status 422 and message 'Invalid name. Please check and try again.' when name is empty.",async()=>{
        const response = await request(app)
        .post(endpoint)
        .set('Cookie', [`token=${cookies}`])
        .field('name', '')
        .field('description', 'Descrição da loja')
        .attach('image', IMAGEJPG); 
        
        expect(response.body.message).toEqual("Invalid name. Please check and try again.")
        expect(response.statusCode).toEqual(422)
    })
     it("should return status 422 and message 'Invalid name. Please check and try again.' when name is shorter than 4",async()=>{
       
        
        const response = await request(app)
        .post(endpoint)
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'abc')
        .field('description', 'Descrição da loja')
        .attach('image', IMAGEJPG); 
        
        expect(response.body.message).toEqual("Invalid name. Please check and try again.")
        expect(response.statusCode).toEqual(422)
    })
     it("should return status 422 and message 'Invalid name. Please check and try again.' when name is greater than 15",async()=>{
   
        
        const response = await request(app)
        .post(endpoint)
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'a'.repeat(16))
        .field('description', 'Descrição da loja')
        .attach('image', IMAGEJPG); 
        
        expect(response.body.message).toEqual("Invalid name. Please check and try again.")
        expect(response.statusCode).toEqual(422)
    })
})

describe("Post:/stores - Invalid store description ",()=>{
    afterAll(async()=>{
        try{
            await checkExistsStore()
        }catch(err:any){
            throw new Error("Some test created a store");
        }
    })
    it("should return status 422 and message 'Invalid store description. Please check and try again.' when description is empty.",async()=>{
        
        
        const response = await request(app)
        .post(endpoint)
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'MinhaLoja')
        .field('description', '')
        .attach('image', IMAGEJPG); 
        
        expect(response.body.message).toEqual("Invalid store description. Please check and try again.")
        expect(response.statusCode).toEqual(422)
    })
     it("should return status 422 and message 'Invalid store description. Please check and try again.' when store description is shorter than 4",async()=>{
       
        
        const response = await request(app)
        .post(endpoint)
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'MinhaLoja')
        .field('description', 'abc')
        .attach('image', IMAGEJPG); 
        
        expect(response.body.message).toEqual("Invalid store description. Please check and try again.")
        expect(response.statusCode).toEqual(422)
    })
     it("should return status 422 and message 'Invalid store description. Please check and try again.' when store description is greater than 200",async()=>{
      
        
        const response = await request(app)
        .post(endpoint)
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'MinhaLoja')
        .field('description', 'a'.repeat(201))
        .attach('image', IMAGEJPG); 
        
        expect(response.body.message).toEqual("Invalid store description. Please check and try again.")
        expect(response.statusCode).toEqual(422)
    })
})

describe("Post:/stores - Invalid image",()=>{
     afterAll(async()=>{
        try{
            await checkExistsStore()
        }catch(err:any){
            throw new Error("Some test created a store");
        }
    })
    
    it("should return 'Invalid or missing image file.' when not send a image",async()=>{
        const response = await request(app)
        .post(endpoint)
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'MinhaLoja')
        .field('description', 'a description')
        .attach('image', ''); 
        
        expect(response.body.message).toEqual("Invalid or missing image file.")
        expect(response.statusCode).toEqual(422)
    })
     it("should return 'Invalid or missing image file.' the image is greater than 5mb",async()=>{
        const response = await request(app)
        .post(endpoint)
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'MinhaLoja')
        .field('description', 'a description')
        .attach('image',LARGEIMAGE); 
         
        expect(response.body.message).toEqual("Image file size exceeds the 5MB limit.")
        expect(response.statusCode).toEqual(422)
    })
    it("should return 'Invalid or missing image file.' when send a pdf",async()=>{
        const response = await request(app)
        .post(endpoint)
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'MinhaLoja')
        .field('description', 'a description')
         .attach('image',IMAGEPDF ); 
        
        expect(response.body.message).toEqual("Invalid or missing image file.")
        expect(response.statusCode).toEqual(422)
    })
    it("should return 'Invalid or missing image file.' when send a mp4",async()=>{
        const response = await request(app)
        .post(endpoint)
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'MinhaLoja')
        .field('description', 'a description')
         .attach('image', IMAGEMP4); 
        
        expect(response.body.message).toEqual("Invalid or missing image file.")
        expect(response.statusCode).toEqual(422)
    })
})

describe("Post:/stores - db actions",()=>{
    const data = [{ id:1,name:'lucas',password:'123456',email:'lucas@gmail.com'},{ id:2,name:'joseff',password:'123456',email:'lucas@gmail.com.br'}]
    const storeData = {id:111,name:'stores',description:'description',userId:1}
    
    beforeEach(()=>{
        spyFileUpload.mockResolvedValue({success:true})
        jest.clearAllMocks()
    })
    beforeAll(async ()=>{
        await cleanAllDb()
        await prisma.user.createMany({data})
        await prisma.store.create({data:storeData})
    })
     afterAll(async()=>{
        try{
            await checkExistsStore()
              await cleanAllDb()    
        }catch(err:any){
            throw new Error("Some test created a store");
        }
    })
   
    it("should return the message 'A store with this name already exists.' when trying to use an existing name.",async()=>{
   
          
        const response = await request(app)
        .post(endpoint)
        .set('Cookie', [`token=${cookies}`])
        .field('name', storeData.name)
        .field('description', 'Descrição da loja')
        .attach('image', IMAGEJPG); 
        
        expect(response.body.message).toEqual('A store with this name already exists.')
        expect(response.statusCode).toEqual(409)
        expect(spyFileUpload).not.toHaveBeenCalled()
    })
    it("should return an error when the database throws an error and not call google storage",async()=>{
        jest.spyOn(prisma.store,'create').mockRejectedValueOnce(new Error('Simulated DB error: Connection lost.'));
     
        
        const response = await request(app)
        .post(endpoint)
        .set('Cookie', [`token=${cookieWithouStore}`])
        .field('name', 'newName')
        .field('description', 'Descrição da loja')
        .attach('image', IMAGEJPG); 
        
        expect(spyFileUpload).not.toHaveBeenCalled()
        expect(response.body.message).toEqual('Failed to create a store')
        expect(response.statusCode).toEqual(409)
       
    })
    it("should return an error when the user already has a store",async()=>{
   
        
        const response = await request(app)
        .post(endpoint)
        .set('Cookie', [`token=${cookies}`])
        .field('name', 'tesing')
        .field('description', 'Descrição da loja')
        .attach('image', IMAGEJPG); 
        
        expect(spyFileUpload).not.toHaveBeenCalled()
        expect(response.body.message).toEqual('User already has a store')
        expect(response.statusCode).toEqual(409)
    })
}) 
    