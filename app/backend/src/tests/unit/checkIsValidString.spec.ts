import { isValidString } from "../../helpers/checkIsValid";


describe("when value length is smaller than minLength", () => {
  test.each([
    ["", 4],
    ["A", 4],
    ["AB", 4],
    ["ABC", 4],
    ["Test", 5],
    ["Hello", 10],
  ])(
    'should return false for "%s" when minLength is %i',
    (value, minLength) => {
      expect(
        isValidString(value, {
          minLength,
          maxLength: 20,
        }),
      ).toBeFalsy()
    },
  )
})
describe("when value length is greater than maxLength", () => {
  test.each([
    "ABCDE",
    "ABCDEF",
    "A".repeat(10),
    "A".repeat(100),
  ])('should return false for "%s"', (value) => {
    expect(
      isValidString(value, {
        minLength: 1,
        maxLength: 4,
      }),
    ).toBeFalsy()
  })
})

describe("when value contains invalid strings", () => {
  test.each([
    "",
    " ",
    "    ",
    "\t",
    "\n",
    "<>",
    "</>",
    "<script>",
    "<script>alert('xss')</script>",
    "<img src=x onerror=alert(1)>",
    "{name:lucas}",
    "[testing]",
    "///",
    "\\",
    "&&&",
    "###",
    "@@@",
    `lorem itpstu qetqe testing my name is lorem itpsu <scrip/>`
  ])('should return false for "%s"', (value) => {
    expect(
      isValidString(value, {
        minLength: 1,
        maxLength: 100,
      }),
    ).toBeFalsy()
  })
})

describe("when value is a valid string", () => {
  test.each([
    "Mouse Gamer",
    "Teclado mecânico",
    "Câmera profissional",
    "Notebook, Dell Inspiron",
    "Fone: Bluetooth JBL",
    "Smartphone - Galaxy A54",
    "Produto incrível!",
    "Áudio de alta qualidade",
    "Descrição com acentos e vírgulas, bem formatada",
    "Café premium 100% arábica",
    "Monitor 24 polegadas (Full HD)",
    "Suporte técnico: rápido e eficiente",
    ' testando o "name"'
  ])('should return true for "%s"', (value) => {
    expect(
      isValidString(value, {
        minLength: 4,
        maxLength: 100,
      }),
    ).toBeTruthy()
  })
})