import React from "react";
import {
    FaBoxOpen,
    FaClipboardList,
    FaUserTie,
    FaUsers,
    FaTags,
    FaThLarge,
    FaBuilding,
    FaChartBar,
    FaGlobeAmericas,
    FaPercent,
} from "react-icons/fa";

const SidebarItem = ({ icon, label, onClick }) => (
    <div
        className="flex items-center gap-3 hover:bg-zinc-800 px-3 py-2 rounded-md cursor-pointer transition-all"
        onClick={onClick}
    >
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
    </div>
);

const AdminSidebar = ({ onSelectSection }) => {
    return (
        <div className="h-full w-64 bg-zinc-900 text-white p-6 space-y-6 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

            <nav className="flex flex-col space-y-4">
                <SidebarItem
                    icon={<FaChartBar />}
                    label="Dashboard"
                    onClick={() => onSelectSection("Dashboard")}
                />
                <SidebarItem
                    icon={<FaBoxOpen />}
                    label="Product Listing"
                    onClick={() => onSelectSection("ProductList")}
                />
                <SidebarItem
                    icon={<FaClipboardList />}
                    label="Order List"
                    onClick={() => onSelectSection("OrderList")}
                />
                <SidebarItem
                    icon={<FaUserTie />}
                    label="Designation"
                    onClick={() => onSelectSection("Designation")}
                />
                <SidebarItem
                    icon={<FaBuilding />}
                    label="Department"
                    onClick={() => onSelectSection("Department")}
                />
                <SidebarItem
                    icon={<FaUsers />}
                    label="Employee"
                    onClick={() => onSelectSection("Employee")}
                />
                <SidebarItem
                    icon={<FaTags />}
                    label="Brand"
                    onClick={() => onSelectSection("Brand")}
                />
                <SidebarItem
                    icon={<FaThLarge />}
                    label="Category"
                    onClick={() => onSelectSection("Category")}
                />
                <SidebarItem
                    icon={<FaGlobeAmericas />}
                    label="Country"
                    onClick={() => onSelectSection("Country")}
                />
                <SidebarItem
                    icon={<FaPercent />}
                    label="Discount Codes"
                    onClick={() => onSelectSection("Discount")}
                />
            </nav>
        </div>
    );
};

export default AdminSidebar;
