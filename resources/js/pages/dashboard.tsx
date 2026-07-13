import { usePage, useForm } from '@inertiajs/react';
import Layout from '../layouts/Layout';
import { useState, FormEvent } from 'react';

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

interface DashboardProps {
    cars?: Car[]; // we might pass this from the controller later
}

export default function Dashboard({ cars = [] }: DashboardProps) {
    const { auth } = usePage<any>().props;
    const user = auth.user;

    const [showAddForm, setShowAddForm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        color: '',
        rent_price: '',
        image: null as File | null,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/cars', {
            onSuccess: () => {
                setShowAddForm(false);
                reset();
            },
        });
    };

    return (
        <Layout>
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-500">Welcome back, {user.name}!</p>
                </div>
                {user.role === 'lessor' && !showAddForm && (
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-100 outline-none shadow-md shadow-blue-500/20"
                    >
                        + Add New Car
                    </button>
                )}
            </div>

            {user.role === 'lessor' ? (
                <>
                    {/* Add Car Form */}
                    {showAddForm && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animation-fade-in">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Add Car for Rent</h2>
                                <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>

                            <form onSubmit={submit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Listing Title (Name)</label>
                                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-gray-50 outline-none transition-all" required placeholder="e.g. Luxury SUV 2023" />
                                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                                        <input type="text" value={data.brand} onChange={e => setData('brand', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-gray-50 outline-none transition-all" required placeholder="e.g. Toyota" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                                        <input type="text" value={data.model} onChange={e => setData('model', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-gray-50 outline-none transition-all" required placeholder="e.g. Camry" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                        <input type="number" value={data.year} onChange={e => setData('year', parseInt(e.target.value))} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-gray-50 outline-none transition-all" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                        <input type="text" value={data.color} onChange={e => setData('color', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-gray-50 outline-none transition-all" required placeholder="e.g. Black" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Daily Rent Price ($)</label>
                                        <input type="number" step="0.01" value={data.rent_price} onChange={e => setData('rent_price', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-gray-50 outline-none transition-all" required placeholder="e.g. 50.00" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Car Image</label>
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={e => setData('image', e.target.files ? e.target.files[0] : null)} 
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-gray-50 outline-none transition-all" 
                                        />
                                        {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                    <button type="button" onClick={() => setShowAddForm(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
                                    <button type="submit" disabled={processing} className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors focus:ring-4 focus:ring-blue-100 outline-none shadow-md shadow-gray-200 disabled:opacity-70">
                                        {processing ? 'Saving...' : 'Save Car Listing'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Fleet List */}
                    <h2 className="text-xl font-bold text-gray-900 mb-4">My Fleet</h2>
                    {cars.length === 0 ? (
                        <div className="bg-white border border-gray-200 border-dashed rounded-2xl p-12 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No cars listed</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by listing your first car for rent.</p>
                            <div className="mt-6">
                                <button onClick={() => setShowAddForm(true)} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    + Add New Car
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <ul className="divide-y divide-gray-100">
                                {cars.map(car => (
                                    <li key={car.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row gap-6 items-center">
                                        <img src={car.image || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=200'} alt={car.name} className="w-full sm:w-32 h-24 object-cover rounded-xl bg-gray-100" />
                                        <div className="flex-1 w-full">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-xs font-semibold uppercase text-blue-600 tracking-wider mb-1">{car.brand}</p>
                                                    <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>
                                                    <p className="text-sm text-gray-500">{car.year} • {car.color} • {car.model}</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-xl font-bold text-gray-900">${car.rent_price}</span>
                                                    <span className="text-sm text-gray-500">/day</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            ) : (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">My Rentals</h2>
                    <p className="text-gray-500">You don't have any active rentals yet.</p>
                </div>
            )}
        </Layout>
    );
}
