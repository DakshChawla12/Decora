import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const monthlySales = [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 550 },
    { month: "Mar", sales: 700 },
    { month: "Apr", sales: 600 },
    { month: "May", sales: 750 },
    { month: "Jun", sales: 820 },
];

const categorySales = [
    { name: "Furniture", value: 400 },
    { name: "Lighting", value: 300 },
    { name: "Decor", value: 300 },
    { name: "Textiles", value: 200 },
];

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];

const SalesDashboard = () => {
    return (
        <div className="p-6 w-full space-y-10 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-zinc-800">📊 Sales Dashboard</h2>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                <h3 className="text-xl font-semibold mb-6 text-zinc-700">Monthly Sales Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlySales}>
                        <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#6366F1"
                            strokeWidth={3}
                            fill="url(#colorSales)"
                            dot={{ r: 6 }}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                <h3 className="text-xl font-semibold mb-6 text-zinc-700">Sales by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={categorySales}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            labelLine={false}
                            label={({ name, percent }) =>
                                `${name} (${(percent * 100).toFixed(0)}%)`
                            }
                        >
                            {categorySales.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesDashboard;