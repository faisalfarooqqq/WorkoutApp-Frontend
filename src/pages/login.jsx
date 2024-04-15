import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import Header from "../components/header";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    }
    return (
        <div>
            <Header/>
                <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">Log in</h2>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input id="email" name="email" type="email" autoComplete="email" required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                                    border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none 
                                    focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input id="password" name="password" type="password" autoComplete="current-password" required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                                    border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none 
                                    focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <button type="submit" disabled={isLoading} className="group relative w-full flex justify-center py-2 px-4 border 
                            border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    {/* Heroicon name: solid/check */}
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        aria-hidden="true">
                                        <path fillRule="evenodd"
                                            d="M3.293 7.293a1 1 0 011.414 0L9 11.586l6.293-6.293a1 1 0 111.414 
                                            1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Log in
                            </button>
                        </div>
                    </form>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">Don't have an account?
                            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                {" "}Sign up here
                            </Link>
                        </p>
                    </div>
                    {/* Error Message */}
                    {error && (
                        <div className="text-center text-red-500 mt-2">
                            {error.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
       
    )
}

export default Login