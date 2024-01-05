import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function EnterUsername() {

    const [userName, setUserName] = useState('asdf')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:5000/setUsername',
            { "username": userName }
        )
            .then(res => {
                if (201 === res.status) {
                    navigate('/register')
                } else if (200 === res.status) {
                    navigate('/login')
                } else {
                    alert("Something wend wrong")
                }
            }).catch(err => alert(err))
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Enter Username</h1>
            <input value={userName} onInput={(e) => { setUserName(e.target.value) }} placeholder="username" />
            <button >NEXT</button>
        </form>
    )
}