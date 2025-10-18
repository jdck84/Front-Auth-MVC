//Almacenar el token del usuario

import { storage } from "./storage";

const KEY = 'token' //token

export const authStore = {
    get () { //Devuelve el token guardado
        return storage.get(KEY)
    },
    set (token) { //Guarda o actualiza el token
        return storage.set(KEY, token)
    },
    clear() { //Elimina el token (LOGOUT)
        return storage.remove(KEY)
    }
}