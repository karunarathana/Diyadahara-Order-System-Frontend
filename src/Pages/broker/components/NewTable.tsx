import React from 'react';
import { Table, Tag, Space } from 'antd';
import type { TableProps } from 'antd';
import UpdateCustomerDrawer from '../subviews/UpdateUserDrawer';
import ConfirmDelete from './Confirmation';
import { showNotification } from './Notification';
import axios from 'axios';
import API_ENDPOINTS from '../../../constant/backend-endpoints';

interface DataType {
  customerID: number;
  customerName: string;
  customerEmail: string;
  phoneNumber: string;
  status: string;
  registeredAt: string;
}

interface CustomerTableProps {
  tableData: DataType[];
  loadingData: boolean;
  backendApi: () => void;
}
const CustomerTable: React.FC<CustomerTableProps> = ({
  tableData,
  loadingData,
  backendApi
}) => {

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Customer Email',
      dataIndex: 'customerEmail',
      key: 'customerEmail',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
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
      title: 'Join Date',
      dataIndex: 'registeredAt',
      key: 'registeredAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <UpdateCustomerDrawer
            cId={record.customerID}
            name={record.customerName}
            email={record.customerEmail}
            phone={record.phoneNumber}
            fetchFunc={backendApi}
          />

          <ConfirmDelete
            onConfirm={() => handleDelete(record.customerID, backendApi)}
            onCancel={() => console.log("Cancelled delete for", record.customerID)}
          />
        </Space>
      ),
    },
  ];

  return <Table<DataType> columns={columns} dataSource={tableData} loading={loadingData} scroll={{ y: '40vh', x: 'max-content' }}/>;
};

export default CustomerTable;

async function handleDelete(key: number,reloadFetch:()=>void) {
  console.log(key);

    try {
        const response = await axios.delete(
            API_ENDPOINTS.DELTE_CUSTOMERS,
            {
                params: {
                    customerId: key,
                },
            }
        );
        console.log("**********************************")
        console.log("API Call Started In Customer handleDelete");
        console.log("**********************************")
        console.log("API Response:", response);
        console.log("API Call Finished In Customer handleDelete");
        console.log("**********************************")

        if (response.data.msg === "Customer Delete Successful In System" && response.data.statusCode === "200") {
            showNotification(
                "success",
                "Success",
                "Customer delete successfully!"
            );
            reloadFetch();
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

