import { ReactNode, useState } from 'react';
import { Link, usePage } from '@inertiajs/react'

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const { auth } = usePage<any>().props;
    const user = auth?.user;
    const notifications = user?.unreadNotifications || [];
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white flex flex-col hidden md:flex">
                <div className="h-16 flex items-center px-6 border-b border-gray-800">
                    <div className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>
                        Carental
                    </div>
                </div>

                <div className="flex-1 py-6 px-4 overflow-y-auto">
                    <nav className="space-y-1">
                        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-gray-800 text-white rounded-xl transition-colors">
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            <span className="font-medium">Tableau de bord</span>
                        </Link>

                        {user && user.role === 'client' && (
                            <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 hover:bg-gray-800 text-gray-300 hover:text-white rounded-xl transition-colors text-left">
                                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span className="font-medium">Ma liste d'envies</span>
                            </Link>
                        )}

                        {user && user.role === 'lessor' && (
                            <Link href="/lessor/clients" className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 hover:bg-gray-800 text-gray-300 hover:text-white rounded-xl transition-colors text-left">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <span className="font-medium">Mes Clients</span>
                            </Link>
                        )}

                        {/* Notifications */}
                        {user && user.role === 'lessor' && (
                            <div className="relative">
                                <button
                                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                                    className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-gray-800/50 hover:bg-gray-800 text-gray-300 hover:text-white rounded-xl transition-colors text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                            </svg>
                                            {notifications.length > 0 && (
                                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                                </span>
                                            )}
                                        </div>
                                        <span className="font-medium">Notifications</span>
                                    </div>
                                    {notifications.length > 0 && (
                                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                            {notifications.length}
                                        </span>
                                    )}
                                </button>

                                {notificationsOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-full bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden z-50">
                                        <div className="p-2 max-h-64 overflow-y-auto">
                                            {notifications.length === 0 ? (
                                                <p className="text-sm text-gray-400 p-2 text-center">No new notifications</p>
                                            ) : (
                                                notifications.map((notification: any) => (
                                                    <div key={notification.id} className="p-3 hover:bg-gray-700 rounded-lg transition-colors mb-1">
                                                        <p className="text-sm text-gray-200">{notification.data.message}</p>
                                                        <Link
                                                            href={`/notifications/${notification.id}/read`}
                                                            method="post"
                                                            as="button"
                                                            className="text-xs text-blue-400 hover:text-blue-300 mt-2 font-medium"
                                                        >
                                                            Mark as read
                                                        </Link>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-800 relative">
                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute bottom-full left-4 right-4 mb-2 bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden z-50">
                            <div className="p-1">
                                <Link href="/settings" className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                                    Paramètres
                                </Link>
                                <form method="post" action="/logout">
                                    <button type="submit" className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-lg transition-colors">
                                        Déconnexion
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
                            <button type="submit" className="text-sm font-medium text-gray-600">Déconnexion</button>
                        </form>
                        {user && user.role === 'lessor' && (
                            <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                {notifications.length > 0 && (
                                    <span className="absolute top-1 right-1 flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                    </span>
                                )}
                            </button>
                        )}
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                            {user?.name?.charAt(0)}
                        </div>
                    </div>
                </header>

                {/* Mobile Notifications Dropdown */}
                {notificationsOpen && user && user.role === 'lessor' && (
                    <div className="md:hidden bg-white border-b border-gray-200 p-4">
                        <h3 className="font-bold text-gray-900 mb-2">Notifications</h3>
                        <div className="space-y-2">
                            {notifications.length === 0 ? (
                                <p className="text-sm text-gray-500">No new notifications</p>
                            ) : (
                                notifications.map((notification: any) => (
                                    <div key={notification.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <p className="text-sm text-gray-700">{notification.data.message}</p>
                                        <Link
                                            href={`/notifications/${notification.id}/read`}
                                            method="post"
                                            as="button"
                                            className="text-xs text-blue-600 hover:text-blue-800 mt-2 font-medium"
                                        >
                                            Mark as read
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
