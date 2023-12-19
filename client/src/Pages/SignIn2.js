import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function SignIn2() {
    const navigate = useNavigate()
    const [textInput, settextInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:8080/signin2', {textInput})
        .then(res => {
            if ("matched" === res.data) {
                navigate('/admin')             
            } 
            else if ("notMatched" === res.data) {
                alert("Password Not matched. Try again")
            } else {
                alert("Something went wrong")
            }
        }).catch(err => alert(err))
    }

    return (
        <form onSubmit={handleSubmit}>
        <h1>Enter Password to Sign in with Old Account</h1>
            <input value={textInput} onInput={(e) => { settextInput(e.target.value) }} placeholder="password"/>
            <button >NEXT</button>
        </form>
    )
}