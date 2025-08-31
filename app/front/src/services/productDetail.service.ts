import { api } from "@/constants/urls"
import { headers } from "."
import type { ProductDetails } from "@/types/productDetail.types"

type FetchProductDetail = {
    setDatas:(params:{datas:ProductDetails,status:number})=>void,
    productId:string
}
type Response = {
    datas:ProductDetails
    status:number
}
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
export const fetchProductDetail = async({setDatas,productId}:FetchProductDetail)=>{
  const { datas , status} = await productDetailService(productId)
   
  setDatas({datas,status})
}

export const productDetailService = async(productId:string):Promise<Response>=>{
    try{
        const response = await fetch(api+`/product/${productId}`,{
            method:'GET',
            headers
        })
        if(!response.ok)throw new Error();
        const values = await response.json()
        return {datas:values.datas,status:response.status}
    }catch(err:unknown){
        return {datas:{
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
        },status:500}
    }
}