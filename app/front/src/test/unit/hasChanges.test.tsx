import { hasChanges } from "@/utils/checkIsValid";



describe("hasChanges", () => {
  const base = {
    name: "",
    description: "",
    price: "",
    stock: "",
    category: ""
  }

  it("should return false when there are no changes", () => {
    const result = hasChanges(base, { ...base })

    expect(result).toBe(false)
  })

  it("should return true when one field has changed", () => {
    const result = hasChanges(base, {
      ...base,
      name: "Camisa polo"
    })

    expect(result).toBe(true)
  })

  it("should return true when multiple fields have changed", () => {
    const result = hasChanges(base, {
      ...base,
      price: "29.99",
      stock: "5"
    })

    expect(result).toBe(true)
  })

  it("should return true when a field changes from empty to value", () => {
    const original = {
      name: "Camisa",
      description: "",
      price: "",
      stock: "",
      category: ""
    }

    const current = {
      ...original,
      description: "Nova descrição"
    }

    const result = hasChanges(original, current)

    expect(result).toBe(true)
  })

  it("should return true when a field changes from value to empty", () => {
    const original = {
      name: "Camisa",
      description: "Descrição",
      price: "19.99",
      stock: "10",
      category: "roupas"
    }

    const current = {
      ...original,
      price: ""
    }

    const result = hasChanges(original, current)

    expect(result).toBe(true)
  })
})
