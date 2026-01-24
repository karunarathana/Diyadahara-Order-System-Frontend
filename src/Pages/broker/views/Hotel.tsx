import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material';
import CustomerTable from '../components/NewTable';
import { Button, Form, Input, Space } from 'antd';
import CreateCustomerAccountDrawer from '../function/CreateCustomerAccountDrawer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ReloadOutlined } from '@ant-design/icons';

const { Search } = Input;

interface DataType {
  customerID: number;
  customerName: string;
  customerEmail: string;
  phoneNumber: string;
  status: string;
  registeredAt: string;
}
export default function Hotel() {
  const [form] = Form.useForm();
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);

  const handleFinish = (values: { search: string }) => {
    console.log("Search value:", values.search);
  };

  // Fetch data from backend
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/com-diyadahara/view-all-customer');
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleSearch = (value: string) => {
    const searchValue = value.trim();
    if (!searchValue) return setFilteredData(data);
    
    const result = data.filter(
      (item: any) => item.phoneNumber.includes(searchValue) || item.phoneNumber.includes(searchValue)
    );
    
    setFilteredData(result);
  };
  return (
    <div className="p-[10px]">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Manage Customers</h2>
      <div>
        <div>
          <Box sx={{ width: 400, mt: 4 }}>
            <Form form={form} onFinish={handleFinish}>
              <Space orientation="vertical" style={{ width: "100%" }}>
                <Form.Item
                  name="search"
                  rules={[
                    {
                      pattern: /^(070|071|072|074|075|076|077|078)\d{7}$/,
                      message: "Enter a valid Sri Lanka phone number"
                    }
                  ]}
                >
                  <Search
                    placeholder="input phone number text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </Form.Item>
              </Space>
            </Form>
          </Box>
        </div>
        <div className='flex gap-1'>
          <CreateCustomerAccountDrawer reloadTable={fetchData}/>
          <div>
            <Button
              className="no-hover-btn"
              type="default"
              icon={<ReloadOutlined />}
              onClick={()=>{fetchData();}}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <CustomerTable tableData={filteredData} loadingData={loading} backendApi={fetchData}/>
      </div>
    </div>
  );
}
