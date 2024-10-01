// import React from "react";

interface CategoryButtonData {
  category: string;
  className: string;
  onChangeCategory: (category: string) => void;
}

const CategoryButton = ({
  category,
  className,
  onChangeCategory,
}: CategoryButtonData) => {
  return (
    <button className={className} onClick={() => onChangeCategory(category)}>
      {category}
    </button>
  );
};

export default CategoryButton;
