import React, { useEffect, useState } from 'react';
import { EditOutlined} from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { showNotification } from '../components/Notification';
import axios from 'axios';

interface DataType {
    categoryId: number;
    name: string;
}

const UpdateProductDrawer: React.FC<{foodName:string,foodPrice:number,cId:number,size:string,discountPercentage:number,foodId:number}> = (props) => {
    const [open, setOpen] = useState(false);
    const [openPotionIntput, setOprnPotionInput] = useState(true);
    const [form] = Form.useForm();
    const [data, setData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/com-diyadahara/view-all-category');
            setData(response.data.data);
        } catch (error) {
            console.error('Failed to fetch category:', error);
        } finally {
            setLoading(false);
            console.log(loading);
            
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    const onFinish = async (values: any) => {
        console.log('Form Values:', values);
        const productDto = {
            "productId":props.foodId,
            "foodName": values.foodName,
            "foodPrice": values.foodPrice,
            "categoryId":props.cId,
            "size": values.size,
            "sizeOfPotion": null,
            "discountPercentage":values.discountPercentage | 0,
            "updatedBy": "Anuja"
        }
        try {
            const response = await axios.post(
                "http://localhost:8080/api/com-diyadahara/update-single-product",
                productDto
            );
            console.log("**********************************")
            console.log("API Call Started In UpdateProductDrawer");
            console.log("**********************************")
            console.log("API Response:", response.data);
            console.log("API Call Finished In UpdateProductDrawer");
            console.log("**********************************")

            if (response.data.msg === "Save Product Successfully" && response.data.statusCode === "201") {
                showNotification(
                    "success",
                    "Success",
                    "Product created successfully!"
                );
            }
            if (response.data.statusCode === "400" && response.data.msg === "Already Product In System") {
                showNotification(
                    "error",
                    "Error",
                    "Product already exists!"
                );
            }
            if (response.data.statusCode === "500") {
                showNotification(
                    "error",
                    "Error",
                    "Please Change the email and phone number!"
                );
            }
        } catch (error: any) {
            console.error("API Error:", error);
            showNotification(
                "error",
                "Error",
                error.response?.data?.message || "Something went wrong!"
            );
        }
        form.resetFields();
        setOpen(false);
    };

    return (
        <>
           <a onClick={showDrawer}>
                <EditOutlined style={{ color: '#1890ff', fontSize: '18px', cursor: 'pointer' }} />
            </a>
            <Drawer
                title="Update product"
                size={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                    </Space>
                }
            >
                <Form layout="vertical" requiredMark={true} onFinish={onFinish}
                 initialValues={{
                        foodName: props.foodName,
                        foodPrice: props.foodPrice,
                        categoryId: props.cId,
                        discountPercentage: props.discountPercentage,
                        size:props.size

                    }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="foodName"
                                label="Food Name"
                                rules={[{ required: true, message: 'Please enter Food Name' }]}
                            >
                                <Input placeholder="Please enter Food Name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="foodPrice"
                                label="Food Price"
                                rules={[{ required: true, message: 'Please enter Food Price' }]}
                            >
                                <Input placeholder="Please enter Food Price" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="categoryId"
                                label="Category Name"
                                rules={[{ required: true, message: 'Please select Category Name' }]}
                            >
                                <Select
                                    placeholder="Select category"
                                    options={data.map((category: DataType) => ({
                                        label: category.name,
                                        value: category.categoryId,
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="Potion Type"
                                rules={[{ required: true, message: 'Please choose the Potion Type' }]}
                            >
                                <Select
                                    placeholder="Please choose the Potion Type"
                                    onChange={(value: boolean) => {
                                        value === false
                                            ? setOprnPotionInput(value)
                                            : setOprnPotionInput(value);
                                    }}
                                    options={[
                                        { label: 'Single Potion', value: true },
                                        { label: 'Special Potion', value: false },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="discountPercentage"
                                label="Discount Percentage %"
                            >
                                <Input placeholder="Please enter Discount Percentage" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="dateTime"
                                label="Valid Time Period"
                            >
                                <DatePicker.RangePicker
                                    style={{ width: '100%' }}
                                    getPopupContainer={(trigger) => trigger.parentElement!}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="size"
                                label="Size"
                                rules={[{ required: true, message: 'Please select Size' }]}
                            >
                                <Select
                                    placeholder="Please select Size"
                                    options={[
                                        { label: 'Small', value: 'Small' },
                                        { label: 'Meadium', value: 'Meadium' },
                                        { label: 'Large', value: 'Large' },
                                        { label: 'Special', value: 'Special' },
                                        { label: 'Others', value: 'Others' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className={`${(openPotionIntput) ? "hidden" : ""}`}>
                        <h3 className='mb-2 text-black text-[1.5rem] font-semibold'>Added Potion</h3>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="small"
                                    label="Small Potion"
                                    rules={[{ required: !openPotionIntput, message: 'Please enter user name' }]}
                                >
                                    <Input placeholder="Please enter user name" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="smallPrice"
                                    label="price Of Small potion"
                                    rules={[{ required: !openPotionIntput, message: 'Please enter user name' }]}
                                >
                                    <Input placeholder="Please enter user name" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="medium"
                                    label="Medium Potion"
                                    rules={[{ required: !openPotionIntput, message: 'Please enter user name' }]}
                                >
                                    <Input placeholder="Please enter user name" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="mediumPrice"
                                    label="Price of medium potion"
                                    rules={[{ required: !openPotionIntput, message: 'Please enter user name' }]}
                                >
                                    <Input placeholder="Please enter user name" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="large"
                                    label="Large Potion"
                                    rules={[{ required: !openPotionIntput, message: 'Please enter user name' }]}
                                >
                                    <Input placeholder="Please enter user name" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="largePrice"
                                    label="Price of large potion"
                                    rules={[{ required: !openPotionIntput, message: 'Please enter user name' }]}
                                >
                                    <Input placeholder="Please enter user name" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="special"
                                    label="Special Potion"
                                    rules={[{ required: !openPotionIntput, message: 'Please enter user name' }]}
                                >
                                    <Input placeholder="Please enter user name" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="specialPrice"
                                    label="Price of special potion"
                                    rules={[{ required: !openPotionIntput, message: 'Please enter user name' }]}
                                >
                                    <Input placeholder="Please enter user name" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    <Row gutter={16}>
                        <Form.Item label={null}>
                            <Button className='mt-4 bg-slate-900 w-[210px]' type="primary" htmlType="submit">
                                Create
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default UpdateProductDrawer;