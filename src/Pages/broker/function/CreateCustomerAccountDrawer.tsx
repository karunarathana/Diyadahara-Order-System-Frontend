import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import { showNotification } from '../components/Notification';
import axios from 'axios';
import API_ENDPOINTS from '../../../constant/backend-endpoints';

interface CustomerTableProps {
  reloadTable: () => void;
}
const CreateCustomerAccountDrawer: React.FC<CustomerTableProps> = ({reloadTable}) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = async (values: any) => {
    console.log('Form Values:', values);
    try {
      const response = await axios.post(
        API_ENDPOINTS.CREATE_CUSTOMER,
        values
      );
      console.log("**********************************")
      console.log("API Call Started In CreateCustomerAccountDrawer");
      console.log("**********************************")
      console.log("API Response:", response.data);
       console.log("API Call Finished In CreateCustomerAccountDrawer");
      console.log("**********************************")

      if (response.data.msg === "Customer Save Successfully" && response.data.statusCode === "201") {
        showNotification(
          "success",
          "Success",
          "Customer created successfully!"
        );
        reloadTable();
      }
      if(response.data.statusCode === "400" && response.data.msg === "Already user have account"){
        showNotification(
          "error",
          "Error",
          "Customer already exists!"
        );
      }
      if(response.data.statusCode === "500"){
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
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button>
      <Drawer
        title="Create a new account"
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
                name="customerName"
                label="Cutomer Name"
                style={{ width: '400px' }}
                rules={[
                  { required: true, message: 'Please enter user name' },
                  { min: 5, message: "Minimum 5 characters required" }
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="customerEmail"
                label="Cutomer Email"
                style={{ width: '400px' }}
                rules={[
                  { required: true, message: 'Please enter user email' },
                  { type: "email", message: "Please enter a valid email address" }
                ]}
              >
                <Input placeholder="Please enter user email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phoneNumber"
                label="Cutomer Phone"
                style={{ width: '400px' }}
                rules={[
                  { required: true, message: 'Please enter user phone' },
                  { min: 10, message: "Minimum 10 characters required" },
                  {
                    pattern: /^(070|071|072|074|075|076|077|078)\d{7}$/,
                    message: "Enter a valid Sri Lanka phone number"
                  }
                ]}
              >
                <Input placeholder="Please enter user phone" />
              </Form.Item>
            </Col>
          </Row>
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

export default CreateCustomerAccountDrawer;