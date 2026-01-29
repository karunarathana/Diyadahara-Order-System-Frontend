import { Button, Input, Space } from "antd"
import { useEffect, useState } from "react";
import OrderItemCard from '../components/OrderItem'
import axios from "axios";
import { showNotification } from "./Notification";
import notFound from '../../../assets/Logo/notfound.jpg'
import API_ENDPOINTS from "../../../constant/backend-endpoints";

interface customProps {
    propsPhone: string
}
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
    time: string
}

interface OrderItem {
    orderId: Order;
    orderItemId: number;
    potion: string;
    price: number;
    productId: Product;
    quantity: number;
    time: string;
    status:string;
}

export default function ManageOrder({ propsPhone }: customProps) {
    const [phoneNumber, setphoneNumber] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<OrderItem[]>([]);

    useEffect(() => {
        console.log("Hi" + propsPhone);
        if (propsPhone) {
            fetchData(propsPhone);
        }
    }, []);
    // Fetch data from backend
    const fetchData = async (customNumber: string) => {
        try {
            const response = await axios.get(
                API_ENDPOINTS.VIEWS_ORDER_SINGLE_CUSTOMER,
                {
                    params: {
                        CusPhoneNumber: customNumber ? customNumber : phoneNumber
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
            fetchData(phoneNumber);
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

    const handleCancelOrder = async (orderItemId: number) => {
        // Implement cancel order logic
        console.log('Cancel order:', orderItemId);
        try {
            const response = await axios.delete(
                API_ENDPOINTS.DELETE_ORDER,
                {
                    params: {
                        orderId: orderItemId,
                    },
                }
            );
            console.log("**********************************")
            console.log("API Call Started In Customer handleDelete");
            console.log("**********************************")
            console.log("API Response:", response);
            console.log("API Call Finished In Customer handleDelete");
            console.log("**********************************")

            if (response.data === "Order Delete Successfully") {
                if (propsPhone) {
                    fetchData(propsPhone);
                } else {
                    fetchData(phoneNumber ? phoneNumber : '');
                }
                showNotification(
                    "success",
                    "Success",
                    "Order delete successfully!"
                );
            }
        } catch (error: any) {
            console.error("API Error:", error);
            showNotification(
                "error",
                "Server Error",
                error.response?.data?.message || "Something went wrong!"
            );
        }
    };

    const handleSellOrder = async (orderItemId: number) => {
        // Implement sell order logic
        console.log('Sell order:', orderItemId);
         try {
            const response = await axios.post(
                API_ENDPOINTS.CHANGE_ORDER_STATUS,
                null,
                {
                    params: {
                        orderItemId: orderItemId,
                    },
                }
            );
            console.log("**********************************")
            console.log("API Call Started In Order Status Change");
            console.log("**********************************")
            console.log("API Response:", response);
            console.log("API Call Finished In Order Status Change");
            console.log("**********************************")

            if (response.data === "Update Successfully") {
                if (propsPhone) {
                    fetchData(propsPhone);
                } else {
                    fetchData(phoneNumber ? phoneNumber : '');
                }
                showNotification(
                    "success",
                    "Success",
                    "Update successfully!"
                );
            }
        } catch (error: any) {
            console.error("API Error:", error);
            showNotification(
                "error",
                "Server Error",
                error.response?.data?.message || "Something went wrong!"
            );
        }
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
