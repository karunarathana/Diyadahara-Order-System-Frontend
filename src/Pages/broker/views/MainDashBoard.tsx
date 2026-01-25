import { useState, useEffect } from "react";
import CircularProgressWithLabel from '../components/PrograssBar';
import {
    ShoppingCart,
    Users,
    DollarSign,
    TrendingUp,
    Package,
    Clock,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import axios from "axios";

function MainDashBoard() {
    const [loadBar, setLoadBar] = useState(true);
    const [stats, setStats] = useState({
        totalOrders: 156,
        completedOrders: 128,
        pendingOrders: 28,
        totalRevenue: 245800,
        activeCustomers: 42,
        todayOrders: 18
    });

    // Fetch data from backend
    const fetchData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8080/api/com-diyadahara/get-dashboard-details'
            );
            const statsObj = {
                totalOrders: response.data.allProduct,
                completedOrders: response.data.completedOrders,
                pendingOrders: response.data.pendingOrders,
                totalRevenue: response.data.totalRevenue,
                activeCustomers: response.data.activeCustomers,
                todayOrders: response.data.todayOrders,
            }
            setStats(statsObj);
        } catch (error) {
            console.error('Failed to fetch customers:', error);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadBar(false);
        }, 4000);
        fetchData();
        return () => clearTimeout(timer);
    }, []);

    const d = new Date();
    let hour = d.getHours();
    const greeting = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";

    const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${color} bg-opacity-10 bg-blue-600`}>
                    <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <span className="text-sm font-medium text-gray-500">{title}</span>
            </div>
            <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold text-blue-600">{value}</h3>
                {trend && (
                    <span className={`text-sm font-medium ${trend.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {/* {trend} */}
                    </span>
                )}
            </div>
        </div>
    );

    const OrderStatusCard = ({ status, count, color, icon: Icon }: any) => (
        <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className={`p-3 rounded-lg ${color} bg-opacity-10 mr-4 rounded-full bg-blue-600`}>
                <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <div>
                <p className="text-sm text-gray-500">{status}</p>
                <p className="text-xl font-bold text-gray-800">{count}</p>
            </div>
        </div>
    );

    return (
        <div>
            <div className={loadBar ? 'flex h-[80vh] items-center justify-center' : "hidden"}>
                <CircularProgressWithLabel />
            </div>

            <div className={loadBar ? 'hidden' : 'p-6 max-h-[78vh] overflow-y-auto'}>
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between bg-white rounded-2xl p-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Good {greeting}, Diyadahara Resort 👋
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Here's what's happening with your orders today.
                            </p>
                        </div>
                        <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
                            <Clock className="h-5 w-5" />
                            <span className="font-medium">
                                {d.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Product"
                        value={stats.totalOrders}
                        icon={ShoppingCart}
                        color="text-blue-600"
                        trend="+12%"
                    />
                    <StatCard
                        title="Today's Revenue"
                        value={`Rs. ${stats.totalRevenue.toLocaleString()}`}
                        icon={DollarSign}
                        color="text-green-600"
                        trend="+8%"
                    />
                    <StatCard
                        title="Active Customers"
                        value={stats.activeCustomers}
                        icon={Users}
                        color="text-purple-600"
                        trend="+5%"
                    />
                    <StatCard
                        title="Today's Orders"
                        value={stats.todayOrders}
                        icon={TrendingUp}
                        color="text-orange-600"
                    />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Left Column - Main Indicators */}
                    <div className="lg:col-span-2">
                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                            <div className="space-y-4">
                                {[
                                    { time: "10:30 AM", action: "New order #1025 received", status: "success" },
                                    { time: "09:45 AM", action: "Order #1024 completed", status: "success" },
                                    { time: "09:15 AM", action: "Payment received for order #1023", status: "success" },
                                    { time: "08:30 AM", action: "New customer registration", status: "info" },
                                ].map((activity, index) => (
                                    <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className={`p-2 rounded-full mr-4 ${activity.status === 'success' ? 'bg-green-100' : 'bg-blue-100'
                                            }`}>
                                            {activity.status === 'success' ?
                                                <CheckCircle className="h-5 w-5 text-green-600" /> :
                                                <AlertCircle className="h-5 w-5 text-blue-600" />
                                            }
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">{activity.action}</p>
                                            <p className="text-sm text-gray-500">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Status */}
                    <div className="space-y-6">
                        {/* Order Status */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Status</h2>
                            <div className="space-y-4">
                                <OrderStatusCard
                                    status="Completed"
                                    count={stats.completedOrders}
                                    color="text-green-600"
                                    icon={CheckCircle}
                                />
                                <OrderStatusCard
                                    status="Pending"
                                    count={stats.pendingOrders}
                                    color="text-yellow-600"
                                    icon={Clock}
                                />
                                <OrderStatusCard
                                    status="In Progress"
                                    count={12}
                                    color="text-blue-600"
                                    icon={Package}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                        <button className="text-blue-600 hover:text-blue-700 font-medium">
                            View All
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: "New Order", icon: ShoppingCart, color: "bg-blue-100 text-blue-600" },
                            { label: "Manage Orders", icon: Package, color: "bg-green-100 text-green-600" },
                            { label: "Add Customer", icon: Users, color: "bg-purple-100 text-purple-600" },
                            { label: "View Reports", icon: TrendingUp, color: "bg-orange-100 text-orange-600" },
                        ].map((action, index) => (
                            <button
                                key={index}
                                className="flex flex-col items-center justify-center p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all hover:scale-[1.02]"
                            >
                                <div className={`p-3 rounded-full ${action.color} mb-3`}>
                                    <action.icon className="h-6 w-6" />
                                </div>
                                <span className="font-medium text-gray-800">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainDashBoard;