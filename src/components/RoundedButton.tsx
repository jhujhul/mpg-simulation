import React from "react";

interface RoundedButtonProps {
  text: string;
  disabled: boolean;
  onClick: () => void;
}

const RoundedButton: React.FunctionComponent<RoundedButtonProps> = props => {
  const { text, disabled, onClick } = props;

  return (
    <button
      onClick={onClick}
      style={{ touchAction: "manipulation" }}
      className={`flex items-center justify-center rounded-full h-10 w-10 text-gray-700 font-bold border border-gray-700 focus:outline-none ${
        disabled ? "opacity-50" : ""
      }`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default RoundedButton;
