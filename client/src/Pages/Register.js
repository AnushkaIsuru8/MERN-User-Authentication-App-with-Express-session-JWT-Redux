import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Register() {

    const [textInput, setTextInput] = useState('asdf')
    const [formState, serFormState] = useState(0)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:5000/register', { "password": textInput }
        )
            .then(res => {
                if (202 === res.status) {
                    serFormState(1)
                    setTimeout(() => {
                        navigate('/welcome')
                    }, 3000)
                } else {
                    alert("Something wend wrong")
                }
            }).catch(err => console.log(err))
    }

    return (
        <>
            {
                formState ? <h1>Acount created<br/> You will redirect to admin</h1>
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