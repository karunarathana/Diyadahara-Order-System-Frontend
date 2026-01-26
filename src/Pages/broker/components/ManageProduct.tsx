import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material';
import { Button, Form, Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateProductDrawer from '../function/CreateProductDrawer';
import ProductTable from '../function/ProductTable';
import { ReloadOutlined } from '@ant-design/icons';
import API_ENDPOINTS from '../../../constant/backend-endpoints';

const { Search } = Input;

interface categoryType {
  categoryId: number;
  name: string;
}
interface DataType {
  foodID: number;
  foodName: string;
  foodPrice: number;
  phoneNumber: string;
  status: string;
  createdAt: string;
  size: string;
  updatedBy: string;
  categoryId: categoryType;
}
export default function ManageProduct() {
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
      const response = await axios.get(API_ENDPOINTS.VIEW_ALL_PRODUCT);
      setData(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch Product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (value: string) => {
    const searchValue = value.trim().toLowerCase();

    if (!searchValue) {
      setFilteredData(data);
      return;
    }

    const result = data.filter((item: DataType) =>
      item.foodName.toLowerCase().includes(searchValue)
    );

    setFilteredData(result);
  };

  return (
    <div className="p-[10px]">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Manage Product</h2>
      <div>
        <div>
          <Box sx={{
            width: {
              xs: '100%',   // mobile
              sm: '80%',    // small tablets
              md: '40%',    // laptops & desktop
            }, mt: 4
          }}>
            <Form form={form} onFinish={handleFinish}>
              <Space orientation="vertical" style={{ width: "100%" }}>
                <Form.Item
                  name="search"
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
          <CreateProductDrawer />
          <div>
            <Button
              className="no-hover-btn"
              type="default"
              icon={<ReloadOutlined />}
              onClick={() => { fetchData(); }}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <ProductTable tableData={filteredData} loadingData={loading} />
      </div>
    </div>
  );
}
