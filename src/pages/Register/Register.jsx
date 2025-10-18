import { useState } from "react"
import { AuthService } from "../../services/auth.service"

export const Register = () => {
    //Estados del formulario y estados de carga y error (UI)
    const [form, setForm] = useState({nombre:'', email:'', edad:'', password:''})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [ok, setOk] = useState(null)

    //Gestión de los inputs del formulario
    const onChange = (e) => {
        const {name, value} = e.target
        setForm((prev)=>({...prev, [name]:value}))
    }
    
    //Validación de los campos del formulario antes de llamar a la API
    const validate = () => {
        if(!form.nombre.trim()) return 'El nombre es obligatorio'
        if(!form.email.includes('@')) return 'Introduce un email válido'
        if(!form.password || form.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres'
        if(form.edad && Number.isNaN(form.edad)) return 'La edad debe ser numérica'
        return null
    }
    

    //Envio del formulario - coger los datos y llamar a la API
    const onSubmit = async (e) => {
        e.preventDefault() //Evita la recarga después del submit
        setError(null) //Limpiamos los mensajes de error y de ok
        setOk(null)

        const validateForm = validate() //Comprueba errores del formulario con la validación
        if(validateForm) {
            setError(validateForm) //Si hay error lo setea, si no no hace nada
            return
        }

        setLoading(true)

        try{
            //Cogemos el payload, lo que nos da el usuario
            const payload = {
                nombre: form.nombre.trim(),
                email: form.email.trim().toLowerCase(),
                password: form.password,
                ...(form.edad ? {edad: Number(form.edad)} : {})
            }

            //Llamo a la API
            const data = await AuthService.register(payload)
            console.log('Respuesta Register',data)
            setOk('Registo completo, ya puedes hacer Login!')
        } catch (err) {
            setError(err.message || 'Error en el registro')
        } finally {
            setLoading(false) //Termina el proceso de llamada a la API
        }
    }

    //Template de la página Register
    return(
        <section className="card">
            <h2>REGISTRO</h2>
            <form onSubmit={onSubmit}>
                <div className="field">
                    <label htmlFor="nombre">Nombre</label>
                    <input id="nombre" name="nombre" value={form.nombre} onChange={onChange} autoComplete="name" />
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" value={form.email} onChange={onChange} autoComplete="email" />
                </div>
                <div className="field">
                    <label htmlFor="edad">Edad (opcional)</label>
                    <input id="edad" name="edad" value={form.edad} onChange={onChange} inputMode="numeric" />
                </div>
                <div className="field">
                    <label htmlFor="password">Contraseña</label>
                    <input id="password" name="password" value={form.password} onChange={onChange} autoComplete="new-password" />
                </div>

                {error && <div role="alert" className="error">{error}</div>}
                {ok && <div role="status">{ok}</div>}

                <div className="row" style={{justifyContent:'flex-end'}}>
                    <button type="button" className="btn outline" onClick={()=>setForm({nombre:'', email:'', edad:'', password:''})}>Limpiar</button>
                    <button className="btn" disabled={loading}>{loading ? 'Creando....' : 'Registrarme'}</button>
                </div>
            </form>
        </section>

    )
}