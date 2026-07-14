import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const Navbar = () => {
    const { auth } = usePage<any>().props;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-100 bg-white/70 backdrop-blur-lg">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
                    <div className="bg-blue-600 p-2 rounded-xl text-white transform group-hover:scale-105 transition-transform duration-300 shadow-md shadow-blue-500/20">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                    </div>
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-gray-900 tracking-tight">
                        Carental
                    </span>
                </Link>

                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-3 relative items-center">
                    {auth?.user ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-200"
                            >
                                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="hidden sm:inline font-semibold">{auth.user.name}</span>
                                <svg className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
                                    {auth.user.role === 'lessor' && (
                                        <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                                            Tableau de bord
                                        </Link>
                                    )}
                                    <Link href="/logout" method="post" as="button" className="block w-full text-start px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium">
                                        Déconnexion
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium rounded-xl text-sm px-4 py-2.5 transition-all duration-200"
                            >
                                Connexion
                            </Link>
                            <Link
                                href="/register"
                                className="text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center transition-all duration-200 shadow-md shadow-gray-900/10 transform hover:-translate-y-0.5"
                            >
                                S'inscrire
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;