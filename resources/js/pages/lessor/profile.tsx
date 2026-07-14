import { Link, usePage } from '@inertiajs/react';
import Navbar from '../../components/Navbar';

interface Car {
    id: number;
    name: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    rent_price: number;
    image: string;
}

interface Lessor {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    cars: Car[];
}

interface ProfileProps {
    lessor: Lessor;
}

export default function Profile({ lessor }: ProfileProps) {
    const { auth } = usePage<any>().props;

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            <div className="pt-28 pb-16 px-4 max-w-screen-xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-600 shrink-0">
                        {lessor.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{lessor.name}</h1>
                        <p className="text-gray-500 mt-2">Loueur de confiance</p>
                        
                        <div className="mt-6 flex flex-wrap gap-4 md:gap-8">
                            {lessor.email && (
                                <div className="flex items-center gap-2 text-gray-700">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    <span>{lessor.email}</span>
                                </div>
                            )}
                            {lessor.phone && (
                                <div className="flex items-center gap-2 text-gray-700">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    <span>{lessor.phone}</span>
                                </div>
                            )}
                            {lessor.address && (
                                <div className="flex items-center gap-2 text-gray-700">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    <span>{lessor.address}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Véhicules de {lessor.name}</h2>
                </div>

                {lessor.cars.length === 0 ? (
                    <div className="bg-white border border-gray-200 border-dashed rounded-2xl p-12 text-center">
                        <p className="text-gray-500">Ce loueur n'a pas encore de véhicules disponibles.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {lessor.cars.map((car) => (
                            <div
                                key={car.id}
                                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                            >
                                <div className="relative h-56 overflow-hidden bg-gray-100">
                                    <img
                                        src={car.image || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'}
                                        alt={`${car.brand} ${car.model}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm border border-gray-100">
                                        {car.year}
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-xs font-semibold uppercase text-blue-600 tracking-wider mb-1">{car.brand}</p>
                                    <h3 className="text-xl font-bold text-gray-900 leading-tight mb-4">{car.name}</h3>

                                    <div className="flex gap-4 mb-6">
                                        <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">
                                            <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                                            {car.color}
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-500 font-medium mb-0.5">Tarif</span>
                                            <div>
                                                <span className="text-2xl font-bold text-gray-900">${car.rent_price}</span>
                                            </div>
                                        </div>
                                        {auth?.user ? (
                                            <Link href={`/cars/${car.id}/rent`} method="post" as="button">
                                                <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors duration-300 focus:ring-4 focus:ring-blue-100 outline-none shadow-md shadow-blue-500/25">
                                                    Louer
                                                </button>
                                            </Link>
                                        ) : (
                                            <Link href="/login">
                                                <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors duration-300 focus:ring-4 focus:ring-blue-100 outline-none shadow-md shadow-blue-500/25">
                                                    Louer
                                                </button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
