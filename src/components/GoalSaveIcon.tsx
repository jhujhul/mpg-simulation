import React from "react";

const GoalSaveIcon: React.FunctionComponent = () => {
  return (
    <div className="rounded-full w-3 h-3 flex-shrink-0">
      <svg
        className="w-full h-full fill-current text-red-600"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M17 16a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4.01V4a1 1 0 0 1 1-1 1 1 0 0 1 1 1v6h1V2a1 1 0 0 1 1-1 1 1 0 0 1 1 1v8h1V1a1 1 0 1 1 2 0v9h1V2a1 1 0 0 1 1-1 1 1 0 0 1 1 1v13h1V9a1 1 0 0 1 1-1h1v8z" />
      </svg>
    </div>
  );
};

export default GoalSaveIcon;
