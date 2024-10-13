import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
    // This state will hold the form data.
    const [form, setForm] = useState({
        username: "",
        password: "",
        admin:""
    });
    const [isNew, setIsNew] = useState(true);
    const params = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        // This function will fetch the record if the id is present in the URL.
        async function fetchData() {
            const id = params.id?.toString() || undefined;
            if(!id) return;
            setIsNew(false);
            const response = await fetch(
                `http://localhost:5050/api/user/${params.id.toString()}`
            );
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                console.error(message);
                return;
            }
            const record = await response.json();
            if (!record) {
                console.warn(`User with id ${id} not found`);
                navigate("/");
                return;
            }
            setForm(record);
        }
        fetchData();
        return;
    }, [params.id, navigate]);

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();
        const person = { ...form };
        try {
            let response;
            if (isNew) {
                // if we are adding a new record we will POST to /register.
                response = await fetch("http://localhost:5050/api/user/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(person),
                });
            } else {
                // if we are updating a record we will PATCH to /update/:id.
                response = await fetch(`http://localhost:5050/api/user/update/${params.id}`, {
                    method: "PATCH",
                    headers: {
                    "Content-Type": "application/json",
                    },
                body: JSON.stringify(person),
                });
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            } catch (error) {
                console.error('A problem occurred with your fetch operation: ', error);
            } finally {
                setForm({ username: "", password: "" , admin: "" });
                navigate("/login");
            }
    }

    // This following section will display the form that takes the input from the user.
    return (
        <>
        <h3 className="text-lg font-semibold p-4">Create/Update User Record</h3>
        <form
            onSubmit={onSubmit}
            className="border rounded-lg overflow-hidden p-4"
        >
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-slate-900">
                    User Info
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                    This information will be displayed publicly so be careful what you share.
                    </p>
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
                                value={form.username}
                                onChange={(e) => updateForm({ username: e.target.value })}
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
                                value={form.password}
                                onChange={(e) => updateForm({ password: e.target.value })}
                            />
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <fieldset className="mt-4">
                            <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                <div className="flex items-center">
                                    <input
                                        id="Admin"
                                        name="Admin"
                                        type="radio"
                                        value="Admin"
                                        className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                                        checked={form.admin === "Admin"}
                                        onChange={(e) => updateForm({ admin: e.target.value })}
                                    />
                                    <label
                                        htmlFor="Admin"
                                        className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                                    >
                                    Administrator
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                </div>
            </div>
                <input
                    type="submit"
                    value="Save User"
                    className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
                />
        </form>
        </>
    );
}