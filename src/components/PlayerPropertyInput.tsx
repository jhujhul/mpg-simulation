import React from "react";

interface PlayerPropertyInputProps {
  label: string;
  icon?: React.ReactNode;
}
const PlayerPropertyInput: React.FunctionComponent<PlayerPropertyInputProps> = props => {
  const { label, icon, children } = props;

  return (
    <div className="flex items-center">
      <div className="w-4">{icon}</div>
      <div className="w-16">
        <label className="block text-gray-700 mb-0 pr-4">{label}</label>
      </div>
      <div
        className="flex-grow flex justify-center"
        // Used to prevent zoom on double tap: https://stackoverflow.com/a/54753520
        onClick={() => {}}
      >
        {children}
      </div>
    </div>
  );
};

export default PlayerPropertyInput;
