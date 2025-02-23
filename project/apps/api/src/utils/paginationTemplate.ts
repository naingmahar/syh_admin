export interface IPagination<T>{
    skip:number,
    limit:number,
    total:number,
    data:T,
    index?:number,
    id?:number
}