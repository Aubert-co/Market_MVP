export type MenuItem = {
  label: string
  icon: React.ReactNode
  onClick?: () => void,
  isActive:boolean,
  linkTo:string
}