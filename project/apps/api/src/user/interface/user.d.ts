interface ICreateUser{
  id: number,
  name: string,
  device_id: string,
  device_info: string,
  device_name: string,
  phone?: string,
  password?: string,
  user_image?: string,
  nrc?: string,
  dob?:string,
}

interface IFindUser{
  id:number,
  phone:string,
  device_id:string
}


export  {ICreateUser,IFindUser}