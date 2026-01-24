import React from 'react';
import { Table, Space, Tag } from 'antd';
import type { TableProps } from 'antd';
import ConfirmDelete from '../components/Confirmation';
import UpdateProductDrawer from '../subviews/UpdateProductDrawer';

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

interface CustomerTableProps {
    tableData: DataType[];
    loadingData: boolean;
}
function handleDelete(key: number) {
    console.log(key);
}

const ProductTable: React.FC<CustomerTableProps> = ({
    tableData,
    loadingData,
}) => {

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Category Id',
            dataIndex: 'foodID',
            key: 'foodID',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Food Name',
            dataIndex: 'foodName',
            key: 'foodName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Food Price',
            dataIndex: 'foodPrice',
            key: 'foodPrice',
            render: (text) => <a>{`RS.${text}.00`}</a>,
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (_, record) => record.categoryId.name,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color = 'green';

                if (status === 'INACTIVE') color = 'volcano';
                if (status === 'PENDING') color = 'gold';
                if (status === 'BLOCKED') color = 'red';

                return (
                    <Tag color={color}>
                        {status.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Update By',
            dataIndex: 'updatedBy',
            key: 'updatedBy',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/* <CustomeDrawer
                        name={record.foodName} email={''} phone={''} /> */}
                    <UpdateProductDrawer
                        foodName={record.foodName}
                        foodPrice={record.foodPrice}
                        cId={record.categoryId.categoryId}
                        size={record.size}
                        discountPercentage={0}
                        foodId={record.foodID}
                    />
                        
                    <ConfirmDelete
                        onConfirm={() => handleDelete(record.foodID)}
                        onCancel={() => console.log("Cancelled delete for", record.foodID)}
                    />
                </Space>
            ),
        },
    ];

    return <Table<DataType> columns={columns} dataSource={tableData} loading={loadingData} scroll={{ y: '40vh', x: 'max-content' }} />;
};

export default ProductTable;

