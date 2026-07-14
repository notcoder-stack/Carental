import { usePage, useForm, router } from '@inertiajs/react';
import Layout from '../layouts/Layout';
import { FormEvent } from 'react';

export default function Settings() {
    const { auth } = usePage<any>().props;
    const user = auth.user;

    const { data, setData, post, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/settings', {
            preserveScroll: true,
        });
    };

    const deleteAccount = () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer définitivement votre compte ? Cette action est irréversible.')) {
            router.delete('/settings');
        }
    };

    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Paramètres du profil</h1>
                <p className="mt-1 text-sm text-gray-500">Mettez à jour vos informations personnelles.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-2xl">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className={`w-full px-4 py-2.5 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-gray-50 outline-none transition-all`}
                                required
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse e-mail</label>
                            <input
                                type="email"
                                value={data.email}
                                disabled
                                onChange={e => setData('email', e.target.value)}
                                className={`w-full px-4 py-2.5 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-gray-50 outline-none transition-all`}
                                required
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
                            <input
                                type="tel"
                                value={data.phone}
                                onChange={e => setData('phone', e.target.value)}
                                className={`w-full px-4 py-2.5 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-gray-50 outline-none transition-all`}
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                            <input
                                type="text"
                                value={data.address}
                                onChange={e => setData('address', e.target.value)}
                                className={`w-full px-4 py-2.5 rounded-xl border ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-gray-50 outline-none transition-all`}
                            />
                            {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-100 outline-none shadow-md shadow-blue-500/20 disabled:opacity-70"
                        >
                            {processing ? 'Enregistrement...' : 'Enregistrer les modifications'}
                        </button>
                    </div>
                </form>
            </div>

            {user.role === 'lessor' && (
                <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-red-100 max-w-2xl">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Zone de danger</h2>
                    <p className="text-sm text-gray-500 mb-4">
                        Une fois votre compte supprimé, toutes ses ressources et données seront effacées de manière permanente.
                        Veuillez vous assurer de télécharger toute donnée que vous souhaitez conserver avant de supprimer votre compte.
                    </p>
                    <button
                        onClick={deleteAccount}
                        className="bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors focus:ring-4 focus:ring-red-100 outline-none shadow-md shadow-red-500/20"
                    >
                        Supprimer le compte
                    </button>
                </div>
            )}
        </Layout>
    );
}
