export const  headers ={'Content-Type':'application/json'}
export const url = "http://localhost:8080"

export const loadImage = (imageName:string)=>url+`/images/${imageName}`