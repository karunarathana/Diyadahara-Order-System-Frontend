import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import { showNotification } from '../components/Notification';
import axios from 'axios';
import API_ENDPOINTS from '../../../constant/backend-endpoints';

interface CreateCategoryProps {
    backendApi: () => void;
}

const CreateCategoryDrawer: React.FC<CreateCategoryProps> = ({
    backendApi
}) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onFinish = async (values: any) => {
        console.log('Form Values:', values.categoryName);
        try {
            const response = await axios.post(
                API_ENDPOINTS.CREATE_CATEGORY,
                null,
                {
                    params: {
                        categoryName: values.categoryName,
                    },
                }
            );
            console.log("**********************************")
            console.log("API Call Started In CreateCategoryDrawer");
            console.log("**********************************")
            console.log("API Response:", response);
            console.log("API Call Finished In CreateCategoryDrawer");
            console.log("**********************************")

            if (response.data.msg === "Successfully create new category" && response.data.statusCode === "201") {
                showNotification(
                    "success",
                    "Success",
                    "Category created successfully!"
                );
                backendApi();
            }
            if (response.data.statusCode === "400" && response.data.msg === "Oops Already Existing CategoryName") {
                showNotification(
                    "error",
                    "Error",
                    "Category already exists!"
                );
            }
        } catch (error: any) {
            console.error("API Error:", error);
            showNotification(
                "error",
                "System Error",
                error.response?.data?.message || "Something went wrong!"
            );
        }
        form.resetFields();
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                New Category
            </Button>
            <Drawer
                title="Create New Category"
                size={450}
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
                <Form layout="vertical" requiredMark={true} onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="categoryName"
                                label="Category Name"
                                style={{ width: '400px' }}
                                rules={[
                                    { required: true, message: 'Please enter category name' },
                                ]}
                            >
                                <Input placeholder="Please enter category name" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">
                                Create
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default CreateCategoryDrawer;