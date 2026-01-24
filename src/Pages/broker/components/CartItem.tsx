// Compact Horizontal Cart Item
interface CartItemHorizontalProps {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove?: () => void;
}

const CompactCartItem: React.FC<CartItemHorizontalProps> = ({
    name,
    price,
    quantity,
    onIncrease,
    onDecrease,
    onRemove,
}) => {
    return (
        <div className="w-[70%] bg-white border-b py-3">
            <div className="flex justify-between items-center">
                {/* Product Info */}
                <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{name}</h4>

                    <div className="flex items-center space-x-4 mt-1">
                        <span className="text-green-600 font-bold">
                            Rs.{price.toFixed(2)}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={onDecrease}
                                className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                                disabled={quantity <= 1}
                            >
                                -
                            </button>

                            <span className="font-medium w-8 text-center">
                                {quantity}
                            </span>

                            <button
                                onClick={onIncrease}
                                className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-100"
                            >
                                +
                            </button>
                        </div>

                    </div>
                </div>

                {/* Remove Button */}
                {onRemove && (
                    <button
                        onClick={onRemove}
                        className="ml-3 text-red-500 hover:text-red-700"
                        title="Remove item"
                    >
                        ✕
                    </button>
                )}
            </div>
            {/* Sub total */}
            <span className="text-sm text-gray-600">
                Rs.{(price * quantity).toFixed(2)}
            </span>
        </div>
    );
};

export default CompactCartItem;
