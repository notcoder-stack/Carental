import { Link } from '@inertiajs/react';

const Navbar = () => {
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

                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-3">
                    <Link
                        href="/login"
                        className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium rounded-xl text-sm px-4 py-2.5 transition-all duration-200"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/register"
                        className="text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center transition-all duration-200 shadow-md shadow-gray-900/10 transform hover:-translate-y-0.5"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;