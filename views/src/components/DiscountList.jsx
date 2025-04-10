import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { showErrorToast, showSuccessToast } from '../utils/toatsUtils';

// GraphQL Queries and Mutations
const GET_DISCOUNTS = gql`
query {
    discounts {
        id
        code
        percentage
    }
}
`;

const ADD_DISCOUNT = gql`
mutation AddDiscount($code: String!, $percentage: Float!) {
    addDiscount(code: $code, percentage: $percentage) {
        id
        code
        percentage
    }
}
`;

const UPDATE_DISCOUNT = gql`
mutation UpdateDiscount($id: ID!, $code: String, $percentage: Float) {
    updateDiscount(id: $id, code: $code, percentage: $percentage) {
        id
        code
        percentage
    }
}
`;

const DELETE_DISCOUNT = gql`
mutation DeleteDiscount($id: ID!) {
    deleteDiscount(id: $id) {
        id
        code
        percentage
    }
}
`;

const DiscountList = () => {
    const { data, loading, error, refetch } = useQuery(GET_DISCOUNTS);
    const [addDiscount] = useMutation(ADD_DISCOUNT);
    const [updateDiscount] = useMutation(UPDATE_DISCOUNT);
    const [deleteDiscount] = useMutation(DELETE_DISCOUNT);

    const [newCode, setNewCode] = useState('');
    const [newPercentage, setNewPercentage] = useState('');
    const [editId, setEditId] = useState(null);
    const [editCode, setEditCode] = useState('');
    const [editPercentage, setEditPercentage] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleAddDiscount = async () => {
        if (!newCode.trim() || !newPercentage) return;
        await addDiscount({
            variables: { code: newCode, percentage: parseFloat(newPercentage) },
        });
        setNewCode('');
        setNewPercentage('');
        showSuccessToast("Discount Added");
        refetch();
    };

    const openPopup = (id, code, percentage) => {
        setEditId(id);
        setEditCode(code);
        setEditPercentage(percentage.toString());
        setIsPopupOpen(true);
    };

    const handleUpdate = async () => {
        await updateDiscount({
            variables: {
                id: editId,
                code: editCode,
                percentage: parseFloat(editPercentage),
            },
        });
        setIsPopupOpen(false);
        setEditCode('');
        setEditPercentage('');
        setEditId(null);
        showSuccessToast("Discount Updated");
        refetch();
    };

    const handleDelete = async (id) => {
        await deleteDiscount({ variables: { id } });
        showSuccessToast("Discount Deleted");
        refetch();
    };

    if (loading) return <p>Loading discounts...</p>;
    if (error) return <p>Error loading discounts.</p>;

    const discounts = data?.discounts || [];

    return (
        <div className="p-6 w-full">
            <h2 className="text-3xl font-bold text-zinc-800 mb-6">Discount List</h2>

            {discounts.length > 0 ? (
                <div className="overflow-x-auto bg-white rounded-xl shadow-md ring-1 ring-gray-200">
                    <table className="min-w-full table-auto text-sm">
                        <thead className="bg-zinc-200 text-gray-700">
                            <tr>
                                <th className="py-4 px-6 text-left font-semibold">ID</th>
                                <th className="py-4 px-6 text-left font-semibold">Code</th>
                                <th className="py-4 px-6 text-left font-semibold">Percentage</th>
                                <th className="py-4 px-6 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {discounts.map((discount, i) => (
                                <tr
                                    key={discount.id}
                                    className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-zinc-100 transition-colors`}
                                >
                                    <td className="py-4 px-6">{discount.id}</td>
                                    <td className="py-4 px-6 font-medium text-zinc-800">{discount.code}</td>
                                    <td className="py-4 px-6 font-medium text-zinc-800">{discount.percentage}%</td>
                                    <td className="py-4 px-6 flex gap-2">
                                        <button
                                            onClick={() => openPopup(discount.id, discount.code, discount.percentage)}
                                            className="px-3 py-1 text-sm bg-yellow-400 rounded hover:bg-yellow-500"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(discount.id)}
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
                <div className="text-lg font-medium text-gray-500">No discounts available.</div>
            )}

            <div className="mt-4 flex gap-2 items-center">
                <input
                    type="text"
                    placeholder="Discount code"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg w-72"
                />
                <input
                    type="number"
                    placeholder="Percentage"
                    value={newPercentage}
                    onChange={(e) => setNewPercentage(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg w-32"
                    step="0.1"
                    min="0"
                />
                <button
                    onClick={handleAddDiscount}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Add Discount
                </button>
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-80">
                        <h3 className="text-lg font-semibold mb-4">Update Discount</h3>
                        <input
                            type="text"
                            value={editCode}
                            onChange={(e) => setEditCode(e.target.value)}
                            className="w-full border px-3 py-1 mb-4"
                            placeholder="Enter discount code"
                        />
                        <input
                            type="number"
                            value={editPercentage}
                            onChange={(e) => setEditPercentage(e.target.value)}
                            className="w-full border px-3 py-1 mb-4"
                            placeholder="Enter percentage"
                            step="0.1"
                            min="0"
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

export default DiscountList;