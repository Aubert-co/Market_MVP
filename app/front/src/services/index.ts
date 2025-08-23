import { api } from "../constants/urls"

export const  headers ={'Content-Type':'application/json'}


export const loadImage = (imageName:string)=>api+`/images/${imageName}`