import React from 'react';
interface CategoryItemProps {
  name: string;
  count: number;
  icon?: React.ReactNode;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ name}) => {
  return (
    <div className="flex justify-center items-center p-2 bg-green-200 rounded-lg shadow-sm hover:shadow-xl transition-shadow cursor-pointer w-32 text-amber-700 h-24">
       <div>
        <div className="font-medium text-2xl">{name}</div>
      </div>
    </div>
  );
};

export default CategoryItem;