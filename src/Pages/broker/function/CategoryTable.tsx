import React from 'react';
import { Table, Space } from 'antd';
import type { TableProps } from 'antd';
import UpdateCategoryDrawer from '../subviews/UpdateCategoryDrawer';
import ConfirmDelete from '../components/Confirmation';
import axios from 'axios';
import { showNotification } from '../components/Notification';
import API_ENDPOINTS from '../../../constant/backend-endpoints';

interface DataType {
    categoryId: number;
    name: string;
}

interface CustomerTableProps {
    tableData: DataType[];
    loadingData: boolean;
    backendApi: () => void;
}

const CategoryTable: React.FC<CustomerTableProps> = ({
    tableData,
    loadingData,
    backendApi
}) => {

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Category Id',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <UpdateCategoryDrawer categoryName={record.name} categoryId={record.categoryId} />

                    <ConfirmDelete
                        onConfirm={() => handleDelete(record.categoryId, backendApi)}
                        onCancel={() => console.log("Cancelled delete for", record.categoryId)}
                    />
                </Space>
            ),
        },
    ];

    return <Table<DataType> columns={columns} dataSource={tableData} loading={loadingData} scroll={{ y: '40vh' }} />;
};

export default CategoryTable;

async function handleDelete(key: number, backFunc: () => void) {
    console.log(key);

    try {
        const response = await axios.delete(
            API_ENDPOINTS.DELTE_CATEGORY,
            {
                params: {
                    categoryId: key,
                },
            }
        );
        console.log("**********************************")
        console.log("API Call Started In Category handleDelete");
        console.log("**********************************")
        console.log("API Response:", response);
        console.log("API Call Finished In Category handleDelete");
        console.log("**********************************")

        if (response.data.msg === "Category Deleted Successfully" && response.data.statusCode === "201") {
            showNotification(
                "success",
                "Success",
                "Category delete successfully!"
            );
            backFunc();
        }
        if (response.data.statusCode === "500") {
           showNotification(
                "warning",
                "System Warning",
                "Cannot delete category. Products exist. Please go to the Product table and delete refrence this category."
            );
        }
    } catch (error: any) {
        console.error("API Error:", error);
        showNotification(
            "error",
            "Server Error",
            error.response?.data?.message || "Something went wrong!"
        );
    }
}

