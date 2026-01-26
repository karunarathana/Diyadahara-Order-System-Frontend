import { useState } from 'react'
import BrokerHeader from './views/BrokerHeader';
import DashBoard from './views/DashBoard';
import Hotel from './views/Hotel';
import Bprofile from './views/Bprofile';
import Category from './views/Category';
import logo from "./../../assets/Logo/diyadahara.png"
import ManageProduct from './components/ManageProduct';

import dash from "./../../assets/Dashboard/dashboard.png"
import mproduct from "./../../assets/Dashboard/mproduct.png"
import cutomer from "./../../assets/Dashboard/customer.png"
import account from "./../../assets/Dashboard/Account.png"
import category from "./../../assets/Dashboard/category.png"
import order from "./../../assets/Dashboard/order.png"
import bill from "./../../assets/Dashboard/bill.png"
import MainDashBoard from './views/MainDashBoard';
import ManageOrder from './components/ManageOrder';


export default function Broker() {
    const [redirectPage, setRedirectPage] = useState("mainBoard");
    const page = () => {
        switch (redirectPage) {
            case "mainBoard":
                return<MainDashBoard/>
            case "dashBoard":
                return <DashBoard />;
            case "place":
                return <Bprofile />;
            case "addusers":
                return <Hotel />;
            case "category":
                return <Category />;
            case "order":
                return <ManageOrder/>;
            case "profile":
                return <Bprofile />;
            case "product":
                return <ManageProduct />;
        }
    }
    return (
        <div className='main_wrapper h-[100vh]  flex justify-center items-center'>
            <div className='sub_wrapper bg-gray-200 w-[95%] h-[95vh] rounded-2xl flex shadow-2xl'>
                <div className='left_wrapper w-[25%]  bg-white h-[100%] rounded-tl-2xl rounded-bl-2xl'>
                    <div className='sidebar_main_wrapper h-[100%]'>
                        <div className='text-gray-600 flex flex-col items-center justify-center '>
                            <p className='text-[1rem] md:text-[2rem] text-center font-bold'>Diyadahara</p>
                            <p className='text-[1rem] md:text-[2rem] text-center font-bold'>Resort</p>
                        </div>
                        <div className='flex flex-col gap-3.5 px-[20px] mt-4'>
                            <div onClick={() => { setRedirectPage("mainBoard") }} className='flex items-center gap-3 h-[2.4em] bg-blue-300 cursor-pointer rounded-lg hover:bg-slate-100 px-[10px]'>
                                <img className='flex justify-center w-[30px]' src={dash} alt="" />
                                <p className='hidden md:flex text-[1.1rem] text-white font-semibold'>Dashboard</p>
                            </div>
                             <div onClick={() => { setRedirectPage("dashBoard") }} className='flex items-center gap-3 h-[2.4em] cursor-pointer hover:bg-slate-100 px-[10px]'>
                                <img className='w-[30px]' src={bill} alt="" />
                                <p className='hidden md:flex text-[1.1rem] text-gray-500 font-semibold'>Place Order</p>
                            </div>
                            <div onClick={() => { setRedirectPage("order") }} className='flex items-center gap-3 h-[2.4em] cursor-pointer hover:bg-slate-100 px-[10px]'>
                                <img className='w-[30px]' src={order} alt="" />
                                <p className='hidden md:flex text-[1.1rem] text-gray-500 font-semibold'>Customer Order</p>
                            </div>
                            <div onClick={() => { setRedirectPage("addusers") }} className='flex items-center gap-3 h-[2.4em] cursor-pointer hover:bg-slate-100 px-[10px]'>
                                <img className='w-[30px]' src={cutomer} alt="" />
                                <p className='hidden md:flex text-[1.1rem] text-gray-500 font-semibold'>Manage Customers</p>
                            </div>
                            <div onClick={() => { setRedirectPage("category") }} className='flex items-center gap-3 h-[2.4em] cursor-pointer hover:bg-slate-100 px-[10px]'>
                                <img className='w-[30px]' src={category} alt="" />
                                <p className='hidden md:flex text-[1.1rem] text-gray-500 font-semibold'>Manage Categories</p>
                            </div>
                            <div onClick={() => { setRedirectPage("product") }} className='flex items-center gap-3 h-[2.4em] cursor-pointer hover:bg-slate-100 px-[10px]'>
                                <img className='w-[30px]' src={mproduct} alt="" />
                                <p className='hidden md:flex text-[1.1rem] text-gray-500 font-semibold'>Manage Product</p>
                            </div>
                            <div onClick={() => { setRedirectPage("profile") }} className='flex items-center gap-3 h-[2.4em] cursor-pointer hover:bg-slate-100 px-[10px]'>
                                <img className='w-[30px]' src={account} alt="" />
                                <p className='hidden md:flex text-[1.1rem] text-gray-500 font-semibold'>Account</p>
                            </div>

                        </div>
                        <div className='text-center'>
                            <img className='w-[100px] mx-auto' src={logo} alt="" />
                            <p className='text-gray-400'>Made In NSK Technology</p>
                        </div>
                    </div>
                </div>
                <div className='right_wrapper w-[75%] border bg-gray-100 rounded-tr-2xl rounded-br-2xl '>
                    <div>
                        <BrokerHeader />
                    </div>
                    <div>
                        {page()}
                    </div>
                </div>
            </div>
        </div>
    )
}
