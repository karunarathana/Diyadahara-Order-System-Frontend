import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import { showNotification } from '../components/Notification';
import axios from 'axios';
import API_ENDPOINTS from '../../../constant/backend-endpoints';

const UpdateCategoryDrawer: React.FC<{ categoryName: string, categoryId: number }> = (props) => {
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
                API_ENDPOINTS.UPDATE_CATEGORY,
                null,
                {
                    params: {
                        categoryId:props.categoryId,
                        categoryName: values.categoryName
                    },
                }
            );
            console.log("**********************************")
            console.log("API Call Started In UpdateCategoryDrawer");
            console.log("**********************************")
            console.log("API Response:", response);
            console.log("API Call Finished In UpdateCategoryDrawer");
            console.log("**********************************")

            if (response.data.msg === "Update Successfully" && response.data.statusCode === "200") {
                showNotification(
                    "success",
                    "Success",
                    "Category update successfully!"
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
                title="Update Category"
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
                <Form layout="vertical" requiredMark={true} onFinish={onFinish}
                    initialValues={{
                        categoryName: props.categoryName
                    }}
                >
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
                                 <Input placeholder="Enter category name" />
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

export default UpdateCategoryDrawer;