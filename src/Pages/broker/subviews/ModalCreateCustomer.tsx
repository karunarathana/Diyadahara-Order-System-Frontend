import React from 'react';
import {Col, Form, Input, Modal, Row } from 'antd';
import { showNotification } from '../components/Notification';
import API_ENDPOINTS from '../../../constant/backend-endpoints';
import axios from 'axios';

interface Props {
    number:string | undefined;
    open: boolean;
    onClose: () => void;
}

const NewCustomerModal: React.FC<Props> = ({number,open, onClose }) => {

    const [form] = Form.useForm();

    const handleOk = () => {
        form.submit();
    };

    const onFinish = async (values: any) => {
        console.log(values);
        const obj = {
            "customerName":values.customerName,
            "phoneNumber":number,
            "customerEmail":`${values.customerName}@gmail.com`
        }
        try {
            const response = await axios.post(
                API_ENDPOINTS.CREATE_CUSTOMER,
                obj
            );
            console.log("**********************************")
            console.log("API Call Started In CreateCustomerAccountDrawer");
            console.log("**********************************")
            console.log("API Response:", response.data);
            console.log("API Call Finished In CreateCustomerAccountDrawer");
            console.log("**********************************")

            if (response.data.msg === "Customer Save Successfully" && response.data.statusCode === "201") {
                console.log(response.data.data.customerID);
                showNotification(
                    "success",
                    "Success",
                    "Customer created successfully!"
                );
            }
            if (response.data.statusCode === "400" && response.data.msg === "Already user have account") {
                showNotification(
                    "error",
                    "Error",
                    "Customer already exists!"
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
        onClose();
        form.resetFields();
    };

    return (
        <>
            <Modal
                title="Create new customer"
                open={open}
                onOk={handleOk}
                onCancel={onClose}
            >
                <Form
                    form={form}
                    layout="vertical"
                    requiredMark
                    onFinish={onFinish}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="customerName"
                                label="Customer Name"
                                rules={[
                                    { required: true, message: 'Please enter customer name' },
                                    { min: 5, message: 'Minimum 5 characters required' }
                                ]}
                            >
                                <Input placeholder="Please enter customer name" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default NewCustomerModal;
