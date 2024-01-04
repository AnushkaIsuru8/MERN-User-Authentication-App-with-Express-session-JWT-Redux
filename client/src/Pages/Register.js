import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Register() {

    const [textInput, setTextInput] = useState('')
    const [formState, serFormState] = useState(0)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:8080/signup', { "textInput": textInput })
            .then(res => {
                if ("created" === res.data) {
                    serFormState(1)
                    setTimeout(() => {
                        navigate('/admin')
                    }, 3000)
                } else {
                    alert("Something wend wrong")
                }
            }).catch(err => alert(err))
    }

    return (
        <>
            {
                formState ? <h1>Acount createRenderer. u will redirect to admin</h1>
                    :
                    <form onSubmit={handleSubmit}>
                        <h1>password for create new Account</h1>
                        <input value={textInput} onInput={(e) => { setTextInput(e.target.value) }} placeholder="password" />
                        <button >NEXT</button>
                    </form>
            }
        </>
    )
}