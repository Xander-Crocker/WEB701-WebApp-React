import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state
        setSuccess(false); // Reset success state
        try {
            const response = await fetch('http://localhost:5050/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            // Handle the response data
            console.log(data);
            setSuccess(true);
            console.log('Login successful');
            // Redirect the user to the home page
            navigate("/");
            
        } catch (error) {
            // Handle any errors
            setError(error.message);
            console.error(error);
        }
        // Reset the form
        setUsername('');
        setPassword('');
    };

    return (
        <form onSubmit={handleSubmit}>

                <div>
                    <h2 className="text-base font-semibold leading-7 text-slate-900">
                    Login
                    </h2>
                </div>

                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
                    <div className="sm:col-span-4">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-slate-900"
                        >
                            Username
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                            </div>
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-slate-900"
                        >
                            Password
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                name="password"
                                id="password"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            </div>
                        </div>
                    </div>
                </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Login successful!</p>}
            <input
                type="submit"
                value="Login"
                className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
            />
        </form>
    );
};

export default LoginForm;