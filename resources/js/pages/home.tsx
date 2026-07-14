import { Link, usePage } from "@inertiajs/react";
import Navbar from "../components/Navbar";

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

interface WelcomeProps {
    cars: Car[];
}

export default function Welcome({ cars }: WelcomeProps) {
    const { auth } = usePage<any>().props;

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            {/* Hero Section */}
            <main className="pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pb-32 px-4 mx-auto max-w-screen-xl text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    Find your <span className="text-blue-600">perfect drive</span>
                </h1>
                <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-500 sm:mt-6 sm:text-xl lg:mt-8">
                    Explore our premium selection of vehicles. Whether it's for a weekend getaway or a long business trip, we have the right car for you.
                </p>
            </main>
            {/* Grid Section */}
            <section className="px-4 mx-auto max-w-screen-xl pb-24">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Available Vehicles</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                            </div>

                            {/* Card Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="text-sm font-semibold tracking-wider uppercase text-blue-600 mb-1">{car.brand}</p>
                                        <h3 className="text-xl font-bold text-gray-900 leading-tight">{car.name}</h3>
                                        <p className="text-sm text-gray-500 mt-0.5">{car.model}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-4 mb-6">
                                    <div className="flex items-center">
                                        <div
                                            className="w-3.5 h-3.5 rounded-full mr-2 border border-gray-200 shadow-inner"
                                            style={{ backgroundColor: car.color.toLowerCase(), background: car.color.toLowerCase() === 'white' ? '#f3f4f6' : car.color.toLowerCase() }}
                                            title={car.color}
                                        ></div>
                                        <span className="capitalize">{car.color}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Auto
                                    </div>
                                </div>

                                {/* Bottom Action Row */}
                                <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 font-medium mb-0.5">Daily rate</span>
                                        <div>
                                            <span className="text-2xl font-bold text-gray-900">${car.rent_price}</span>
                                        </div>
                                    </div>
                                    {auth.user ? (
                                        <Link href={`/cars/${car.id}/rent`} method="post" as="button">
                                            <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors duration-300 focus:ring-4 focus:ring-blue-100 outline-none shadow-md shadow-gray-200 hover:shadow-blue-500/25">
                                                Rent Now
                                            </button>
                                        </Link>
                                    ) : (
                                        <Link href="/login">
                                            <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors duration-300 focus:ring-4 focus:ring-blue-100 outline-none shadow-md shadow-gray-200 hover:shadow-blue-500/25">
                                                Rent Now
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
