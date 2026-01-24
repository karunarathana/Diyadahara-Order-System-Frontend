import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Popconfirm} from 'antd';

interface ConfirmDeleteProps {
  onConfirm: () => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
  okText?: string;
  cancelText?: string;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  onConfirm,
  onCancel,
  title = "Delete the item",
  description = "Are you sure you want to delete this?",
  okText = "Yes",
  cancelText = "No"
}) => {
  return (
    <Popconfirm
      title={title}
      description={description}
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={onConfirm}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
    >
      {/* Delete Icon */}
      <DeleteOutlined
        style={{ color: 'red', fontSize: '18px', cursor: 'pointer' }}

      />
    </Popconfirm>
  );
};

export default ConfirmDelete;
