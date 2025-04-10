import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import ProductList from "../components/ProductList";
import OrderList from "../components/OrderList";
import DesignationList from "../components/DesignationList";
import EmployeeList from "../components/EmployeeList";
import BrandList from "../components/BrandList";
import CategoryList from "../components/CategoryList";
import DepartmentList from "../components/DepartmentList";
import SalesDashboard from "../components/SalesDashboard";
import CountryList from "../components/CountryList";
import DiscountList from "../components/DiscountList";

const AdminPage = () => {
    const [selectedSection, setSelectedSection] = useState("Dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const renderSection = () => {
        switch (selectedSection) {
            case "Dashboard":
                return <SalesDashboard />;
            case "ProductList":
                return <ProductList />;
            case "OrderList":
                return <OrderList />;
            case "Designation":
                return <DesignationList />;
            case "Department":
                return <DepartmentList />;
            case "Employee":
                return <EmployeeList />;
            case "Brand":
                return <BrandList />;
            case "Category":
                return <CategoryList />;
            case "Country":
                return <CountryList />
            case "Discount":
                return <DiscountList />
            default:
                return <div className="p-6">Select a section</div>;
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col">
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex flex-1 relative">
                <div className="hidden md:block">
                    <AdminSidebar onSelectSection={setSelectedSection} />
                </div>

                {sidebarOpen && (
                    <div className="fixed inset-0 z-50 md:hidden">
                        <div
                            className="absolute inset-0 bg-black opacity-50"
                            onClick={() => setSidebarOpen(false)}
                        ></div>
                        <div className="relative z-50 w-64">
                            <AdminSidebar
                                onSelectSection={(section) => {
                                    setSelectedSection(section);
                                    setSidebarOpen(false); // Close after selection
                                }}
                            />
                        </div>
                    </div>
                )}

                <main className="flex-1 bg-gray-50 overflow-auto">{renderSection()}</main>
            </div>
        </div>
    );
};

export default AdminPage;
