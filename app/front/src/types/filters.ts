import type { categories } from "@/constants"

export type OrderBy = 'asc' | 'desc' 

export type Category = typeof categories[number]
export type CategoryMapped = Category & "Todas"

export type Filter = {
    orderBy:OrderBy,
    minPrice:number,
    maxPrice:number,
    category:CategoryMapped
}

export type DatasSelect<T extends string | number> = {
    value: T;
    text: string;
};
