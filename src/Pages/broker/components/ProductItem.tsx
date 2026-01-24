import food from '../../../assets/Logo/food1.jpg'

interface responseProductByCategory {
    foodID: number;
    foodName: string;
    foodPrice: number;
    phoneNumber: string;
    status: string;
    createdAt: string;
     onAddToCart?: () => void;
}

const FoodProductCard: React.FC<responseProductByCategory> = ({
  foodName,
  foodPrice,
  onAddToCart
}) => {
  const discount = foodPrice ? Math.round(((foodPrice - foodPrice) / foodPrice) * 100) : 0;

  return (
    <div className="w-[13em] h-60 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100 flex">
      {/* Image Section - Takes 40% width */}
      <div className="w-2/5 h-full bg-gray-200 relative">
        {true ? (
          <img 
            src={food} 
            className="w-full h-full object-cover border border-green-400"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        {/* Veg/Non-Veg Indicator */}
        <div className="absolute top-2 left-2">
          <div className={`w-5 h-5 rounded-full border-2 ${true ? 'border-green-600' : 'border-red-600'}`}>
            <div className={`w-2 h-2 rounded-full m-1 ${true ? 'bg-green-600' : 'bg-red-600'}`} />
          </div>
        </div>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}

        {/* Rating */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs flex items-center">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="font-medium">{4.5}</span>
        </div>
      </div>

      {/* Content Section - Takes 60% width */}
      <div className="w-3/5 h-full p-4 flex flex-col justify-between">
        {/* Top Section: Name and Portion */}
        <div>
          <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-2">{foodName}</h3>
          <div className="text-sm text-gray-500">{"250g"}</div>
        </div>

        {/* Price and Button Section */}
        <div>
          {/* Price Section */}
          <div className="mb-3">
            <div className="flex items-baseline space-x-2">
              <span className="text-lg font-bold text-gray-900">RS.{foodPrice.toFixed(2)}</span>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={onAddToCart}
            className="w-[60%] bg-orange-400 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodProductCard;