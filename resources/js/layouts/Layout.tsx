import { ReactNode, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const { auth } = usePage<any>().props;
    const user = auth.user;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white flex flex-col hidden md:flex">
                <div className="h-16 flex items-center px-6 border-b border-gray-800">
                    <Link href="/" className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>
                        Carental
                    </Link>
                </div>

                <div className="flex-1 py-6 px-4 overflow-y-auto">
                    <nav className="space-y-1">
                        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-gray-800 text-white rounded-xl transition-colors">
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            <span className="font-medium">Dashboard</span>
                        </Link>
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-800 relative">
                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute bottom-full left-4 right-4 mb-2 bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden z-50">
                            <div className="p-1">
                                <Link href="/settings" className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                                    Settings
                                </Link>
                                <form method="post" action="/logout">
                                    <button type="submit" className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-lg transition-colors">
                                        Log out
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                    
                    <button 
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors text-left"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                {user?.name?.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                                <p className="text-xs text-gray-400 truncate capitalize">{user?.role}</p>
                            </div>
                        </div>
                        <svg className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:hidden">
                    <Link href="/" className="text-lg font-bold">Carental</Link>
                    <div className="flex items-center gap-3">
                        <form method="post" action="/logout">
                            <button type="submit" className="text-sm font-medium text-gray-600">Logout</button>
                        </form>
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                            {user?.name?.charAt(0)}
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
