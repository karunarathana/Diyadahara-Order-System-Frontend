import React, { useState } from 'react';
import { Button, Drawer, Form, Input, Space } from 'antd';
import type { FormProps } from 'antd';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';

type FieldType = {
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
};

interface CustomerProps {
    name: string;
    email: string;
    phone: string;
}


const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const CustomeDrawer: React.FC<CustomerProps> = (props) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <a onClick={showDrawer}>
                <EditOutlined style={{ color: '#1890ff', fontSize: '18px', cursor: 'pointer' }} />
            </a>
            <Drawer
                title="Create a new customer account"
                size={520}
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
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 500 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Name"
                        name="customerName"
                        rules={[{ required: true, message: 'Please input your customer name!' }]}
                    >
                        <Input placeholder={props.name} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Email"
                        name="customerEmail"
                        rules={[{ required: true, message: 'Please input your customer email!' }]}
                    >
                        <Input placeholder={props.email} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Phone Number"
                        name="customerPhone"
                        rules={[{ required: true, message: 'Please input your customer phone number!' }]}
                    >
                        <Input placeholder={props.phone} />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default CustomeDrawer;