export const getLibros = async (API_URL:string) => {
    const response = await fetch(`${API_URL}/libros`)
    const libros = await response.json()
    return libros
}
