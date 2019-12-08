import React from "react";

interface Props {
  isLeft: boolean;
  onClick: () => void;
}
const NavigationChevronButton: React.FunctionComponent<Props> = props => {
  const { isLeft, onClick } = props;
  const rotationAngle = isLeft ? 0 : 180;

  return (
    <button
      onClick={onClick}
      className="flex items-center cursor-pointer focus:outline-none hover:bg-gray-200"
    >
      <svg
        className="w-6 h-6 fill-current text-gray-600"
        style={{ transform: `rotate(${rotationAngle}deg)` }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z" />
      </svg>
    </button>
  );
};

export default NavigationChevronButton;
