export interface User{
  userName:string
  displayName:string
  token:string
  Image?:string
}

export interface UserFormValues{
  email:string
  password:string
  displayName?:string
  userName?:string
}  