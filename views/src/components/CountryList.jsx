import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { showErrorToast, showSuccessToast } from '../utils/toatsUtils';

// GraphQL Queries and Mutations
const GET_COUNTRIES = gql`
  query {
    countries {
      id
      name
    }
  }
`;

const ADD_COUNTRY = gql`
  mutation AddCountry($name: String!) {
    addCountry(name: $name) {
      id
      name
    }
  }
`;

const UPDATE_COUNTRY = gql`
  mutation UpdateCountry($id: ID!, $name: String) {
    updateCountry(id: $id, name: $name) {
      id
      name
    }
  }
`;

const DELETE_COUNTRY = gql`
  mutation DeleteCountry($id: ID!) {
    deleteCountry(id: $id) {
      id
      name
    }
  }
`;

const CountryList = () => {
    const { data, loading, error, refetch } = useQuery(GET_COUNTRIES);
    const [addCountry] = useMutation(ADD_COUNTRY);
    const [updateCountry] = useMutation(UPDATE_COUNTRY);
    const [deleteCountry] = useMutation(DELETE_COUNTRY);

    const [newCountry, setNewCountry] = useState('');
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleAddCountry = async () => {
        if (!newCountry.trim()) return;
        await addCountry({ variables: { name: newCountry } });
        setNewCountry('');
        showSuccessToast("Country Added");
        refetch();
    };

    const openPopup = (id, name) => {
        setEditId(id);
        setEditName(name);
        setIsPopupOpen(true);
    };

    const handleUpdate = async () => {
        await updateCountry({ variables: { id: editId, name: editName } });
        setIsPopupOpen(false);
        setEditName('');
        setEditId(null);
        showSuccessToast("Country Updated");
        refetch();
    };

    const handleDelete = async (id) => {
        await deleteCountry({ variables: { id } });
        showSuccessToast("Country Deleted");
        refetch();
    };

    if (loading) return <p>Loading countries...</p>;
    if (error) return <p>Error loading countries.</p>;

    const countries = data?.countries || [];

    return (
        <div className="p-6 w-full">
            <h2 className="text-3xl font-bold text-zinc-800 mb-6">Country List</h2>

            {countries.length > 0 ? (
                <div className="overflow-x-auto bg-white rounded-xl shadow-md ring-1 ring-gray-200">
                    <table className="min-w-full table-auto text-sm">
                        <thead className="bg-zinc-200 text-gray-700">
                            <tr>
                                <th className="py-4 px-6 text-left font-semibold">ID</th>
                                <th className="py-4 px-6 text-left font-semibold">Country</th>
                                <th className="py-4 px-6 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {countries.map((country, i) => (
                                <tr
                                    key={country.id}
                                    className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-zinc-100 transition-colors`}
                                >
                                    <td className="py-4 px-6">{country.id}</td>
                                    <td className="py-4 px-6 font-medium text-zinc-800">{country.name}</td>
                                    <td className="py-4 px-6 flex gap-2">
                                        <button
                                            onClick={() => openPopup(country.id, country.name)}
                                            className="px-3 py-1 text-sm bg-yellow-400 rounded hover:bg-yellow-500"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(country.id)}
                                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-lg font-medium text-gray-500">No countries available.</div>
            )}

            <div className="mt-4 flex gap-2 items-center">
                <input
                    type="text"
                    placeholder="New country"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg w-72"
                />
                <button
                    onClick={handleAddCountry}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Add Country
                </button>
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-80">
                        <h3 className="text-lg font-semibold mb-4">Update Country</h3>
                        <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full border px-3 py-1 mb-4"
                            placeholder="Enter new country name"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CountryList;
