import {  getString, getValidString } from "@/helpers";
import { checkIsAValidCategory, checkIsAValidNumber, checkisAValidString, checkIsValidStatus, checkOrderBy } from "@/helpers/checkIsValid";
import { ErrorMessage } from "@/helpers/ErrorMessage";
import { FilterProductsInput } from "@/modules/products/types/product.types";
import { Orderby } from "@/types/global.types";
import { Request } from "express";
export const validateFilterProducts = (
  req: Request
): FilterProductsInput => {
  const { name, orderBy, category, minPrice, maxPrice } = req.query

  let nameStr = getValidString(name)
  let categoryStr = getValidString(category)



  const minPriceNum =
    minPrice !== undefined && minPrice !== ""
      ? Number(minPrice)
      : undefined

  const maxPriceNum =
    maxPrice !== undefined && maxPrice !== ""
      ? Number(maxPrice)
      : undefined

  const orderByStr: Orderby =
    orderBy === "asc" || orderBy === "desc"
      ? orderBy
      : "asc"

  if (categoryStr && !checkIsAValidCategory(categoryStr)) {
    throw new ErrorMessage({
      message: "Invalid category provided",
      status: 400,
      service: "ValidatorFilterProducts",
      action: "filterProducts"
    })
  }

  if (nameStr && !checkisAValidString(nameStr)) {
    throw new ErrorMessage({
      message: "Invalid name format",
      status: 400,
      service: "ValidatorFilterProducts",
      action: "filterProducts"
    })
  }

  if (
    minPriceNum !== undefined &&
    !checkIsAValidNumber(minPriceNum)
  ) {
    throw new ErrorMessage({
      message: "Invalid minimum price value",
      status: 400,
      service: "ValidatorFilterProducts",
      action: "filterProducts"
    })
  }

  if (
    maxPriceNum !== undefined &&
    !checkIsAValidNumber(maxPriceNum)
  ) {
    throw new ErrorMessage({
      message: "Invalid maximum price value",
      status: 400,
      service: "ValidatorFilterProducts",
      action: "filterProducts"
    })
  }

  if (
    minPriceNum !== undefined &&
    maxPriceNum !== undefined &&
    minPriceNum > maxPriceNum
  ) {
    throw new ErrorMessage({
      message: "Minimum price cannot be greater than maximum price",
      status: 400,
      service: "ValidatorFilterProducts",
      action: "filterProducts"
    })
  }

  return {
    orderBy: orderByStr,
    category: categoryStr,
    name: nameStr,
    minPrice: minPriceNum,
    maxPrice: maxPriceNum,
    take: 10,
    skip: 0
  }
}