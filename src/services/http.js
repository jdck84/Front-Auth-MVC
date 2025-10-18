//Llamar a la API y me devuelve la data
const API_URL = import.meta.env.VITE_API_URL

const parse = async (res) => {
    //Si no hay contenido en la res --> 204 - No Content
    if(res.status === 204) return null

    const text = await res.text()

    //Si el body viene vacío
    if(!text) return null

    try {
        return JSON.parse(text)
    } catch {
        return text
    }
}

export const http = async (path,{method='GET', body, token, headers}) => {
    //Configuro la respuesta de mi petición
    const res = await fetch(`${API_URL}${path}`, {
        method, 
        headers: {
            'Content-Type': 'application/json',
            ...( token ? { Authorization: `Bearer ${token}`} : {} ),
            ...( headers || {} )
        },
        body: body ? JSON.stringify(body) : undefined
    })

    //Gestiono la respuesta
    const data = await parse(res)
    if(!res.ok){
        const message = (data && (data.err || data.message) || `Error ${res.status}`)
        throw new Error(message)
    }
    //Devolver la respuesta
    return data
}