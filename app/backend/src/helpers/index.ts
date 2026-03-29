export const categories = [
  "Roupas",
  "Eletrônicos",
  "Livros",
  "Brinquedos",
  "Beleza",
  "Esporte",
  "Automotivo",
  "Cozinha",
  "Celulares",
  "Informática",
  "Jardim",
  "Petshop",
  "Mercearia",
  "Moda",
  "Acessórios"
];
export const orderBy = ["asc","desc"]

 
export const roundTottaly = (value:number, decimals:number = 2):number=> {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}



export  const getString = (value: unknown) =>
typeof value === "string" ? value : undefined;
