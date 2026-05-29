"use client";

import { useReducer } from "react";
import { useRouter } from "next/navigation";

type State = {
    email: string;
    password: string;
    error: string | null;
    loading: boolean;
};

type Action =
    | { type: "SET_FIELD"; field: "email" | "password"; value: string }
    | { type: "SUBMIT" }
    | { type: "SUCCESS" }
    | { type: "ERROR"; message: string };

const initialState: State = { email: "", password: "", error: null, loading: false };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "SUBMIT":
            return { ...state, error: null, loading: true };
        case "SUCCESS":
            return { ...state, loading: false };
        case "ERROR":
            return { ...state, loading: false, error: action.message };
    }
}

export default function AdminLogin() {
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        dispatch({ type: "SUBMIT" });
        try {
            const res = await fetch("http://localhost:5266/Api/Auth/Login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email: state.email, password: state.password }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                dispatch({ type: "ERROR", message: data?.message ?? "Invalid credentials." });
                return;
            }
            console.log(res);
            dispatch({ type: "SUCCESS" });
            router.push("/admindashboard");
        } catch (e) {
            console.error("Login error:", e);
            dispatch({ type: "ERROR", message: "Could not reach the server. Please try again." });
        }
    }

    return (
        <main className="flex-1 flex flex-col items-center justify-center bg-white">
            <div className="w-full max-w-md mx-auto p-8">
                <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
                <p className="text-gray-700 mb-8">Please enter your credentials to access the admin dashboard.</p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email" id="email" name="email" required
                            value={state.email}
                            onChange={(e) => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password" id="password" name="password" required
                            value={state.password}
                            onChange={(e) => dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    {state.error && <p className="text-sm text-red-600">{state.error}</p>}
                    <div>
                        <button
                            type="submit"
                            disabled={state.loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {state.loading ? "Signing in..." : "Sign In"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}