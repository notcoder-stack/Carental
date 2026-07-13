import { useForm, usePage } from '@inertiajs/react';
import Layout from '../../layouts/Layout';
import { FormEvent } from 'react';

export default function Profile() {
    const { auth } = usePage<any>().props;
    const user = auth.user;

    const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        address: user.address || '',
        phone: user.phone || '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        patch('/settings/profile');
    };

    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profile Settings</h1>
                <p className="mt-1 text-sm text-gray-500">Update your account's profile information and email address.</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl">
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-gray-50 outline-none transition-all"
                            required
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={data.email}
                            disabled

                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-gray-50 outline-none transition-all"
                            required
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                            type="text"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-gray-50 outline-none transition-all"
                            required
                        />
                        {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-gray-50 outline-none transition-all"
                            required
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors focus:ring-4 focus:ring-blue-100 outline-none shadow-md shadow-gray-200 disabled:opacity-70"
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>

                        {recentlySuccessful && (
                            <p className="text-sm font-medium text-green-600 transition-opacity">
                                Saved successfully.
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </Layout>
    );
}
