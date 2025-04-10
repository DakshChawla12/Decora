import axios from 'axios';

// Get all employees (admin only)
export const getAllEmployees = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(
        `http://localhost:5001/api/employee`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data;
};

// Get employee by ID (admin only)
export const getEmployeeById = async (id) => {
    const token = localStorage.getItem('token');
    const res = await axios.get(
        `http://localhost:5001/api/employee/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data;
};

// Create a new employee (admin only)
export const createEmployee = async (data) => {
    const token = localStorage.getItem('token');
    const res = await axios.post(
        `http://localhost:5001/api/employee`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data;
};

// Update an employee by ID (admin only)
export const updateEmployee = async (id, data) => {
    const token = localStorage.getItem('token');
    const res = await axios.patch(
        `http://localhost:5001/api/employee/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data;
};

// Delete an employee by ID (admin only)
export const deleteEmployee = async (id) => {
    const token = localStorage.getItem('token');
    const res = await axios.delete(
        `http://localhost:5001/api/employee/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data;
};
