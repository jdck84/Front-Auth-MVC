//Manejo del local storage

export const storage = {
    get (key) {
        try{
            const getStorage = localStorage.getItem(key)
            return getStorage ? JSON.parse(getStorage) : null
        } catch { return null }
    },
    set (key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch {}
    },
    remove (key) {
        try {
            localStorage.removeItem(key)
        } catch {}
    },
    clear () {
        try {
            localStorage.clear()
        } catch {}
    }
}