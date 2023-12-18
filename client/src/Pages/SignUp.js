import { useState } from "react"
import axios from "axios"

export default function SignUp() {

    const [userName, setUserName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:8080/', {userName})
        .then(res => {
            console.log(res)
        }).catch(err => alert(err))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={userName} onInput={(e) => { setUserName(e.target.value) }} />
            <button >NEXT</button>
        </form>
    )
}