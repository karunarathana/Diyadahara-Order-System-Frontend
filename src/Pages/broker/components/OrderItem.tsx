import React from 'react';

interface Customer {
  customerEmail: string;
  customerID: number;
  customerName: string;
  phoneNumber: string;
  registeredAt: string;
  status: string;
  updatedAt: string;
  verified: boolean;
}

interface Category {
  categoryId: number;
  hibernateLazyInitializer?: object;
  name: string;
}

interface Product {
  categoryId: Category;
  createdAt: string;
  discountPercentage: number;
  foodID: number;
  foodName: string;
  foodPrice: number;
  hibernateLazyInitializer?: object;
  potionId: null | number;
  size: string;
  status: string;
  updatedAt: string;
  updatedBy: string;
}

interface Order {
  createBy: string;
  createdAt: string;
  customerId: Customer;
  orderId: number;
  status: string;
  totalPrice: number;
}

interface OrderItem {
  orderId: Order;
  orderItemId: number;
  potion: string;
  price: number;
  productId: Product;
  quantity: number;
}

interface OrderCardProps {
  orderItem: OrderItem;
  onCancel: (orderItemId: number) => void;
  onSell: (orderItemId: number) => void;
}

interface OrderCardViewProps {
  orderData: {
    itemData: OrderItem[];
    msg: string | null;
    orderData: any;
    statusCode: number | null;
  };
  onCancelOrder: (orderItemId: number) => void;
  onSellOrder: (orderItemId: number) => void;
}

// Single Order Item Card Component
const OrderItemCardComponent: React.FC<OrderCardProps> = ({ orderItem, onCancel, onSell }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateDiscountedPrice = (originalPrice: number, discount: number) => {
    return originalPrice - (originalPrice * discount) / 100;
  };

  const itemTotal = orderItem.price * orderItem.quantity;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200 ">
      {/* Order Header */}
      <div className="border-b pb-3 mb-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Order #{orderItem.orderId.orderId}
          </h3>
          <span className={`px-2 py-1 rounded text-sm font-medium ${
            orderItem.orderId.status === 'PENDING' 
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {orderItem.orderId.status}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Created by: {orderItem.orderId.createBy} • {formatDate(orderItem.orderId.createdAt)}
        </p>
      </div>

      {/* Product Details */}
      <div className="mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-gray-900">{orderItem.productId.foodName}</h4>
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
              <span>Size: {orderItem.productId.size}</span>
              <span>Portion: {orderItem.potion}</span>
              <span>Quantity: {orderItem.quantity}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">Rs. {itemTotal.toFixed(2)}</div>
            <div className="text-sm text-gray-500">
              Rs. {orderItem.price.toFixed(2)} each
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-gray-600">Original Price:</span>
              <span className="ml-2">Rs. {orderItem.productId.foodPrice.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-gray-600">Discount:</span>
              <span className="ml-2 text-green-600">
                {orderItem.productId.discountPercentage}%
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600">Discounted Price:</span>
              <span className="ml-2 font-medium">
                Rs. {calculateDiscountedPrice(
                  orderItem.productId.foodPrice,
                  orderItem.productId.discountPercentage
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="border-t pt-3 mb-4">
        <h5 className="font-medium text-gray-700 mb-2">Customer Information</h5>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600">Name:</span>
            <span className="ml-2 font-medium">{orderItem.orderId.customerId.customerName}</span>
          </div>
          <div>
            <span className="text-gray-600">Email:</span>
            <span className="ml-2 font-medium">{orderItem.orderId.customerId.customerEmail}</span>
          </div>
          <div>
            <span className="text-gray-600">Phone:</span>
            <span className="ml-2 font-medium">{orderItem.orderId.customerId.phoneNumber}</span>
          </div>
          <div>
            <span className="text-gray-600">Status:</span>
            <span className={`ml-2 font-medium ${
              orderItem.orderId.customerId.verified ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {orderItem.orderId.customerId.verified ? 'Verified' : 'Pending Verification'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t pt-4 flex justify-end space-x-3">
        <button
          onClick={() => onCancel(orderItem.orderItemId)}
          className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          Cancel Order
        </button>
        <button
          onClick={() => onSell(orderItem.orderItemId)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          Sell Order
        </button>
      </div>
    </div>
  );
};

// Main Order Card View Component
const OrderItemCard: React.FC<OrderCardViewProps> = ({ 
  orderData, 
  onCancelOrder, 
  onSellOrder 
}) => {
  // Calculate total order price
  const calculateTotalOrderPrice = () => {
    return orderData.itemData.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const handleCancel = (orderItemId: number) => {
    console.log(`Cancelling order item: ${orderItemId}`);
    onCancelOrder(orderItemId);
  };

  const handleSell = (orderItemId: number) => {
    console.log(`Selling order item: ${orderItemId}`);
    onSellOrder(orderItemId);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Order Summary Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6 border border-blue-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
            <p className="text-gray-600 mt-1">
              Order #{orderData.itemData[0]?.orderId.orderId} • 
              Customer: {orderData.itemData[0]?.orderId.customerId.customerName}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">
              Rs. {calculateTotalOrderPrice().toFixed(2)}
            </div>
            <div className="text-gray-600">Total Amount</div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Items:</span>
            <span className="ml-2 font-medium">{orderData.itemData.length}</span>
          </div>
          <div>
            <span className="text-gray-600">Order Status:</span>
            <span className="ml-2 font-medium text-yellow-600">
              {orderData.itemData[0]?.orderId.status}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Created:</span>
            <span className="ml-2 font-medium">
              {new Date(orderData.itemData[0]?.orderId.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Customer Status:</span>
            <span className={`ml-2 font-medium ${
              orderData.itemData[0]?.orderId.customerId.verified ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {orderData.itemData[0]?.orderId.customerId.verified ? 'Verified' : 'Pending'}
            </span>
          </div>
        </div>
      </div>

      {/* Order Items List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Order Items</h3>
        {orderData.itemData.map((item) => (
          <OrderItemCardComponent
            key={item.orderItemId}
            orderItem={item}
            onCancel={handleCancel}
            onSell={handleSell}
          />
        ))}
      </div>

      {/* Bulk Actions Footer */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-700 mb-4">Bulk Actions</h4>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => {
              const allIds = orderData.itemData.map(item => item.orderItemId);
              allIds.forEach(id => handleCancel(id));
            }}
            className="px-6 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Cancel All Orders
          </button>
          <button
            onClick={() => {
              const allIds = orderData.itemData.map(item => item.orderItemId);
              allIds.forEach(id => handleSell(id));
            }}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Sell All Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;