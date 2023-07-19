export interface Libro{    
    titulo: string
    isbn: string
    fecha_edicion: string
    precio: number
    stock?: number
    stock_consignado?:number    
}

export interface Persona{
    nombre: string
    email: string
    dni: number
}
