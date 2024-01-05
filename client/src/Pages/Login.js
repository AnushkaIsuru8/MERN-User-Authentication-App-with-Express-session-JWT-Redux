import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { authActions } from "../store"

export default function Login() {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const [textInput, settextInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:5000/login', { "password": textInput })
            .then(res => {
                if (202 === res.status) {
                    dispatch(authActions.login())
                    navigate('/welcome')
                }
                else if (204 === res.status) {
                    alert("Password Not matched. Try again")
                } else {
                    alert("Something went wrong")
                }
            }).catch(err => alert(err))
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Enter Password to Sign in with Old Account</h1>
            <input value={textInput} onInput={(e) => { settextInput(e.target.value) }} placeholder="password" />
            <button >NEXT</button>
        </form>
    )
}