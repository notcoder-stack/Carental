import Layout from '../../layouts/Layout';

interface RentRequest {
    id: number;
    status: string;
    created_at: string;
    client: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    car: {
        name: string;
        brand: string;
        model: string;
    };
}

interface ClientsProps {
    rentRequests: RentRequest[];
}

export default function Clients({ rentRequests }: ClientsProps) {
    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Mes Clients</h1>
                <p className="mt-1 text-sm text-gray-500">Gérez les informations des clients ayant loué ou souhaitant louer vos véhicules.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {rentRequests.length === 0 ? (
                    <div className="p-12 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun client pour le moment</h3>
                        <p className="mt-1 text-sm text-gray-500">Dès qu'un client fera une demande de location, ses informations apparaîtront ici.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voiture demandée</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {rentRequests.map((request) => (
                                    <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                        {request.client.name.charAt(0)}
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{request.client.name}</div>
                                                    <div className="text-sm text-gray-500">{request.client.address || 'Adresse non renseignée'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{request.client.email}</div>
                                            <div className="text-sm text-gray-500">{request.client.phone || 'Aucun numéro'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 font-medium">{request.car.name}</div>
                                            <div className="text-sm text-gray-500">{request.car.brand} {request.car.model}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                request.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {request.status === 'pending' ? 'En attente' :
                                                 request.status === 'approved' ? 'Approuvée' : 'Rejetée'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(request.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Layout>
    );
}
