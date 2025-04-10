import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

const AddProduct = ({ onAdd }) => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        brandId: '',
        categoryId: '',
        images: []
    });

    const { categories, brands, getAllCategories, getAllBrands } = useContext(StoreContext);

    useEffect(() => {
        getAllCategories();
        getAllBrands();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'images') {
            setProductData(prev => ({ ...prev, images: files }));
        } else {
            setProductData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const key in productData) {
            if (key === 'images') {
                Array.from(productData.images).forEach(file =>
                    formData.append('images', file)
                );
            } else {
                formData.append(key, productData[key]);
            }
        }

        try {
            await onAdd(formData); // calls context method
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder="Product Name" required className="w-full border px-3 py-2 rounded" />
            <textarea name="description" value={productData.description} onChange={handleChange} placeholder="Product Description" required className="w-full border px-3 py-2 rounded" />
            <input type="number" name="price" value={productData.price} onChange={handleChange} placeholder="Price" required className="w-full border px-3 py-2 rounded" />
            <input type="number" name="stock" value={productData.stock} onChange={handleChange} placeholder="Stock" required className="w-full border px-3 py-2 rounded" />

            <select name="brandId" value={productData.brandId} onChange={handleChange} required className="w-full border px-3 py-2 rounded">
                <option value="">Select Brand</option>
                {brands.map(brand => (
                    <option key={brand.brandId} value={brand.brandId}>{brand.brandName}</option>
                ))}
            </select>

            <select name="categoryId" value={productData.categoryId} onChange={handleChange} required className="w-full border px-3 py-2 rounded">
                <option value="">Select Category</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>

            <input type="file" name="images" onChange={handleChange} multiple accept="image/*" className="w-full border px-3 py-2 rounded" />

            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Add Product
            </button>
        </form>
    );
};

export default AddProduct;
