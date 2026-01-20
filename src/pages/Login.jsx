import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';
import { Input } from "../components/Input";
import { Button } from "../components/Button";

function Login() {

    // link api
    const baseApiUrl = import.meta.env.VITE_API_BASE_URL
    const googleLogin = import.meta.env.VITE_GOOGLE_LOGIN_URL

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validation, setValidation] = useState([]);


    useEffect(() => {
        if (Cookies.get('token')) {
            navigate("/")
        }
    }, [navigate])

    const login = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("email", email)
        formData.append("password", password)

        try {

            const response = await axios.post(`${baseApiUrl}/login`,
                formData
            )
            console.log(response)

            const token = response.data.token

            Cookies.set('token', token, {
                expires: 7,
                secure: false,
                sameSite: 'lax',
                path: '/'
            });

            navigate("/");
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    setValidation(error.response.data.errors)
                }

                if (error.response.status === 401) {
                    setValidation({
                        message: error.response.data.message
                    })
                }
            }
        }
    }

    const loginWithGoogle = () => {
        window.location.href = `${googleLogin}`
    }

    return (
        <>
            <div className="bg-gray-5">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign in an account
                            </h1>

                            <div className="flex items-center justify-center">
                                {validation?.message && (
                                    <span className="text-red-500 text-sm">
                                        {validation.message}
                                    </span>
                                )}
                            </div>

                            <form className="space-y-4 md:space-y-6" onSubmit={login}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                                    {validation.email && (
                                        <span className="text-red-500 text-sm text-center items-center">
                                            {validation.email}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                        <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                    </div>
                                    {validation.password && (
                                        <span className="text-red-500 text-sm text-center items-center">
                                            {validation.password}
                                        </span>
                                    )}
                                    <div className="pt-1.5">
                                        <Link to="/forgot-password" className="font-medium text-sm text-blue-600 hover:underline">Forgot password</Link>
                                    </div>
                                </div>

                                <Button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{"Sign in an account"}</Button>

                            </form>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-gray-500">or</span>
                                </div>
                            </div>

                            <Button onClick={loginWithGoogle} className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition">
                                <img src="//www.gstatic.com/images/branding/searchlogo/ico/favicon.ico" alt="Google" className="w-5 h-5" />
                                <span className="font-medium text-gray-700">Sign in with Google</span>
                            </Button>

                            <p className="text-sm font-light text-gray-500">
                                Don't have an account yet? <Link to="/register" className="font-medium text-blue-600 hover:underline">Register here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login