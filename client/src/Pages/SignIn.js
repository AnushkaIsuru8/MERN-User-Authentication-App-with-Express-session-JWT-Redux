import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function SignIn() {

    const [userName, setUserName] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:8080/signin', { "userName": userName })
            .then(res => {
                if ("new" === res.data) {
                    navigate('/signup')
                    window.location.href = "/signup"
                } else if ("old" === res.data) {
                    navigate('/signin2')
                } else {
                    alert("Something wend wrong")
                }
            }).catch(err => alert(err))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={userName} onInput={(e) => { setUserName(e.target.value) }} placeholder="username"/>
            <button >NEXT</button>
        </form>
    )
}