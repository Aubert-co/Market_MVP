import type { ProductDetails } from "@/types/productDetail.types"
import type { ResponseDatas} from '@/types/services.types'


/*
const selectedProduct: ProductDetails = {
  product: [
    {
      id: 1,
      name: "Wireless Gaming Mouse",
      price: 249.99,
      imageUrl: "https://example.com/images/mouse.jpg",
      category: "Peripherals",
      stock: 35,
      description: "Ergonomic wireless gaming mouse with RGB lighting and 16000 DPI sensor."
    }
  ],
  ratings: {
    _avg: {
      rating: 4.6
    },
    _count: {
      rating: 28
    }
  },
  comments: [
    {
      content: "Excellent product, very responsive and fits perfectly in hand.",
      name: "Alice"
    },
    {
      content: "Battery lasts long and the DPI control is a game changer!",
      name: "Lucas"
    },
    {
      content: "Good value for the price. Works great with my setup.",
      name: "Maya"
    },
    {
      content: "Shipping was fast, and the product is exactly as described.",
      name: "Daniel"
    }
  ],
  reviews:[{
    rating:3
  },
  {rating:4},
  {rating:5},
  {rating:4.5},
  {rating:3.3}
  ]
}
  */


export type ProductDetailBody = {
  productId?:number | string 
}
export const productDetail =  async ({productId}:ProductDetailBody):Promise<ResponseDatas<ProductDetails>>=>{
    try{
        const response = await fetch(`/product/${productId}`,{
            method:'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        })
        if(!response.ok){
          return {datas:{ comments:[],
            ratings:{
                _avg:{
                    rating:0
                },
                _count:{
                    rating:0
                },
                
            },
            product:[],
            reviews:[]},message:'',status:response.status}
        }
        const {datas,message} = await response.json()
        return {datas,status:response.status,message}
    }catch(err:unknown){
        return {
          datas:{
            comments:[],
            ratings:{
                _avg:{
                    rating:0
                },
                _count:{
                    rating:0
                },
                
            },
            product:[],
            reviews:[]
        },
        status:500,
        message:'Algo deu errado!'
      }
    }
}