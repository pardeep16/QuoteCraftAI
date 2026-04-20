import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../api/auth";
import { setToken } from "../lib/auth";

export const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [googleLoading, setGoogleLoading] = useState(false);

    async function onGoogleSuccess(credentialResponse: CredentialResponse): Promise<void> {
        setGoogleLoading(true);
        setError('');
        try{
            const res= await signInWithGoogle(credentialResponse.credential as string);
            console.log("Google Sign In Response:", res);
            setToken(res.accessToken);
            navigate('/app/generate');
        }
        catch(err){
            setError('Failed to sign in with Google');
        }
        finally{
            setGoogleLoading(false);
        }
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        navigate('/app/generate');
    }

    return (
        <>

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 dark:bg-purple-600/10 blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 dark:bg-blue-600/10 blur-[100px]" />
            </div>

            <section className="flex-1 flex flex-col justify-center py-24 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md fade-in-up">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                            Welcome back
                        </h1>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Generate and save original AI quotes in seconds.
                        </p>
                    </div>

                    <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl
                     py-8 px-4 shadow-2xl shadow-purple-500/10 sm:rounded-3xl sm:px-10 border
                      border-slate-200/50 dark:border-slate-800/50 transition-all
                     hover:shadow-purple-500/20 hover:border-purple-500/20">
                        <form className="space-y-5" onSubmit={onSubmit}>
                            <div className="mt-1">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                                >
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full appearance-none rounded-xl border
                     border-slate-300 dark:border-slate-700 bg-white/50
                      dark:bg-slate-950/50 px-4 py-3 text-slate-900 dark:text-white
                       placeholder-slate-400 focus:border-purple-500 focus:outline-none
                        focus:ring-2 focus:ring-purple-500/20 sm:text-sm transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>
                            {/* Password */}
                            <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                                    >
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        minLength={8}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full appearance-none rounded-xl border
                     border-slate-300 dark:border-slate-700 bg-white/50
                      dark:bg-slate-950/50 px-4 py-3 text-slate-90
                       dark:text-white placeholder-slate-400
                        focus:border-purple-500 focus:outline-none focus:ring-2
                         focus:ring-purple-500/20 sm:text-sm transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>

                            </div>
                            {error && (
                                <div className="rounded-xl bg-rose-50/80 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 p-3 text-sm text-rose-600 dark:text-rose-400 flex items-center gap-2 backdrop-blur-sm">
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}
                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative flex w-full justify-center rounded-xl border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 py-3 px-4 text-sm font-medium text-white shadow-md hover:from-purple-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                                    <span className="relative flex items-center gap-2">
                                        {loading ? (
                                            <>
                                                <span className="spinner border-white/40 border-t-white" /> Logging in…
                                            </>
                                        ) : (
                                            'Sign in'
                                        )}
                                    </span>
                                </button>
                            </div>

                        </form>

                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200 dark:border-slate-700/60" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white dark:bg-slate-900 px-3 text-slate-500 dark:text-slate-400">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            {/* Google Sign In Button */}
                            <div className="flex justify-center w-full mt-4">
                                <GoogleLogin
                                    onSuccess={onGoogleSuccess}
                                    onError={() => setError('Google Login Failed')}
                                    useOneTap
                                    theme="outline"
                                    size="large"
                                    shape="rectangular"
                                    text="continue_with"
                                />
                            </div>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                        New to QuoteCraft?{' '}
                        <Link
                            to="/register"
                            className="font-semibold leading-6 text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>
            </section>
        </>
    )
}