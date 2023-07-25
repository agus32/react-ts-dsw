export interface Libro{    
    titulo: string
    isbn: string
    fecha_edicion: string
    precio: number
    stock?: number
    stock_consignado?:number    
}



export interface User{
    username: string
    password: string
    
}

interface Person {
    id: number;
    nombre: string;
    email: string;
    dni: string;
  }