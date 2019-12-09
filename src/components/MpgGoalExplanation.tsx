import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { getHasSelectedPlayerScoredWithConditions } from "../selectors";

const MpgGoalExplanation: React.FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasSelectedPlayerScoredWithConditions = useSelector(
    getHasSelectedPlayerScoredWithConditions
  );

  return (
    <Fragment>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-gray-700 underline"
      >
        Pourquoi ?
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-30"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <div className="w-full h-full flex justify-center items-center">
            <div className="bg-white w-4/5 relative px-4 pt-6 pb-4">
              <button
                className="absolute top-0 right-0 p-2"
                onClick={() => setIsModalOpen(false)}
              >
                <svg
                  className="w-6 h-6 fill-current text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                </svg>
              </button>
              {hasSelectedPlayerScoredWithConditions.map((condition, i) => {
                const marginBottonClass =
                  i < hasSelectedPlayerScoredWithConditions.length - 1 &&
                  "mb-3";

                return (
                  <p className={`flex ${marginBottonClass}`}>
                    <div className="w-5 h-5 flex-shrink-0">
                      {condition.isTrue ? (
                        <svg
                          className="fill-current text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                      ) : (
                        <svg
                          className="fill-current text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          }
                          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                        </svg>
                      )}
                    </div>
                    <span className="ml-2 leading-tight">
                      {condition.description}
                    </span>
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MpgGoalExplanation;
