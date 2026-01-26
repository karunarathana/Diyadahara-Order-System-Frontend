import { Button, Input, Space } from "antd"
import { useState } from "react";
import OrderItemCard from '../components/OrderItem'
import axios from "axios";
import { showNotification } from "./Notification";
import notFound from '../../../assets/Logo/notfound.jpg'
import API_ENDPOINTS from "../../../constant/backend-endpoints";

interface Customer {
    customerEmail: string;
    customerID: number;
    customerName: string;
    phoneNumber: string;
    registeredAt: string;
    status: string;
    updatedAt: string;
    verified: boolean;
}

interface Category {
    categoryId: number;
    hibernateLazyInitializer?: object;
    name: string;
}

interface Product {
    categoryId: Category;
    createdAt: string;
    discountPercentage: number;
    foodID: number;
    foodName: string;
    foodPrice: number;
    hibernateLazyInitializer?: object;
    potionId: null | number;
    size: string;
    status: string;
    updatedAt: string;
    updatedBy: string;
}

interface Order {
    createBy: string;
    createdAt: string;
    customerId: Customer;
    orderId: number;
    status: string;
    totalPrice: number;
}

interface OrderItem {
    orderId: Order;
    orderItemId: number;
    potion: string;
    price: number;
    productId: Product;
    quantity: number;
}

export default function ManageOrder() {
    const [phoneNumber, setphoneNumber] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<OrderItem[]>([]);

    // Fetch data from backend
    const fetchData = async () => {
        try {
            const response = await axios.get(
                API_ENDPOINTS.VIEWS_ORDER_SINGLE_CUSTOMER,
                {
                    params: {
                        CusPhoneNumber: phoneNumber
                    }
                }
            );

            const items = response.data.itemData || [];

            setData(items);
            setLoading(items.length > 0);

            console.log("Fetched items:", items);
            console.log("Items count:", items.length);

        } catch (error) {
            console.error('Failed to fetch customers:', error);
            console.log(loading);
            setLoading(false);
        }
    };


    const checkCustomer = async () => {
        if (phoneNumber) {
            fetchData();
        } else {
            showNotification(
                "error",
                "Check",
                "Input valid Phone Number"
            );
        }
    }
    const orderData = {
        itemData: data,
        msg: null,
        orderData: null,
        statusCode: null
    };

    const handleCancelOrder = (orderItemId: number) => {
        // Implement cancel order logic
        console.log('Cancel order:', orderItemId);
        alert(`Order ${orderItemId} cancelled!`);
    };

    const handleSellOrder = (orderItemId: number) => {
        // Implement sell order logic
        console.log('Sell order:', orderItemId);
        alert(`Order ${orderItemId} sold!`);
    };

    return (
        <div className="p-[10px]">
            <div>
                <h2 className="text-[2rem] font-semibold font-sans">Order Management</h2>
            </div>
            <div className="w-[100%] mt-1 md:w-[30%]">
                <Space.Compact style={{
                    width: '100%',
                }}>
                    <Input onChange={(e) => { setphoneNumber(e.target.value) }} placeholder='Check Phone Number' />
                    <Button onClick={() => { checkCustomer() }} type="primary">Submit</Button>
                </Space.Compact>
            </div>
            {data.length > 0 ? (
                <div className="mt-1 max-h-[65vh] overflow-y-auto">
                    <OrderItemCard
                        orderData={orderData}
                        onCancelOrder={handleCancelOrder}
                        onSellOrder={handleSellOrder}
                    />
                </div>
            ) : (
                <div className="mt-2 flex flex-col justify-center items-center">
                    <div className="h-[50vh]">
                        <img className="h-full" src={notFound} alt="" />
                    </div>
                    <p className="text-[1rem] md: mt-1 text-[2.5rem] font-sans font-semibold">No orders found</p>
                </div>
            )}
        </div>
    )
}
