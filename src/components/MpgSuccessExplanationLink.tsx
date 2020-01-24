import React, { Fragment, useState } from "react";
import { Condition, areAllConditionsMet } from "../selectors";

interface Props {
  conditions: Condition[];
  result: string;
}
const MpgSuccessExplanationLink: React.FunctionComponent<Props> = props => {
  const { conditions, result } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const resultIconColor = areAllConditionsMet(conditions)
    ? "text-green-500"
    : "text-red-500";

  return (
    <Fragment>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-white text-gray-800 font-semibold py-1 px-3 mt-1 border border-gray-700 rounded-full"
      >
        Pourquoi ?
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-30"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <div className="w-full h-full flex justify-center items-center">
            <div className="max-w-lg bg-white w-4/5 relative px-4 pt-6 pb-4">
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

              <ul>
                {conditions.map((condition, i) => {
                  return (
                    <li className="flex mb-3" key={i}>
                      <div className="w-5 h-5 flex-shrink-0">
                        {condition.isMet ? (
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
                    </li>
                  );
                })}
              </ul>

              <div className="flex">
                <div className="w-5 h-5 flex-shrink-0">
                  <svg
                    className={`fill-current ${resultIconColor}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3.5 13H12v5l6-6-6-6v5H4V2H2v11z" />
                  </svg>
                </div>
                <span className="ml-2 leading-tight font-bold">{result}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MpgSuccessExplanationLink;
