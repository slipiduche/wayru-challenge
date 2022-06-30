import React, { FC, useState } from "react";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import Input from "../shared/Input/Input";
import ButtonSecondary from "../shared/Button/ButtonSecondary";

export const ActionDialog: FC<{
  actionTitle: string;
  actionContent: any;
  actionText: string;
  actionFunction: (value) => void;
  cancelFunction?: () => void;
}> = ({
  actionTitle,
  actionContent,
  actionText,
  actionFunction,
  cancelFunction,
}) => {
  const [value, setvalue] = useState("0.0");
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden  overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none dark:text-neutral-200">
        <div className="relative min-w-min w-full my-6 mx-auto max-w-2xl">
          {/*content*/}
          <div className="border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-neutral-900">
            {/*header*/}
            <div className="flex items-start justify-start px-5 pt-5 pb-0 border-b  border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl pb-2 font-semibold">{actionTitle}</h3>
            </div>
            {/*body*/}
            {actionText != "Send" ? (
              <div className="relative px-6  flex-auto">
                <p className="pb-0 pt-4  text-slate-500 text-lg leading-relaxed">
                  {actionContent}
                </p>
              </div>
            ) : (
              <>{actionContent}</>
            )}
            {actionText == "Send" ? (
              <></>
            ) : (
              <div className="relative px-6 flex items-center justify-start">
                <p className="pb-0 pt-4   text-slate-500 text-lg leading-relaxed">
                  {actionText == "Deposit"
                    ? "Please set a value to deposit"
                    : "Please set a value to withdraw"}
                </p>
              </div>
            )}
            {actionText == "Send" ? (
              <></>
            ) : (
              <div className="justify-start px-5 pt-2 pb-4">
                <Input
                  className="max-w-2xl  shadow-lg border-0 dark:border;"
                  // id="search-input"
                  type="number"
                  placeholder="Please type a value"
                  sizeClass=" px-5 py-5 h-12 md:pl-4"
                  rounded="rounded-xl"
                  id="valueInput"
                  value={parseFloat(value) >= 0 ? value : ""}
                  onChange={(e) => {
                    if (
                      parseFloat(e.target.value) >= 0 ||
                      e.target.value == ""
                    ) {
                      setvalue(e.target.value);
                    } else {
                      setvalue("0");
                    }
                  }}
                />
              </div>
            )}
            {/*footer*/}
            {actionText == "Send" ? (
              <></>
            ) : (
              <div className="flex items-center justify-start px-5 pt-4 pb-8 border-solid border-slate-200 rounded-b">
                <ButtonPrimary
                  className="font-bold w-auto  text-sm ease-linear transition-all duration-150"
                  onClick={() => {
                    if (parseFloat(value) > 0) actionFunction(value);
                  }}
                >
                  {actionTitle == "Succsess" ? "Ok" : actionText}
                </ButtonPrimary>
                {actionTitle == "Succsess" ? (
                  <></>
                ) : (
                  <ButtonSecondary
                    className="font-bold w-[110px] ml-4  text-sm ease-linear transition-all duration-150"
                    onClick={() => {
                      cancelFunction();
                    }}
                  >
                    Close
                  </ButtonSecondary>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
