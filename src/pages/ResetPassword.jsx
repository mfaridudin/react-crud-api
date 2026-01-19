import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import axios from "axios"

function ResetPassword() {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const { token } = useParams()
    const email = searchParams.get("email")

    const [password, setPassword] = useState("")
    const [password_confirmation, setPasswordConfirmation] = useState("")

    const [validation, setValidation] = useState([])
    const [message, setMessage] = useState("")


    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/")
        }

        if (!token || !email) {
            setMessage("Link reset password tidak valid")
        }
    }, [navigate, token, email])

    const resetPassword = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/reset-password",
                {
                    token,
                    email,
                    password,
                    password_confirmation
                }
            )

            alert(response.data.message)
            navigate("/login")

        } catch (error) {
            if (error.response?.data?.errors) {
                setValidation(error.response.data.errors)
            } else {
                alert("Terjadi kesalahan")
            }
        }
    }

    return (
        <>
            <div className="bg-gray-5">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Reset Password
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={resetPassword}>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                    {
                                        validation.password && (
                                            <span className="text-red-500 text-sm">{validation.password[0]}</span>
                                        )
                                    }
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm new password</label>
                                    <input value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                    {
                                        validation.password_confirmation && (
                                            <span className="text-red-500 text-sm">{validation.password_confirmation[0]}</span>
                                        )
                                    }
                                </div>

                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword