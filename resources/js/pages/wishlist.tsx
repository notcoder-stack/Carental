import { Link, usePage, router } from '@inertiajs/react';
import Layout from '../layouts/Layout';

interface Car {
    id: number;
    name: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    rent_price: number;
    image: string;
    user_id: number;
}

interface WishlistProps {
    cars: Car[];
}

export default function Wishlist({ cars }: WishlistProps) {
    const { auth } = usePage<any>().props;
    const wishlistedCars = auth?.user?.wishlisted_cars || [];

    const toggleWishlist = (carId: number) => {
        router.post(`/wishlist/${carId}`, {}, {
            preserveScroll: true,
        });
    };

    return (
        <Layout>
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Ma liste d'envies</h1>
                    <p className="mt-1 text-sm text-gray-500">Retrouvez toutes les voitures que vous avez sauvegardées.</p>
                </div>
            </div>

            {cars.length === 0 ? (
                <div className="bg-white border border-gray-200 border-dashed rounded-2xl p-12 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune voiture sauvegardée</h3>
                    <p className="mt-1 text-sm text-gray-500">Explorez notre sélection et ajoutez des voitures à votre liste d'envies.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.map((car) => (
                        <div
                            key={car.id}
                            className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
                        >
                            {/* Car Image */}
                            <div className="relative h-56 overflow-hidden bg-gray-100">
                                <img
                                    src={car.image || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'}
                                    alt={`${car.brand} ${car.model}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm border border-gray-100">
                                    {car.year}
                                </div>
                                <button
                                    onClick={() => toggleWishlist(car.id)}
                                    className="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:scale-110 transition-transform duration-200 border border-gray-100 focus:outline-none"
                                >
                                    <svg className={`w-5 h-5 ${wishlistedCars.includes(car.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase text-blue-600 tracking-wider mb-1">{car.brand}</p>
                                        <h3 className="text-xl font-bold text-gray-900 leading-tight">{car.name}</h3>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="flex gap-4 mb-6">
                                    <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">
                                        <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                        </svg>
                                        {car.color}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">
                                        <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Auto
                                    </div>
                                </div>

                                {/* Bottom Action Row */}
                                <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 font-medium mb-0.5">Tarif journalier</span>
                                        <div>
                                            <span className="text-2xl font-bold text-gray-900">${car.rent_price}</span>
                                        </div>
                                    </div>
                                    <Link href={`/lessors/${car.user_id}`}>
                                        <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors duration-300 focus:ring-4 focus:ring-blue-100 outline-none shadow-md shadow-gray-200 hover:shadow-blue-500/25">
                                            Voir le loueur
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Layout>
    );
}
