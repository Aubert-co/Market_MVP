import { buildUpdatePayload } from "@/utils/checkIsValid";


describe("buildUpdatePayload", () => {
  const originalFields = {
    name: "Camisa",
    description: "Camisa azul",
    price: "19.99",
    stock: "10",
    category: "roupas"
  }

  it("should return empty payload when no fields changed", () => {
    const payload = buildUpdatePayload({
      originalFields,
      newFields: { ...originalFields }
    })

    expect(payload).toEqual({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: ""
    })
  })

  it("should return payload with only changed name", () => {
    const payload = buildUpdatePayload({
      originalFields,
      newFields: {
        ...originalFields,
        name: "Camisa polo"
      }
    })

    expect(payload).toEqual({
      name: "Camisa polo",
      description: "",
      price: "",
      stock: "",
      category: ""
    })
  })

  it("should return payload with multiple changed fields", () => {
    const payload = buildUpdatePayload({
      originalFields,
      newFields: {
        ...originalFields,
        price: "29.99",
        stock: "5",
        category: "promo"
      }
    })

    expect(payload).toEqual({
      name: "",
      description: "",
      price: "29.99",
      stock: "5",
      category: "promo"
    })
  })

  it("should return full payload when all fields changed", () => {
    const payload = buildUpdatePayload({
      originalFields,
      newFields: {
        name: "Nova camisa",
        description: "Nova descrição",
        price: "39.99",
        stock: "3",
        category: "luxo"
      }
    })

    expect(payload).toEqual({
      name: "Nova camisa",
      description: "Nova descrição",
      price: "39.99",
      stock: "3",
      category: "luxo"
    })
  })
})
