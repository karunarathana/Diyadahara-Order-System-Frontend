import { Box } from "@mui/material"
import { Button, Form, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import CreateCategoryDrawer from "../function/CreateCategoryDrawer";
import CategoryTable from "../function/CategoryTable";
import { ReloadOutlined } from "@ant-design/icons";
import API_ENDPOINTS from "../../../constant/backend-endpoints";

const { Search } = Input;

interface DataType {
    categoryId: number;
    name: string;
}

function Category() {
    const [form] = Form.useForm();
    const [data, setData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [filteredData, setFilteredData] = useState<DataType[]>([]);
    // Fetch data from backend
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_ENDPOINTS.VIEW_ALL_CATEGORY);
            console.log(response.data.data);
            setData(response.data.data);
            setFilteredData(response.data.data);
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

        console.log(data);

        const result = data.filter(
            (item: DataType) => item.name.toLowerCase().includes(searchValue)
        );
        console.log(result);

        setFilteredData(result);
    };
    return (
        <div className="p-[10px]">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4">Manage Category</h2>
            <div>
                <div>
                    <Box sx={{
                        width: {
                            xs: '100%',   // mobile
                            sm: '80%',    // small tablets
                            md: '40%',    // laptops & desktop
                        }, mt: 4
                    }}>
                        <Form form={form}>
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
                <div className="flex gap-1">
                    <CreateCategoryDrawer backendApi={fetchData} />
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
                <CategoryTable tableData={filteredData} loadingData={loading} backendApi={fetchData} />
            </div>
        </div>
    )
}

export default Category