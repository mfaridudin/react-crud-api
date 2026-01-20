import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

function GoogleCallback() {
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get("token")

        if (token) {
            Cookies.set("token", token, {
                expires: 7,
                path: "/",
            })
            navigate("/")
        } else {
            navigate("/login")
        }
    }, [])

    return <p>Logging in...</p>
}

export default GoogleCallback
