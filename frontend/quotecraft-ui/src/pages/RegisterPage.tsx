import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export const RegisterPage = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    }

    return (
        <>
            <section className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 pt-5 md:px-12 lg:px-20">
                <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/55">
                    <p className="eyebrow">Get started</p>
                    <h1 className="mt-1 text-3xl font-semibold">Create your account</h1>
                    <p className="subtle mt-2">Start generating and organizing your quote library for free.</p>
                    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                        <div className="form-group">
                            <label htmlFor="reg-email">Email address</label>
                            <input
                                id="reg-email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="reg-password">Password (min 8 chars)</label>
                            <input
                                id="reg-password"
                                type="password"
                                placeholder="Create a strong password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={8}
                                autoComplete="new-password"
                            />
                        </div>
                        {error && (
                            <p className="error">
                                <span>⚠</span> {error}
                            </p>
                        )}

                        <button type="submit" disabled={loading} className="button primary w-full py-2.5">
                            {loading ? (
                                <>
                                    <span className="spinner" /> Creating account…
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>
                    <p className="subtle mt-5 text-center text-[0.88rem]">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold">
                            Login
                        </Link>
                    </p>
                </div>
            </section>
        </>
    )
}