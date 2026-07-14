import { useForm, Link } from '@inertiajs/react';
import Navbar from '../../components/Navbar';
import { FormEvent } from 'react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />
            
            <div className="pt-32 pb-16 px-4 flex justify-center items-center">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Bon retour</h2>
                    
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse e-mail</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={`w-full px-4 py-2.5 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-gray-50`}
                                required
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                            </div>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={`w-full px-4 py-2.5 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none bg-gray-50`}
                                required
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-700">
                                Se souvenir de moi
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all disabled:opacity-70 mt-4 shadow-md shadow-blue-500/30"
                        >
                            {processing ? 'Connexion en cours...' : 'Se connecter'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Vous n'avez pas de compte ?{' '}
                        <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                            S'inscrire ici
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
