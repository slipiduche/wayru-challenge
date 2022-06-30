import React, { FC, useState } from "react";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect, useDispatch } from "react-redux";
import { compose } from "redux";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import ButtonSecondary from "../shared/Button/ButtonSecondary";
import { lockFunds, withdraw } from "../store/wallet";
import { ActionDialog } from "./ActionDialog";
import { ContactForm } from "./ContactForm";
import { connectHandler } from "../store/wallet/index";
const BalanceContainer: FC<{ state_wallet; state_error }> = ({
  state_wallet,
  state_error,
}) => {
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [actionDialogType, setActionDialogType] = useState(null);
  const [successDialogContent, setSuccessDialogContent] = useState(null);
  const dispatch = useDispatch();

  return (
    <div className="container -mt-10 lg:-mt-16 max-w-3xl">
      <div className="relative bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row">
        <div className="pt-5 md:pt-1 md:ml-6 xl:ml-14 flex-grow">
          <div className="max-w-screen-sm ">
            <h2 className="inline-flex items-center text-2xl sm:text-3xl lg:text-4xl font-semibold">
              <span>My Balance</span>
            </h2>

            <div className="flex items-center text-md font-medium space-x-2.5 mt-2.5 text-green-600 cursor-pointer">
              <span className="overflow-auto text-neutral-700 dark:text-neutral-300 ">
                My address: {state_wallet.account ?? "..."}
              </span>
              <CopyToClipboard text={state_wallet.account ?? "..."}>
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                  <path
                    d="M18.05 9.19992L17.2333 12.6833C16.5333 15.6916 15.15 16.9083 12.55 16.6583C12.1333 16.6249 11.6833 16.5499 11.2 16.4333L9.79999 16.0999C6.32499 15.2749 5.24999 13.5583 6.06665 10.0749L6.88332 6.58326C7.04999 5.87492 7.24999 5.25826 7.49999 4.74992C8.47499 2.73326 10.1333 2.19159 12.9167 2.84993L14.3083 3.17493C17.8 3.99159 18.8667 5.71659 18.05 9.19992Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.5498 16.6583C12.0331 17.0083 11.3831 17.3 10.5915 17.5583L9.2748 17.9917C5.96646 19.0583 4.2248 18.1667 3.1498 14.8583L2.08313 11.5667C1.01646 8.25833 1.8998 6.50833 5.20813 5.44167L6.5248 5.00833C6.86646 4.9 7.19146 4.80833 7.4998 4.75C7.2498 5.25833 7.0498 5.875 6.88313 6.58333L6.06646 10.075C5.2498 13.5583 6.3248 15.275 9.7998 16.1L11.1998 16.4333C11.6831 16.55 12.1331 16.625 12.5498 16.6583Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </CopyToClipboard>
              <Image
                src="/reloadIcon.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
                onClick={() => {
                  connectHandler(dispatch);
                }}
              />
            </div>

            <div className="mt-8 xl:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 xl:gap-6">
              <div className="rounded-2xl flex flex-col items-center justify-center shadow-md border border-neutral-50 dark:border-neutral-800 p-5 lg:p-6">
                <span className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                  ETH
                </span>
                <span className="block mt-2 text-xl font-bold text-neutral-500 dark:text-neutral-400">
                  {state_wallet.balance
                    ? state_wallet.balance.slice(
                        0,
                        state_wallet.balance.indexOf(".")
                      ) +
                      state_wallet.balance.slice(
                        state_wallet.balance.indexOf("."),

                        state_wallet.balance.indexOf(".") + 3
                      )
                    : 0}
                </span>
                <span className="text-xs mt-2">Wallet</span>
              </div>

              <div className="rounded-2xl flex flex-col items-center justify-center shadow-md border border-neutral-50 dark:border-neutral-800 p-5 lg:p-6">
                <span className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                  ETH
                </span>
                <span className="block mt-2 text-xl font-bold text-neutral-500 dark:text-neutral-400">
                  {state_wallet.contractBalance}
                </span>
                <span className="text-xs mt-2">Contract</span>
              </div>
              <div className=" flex flex-col items-center justify-center dark:border-neutral-800 p-5 lg:p-6">
                <ButtonPrimary
                  sizeClass="px-4 py-2 sm:px-5"
                  onClick={() => {
                    setActionDialogType("deposit");
                    setShowActionDialog(true);
                  }}
                >
                  Deposit
                </ButtonPrimary>
              </div>
              <div className=" flex flex-col items-center justify-center dark:border-neutral-800 p-5 lg:p-6">
                <ButtonSecondary
                  sizeClass="px-4 py-2 sm:px-5"
                  onClick={() => {
                    setActionDialogType("withdraw");
                    setShowActionDialog(true);
                  }}
                >
                  Withdraw
                </ButtonSecondary>
              </div>
            </div>
            <div className=" flex flex-col items-center justify-center dark:border-neutral-800 p-5 lg:p-6">
              <ButtonPrimary
                sizeClass="px-4 py-2 sm:px-5"
                onClick={() => {
                  setActionDialogType("contact");
                  setShowActionDialog(true);
                }}
              >
                Contact us
              </ButtonPrimary>
            </div>
          </div>
          {/* <div className="mt-4 ">
                    <SocialsList itemClass="block w-7 h-7" />
                  </div> */}
        </div>
        {showActionDialog ? (
          <ActionDialog
            actionText={
              actionDialogType == "deposit"
                ? "Deposit"
                : actionDialogType == "withdraw"
                ? "Witdraw"
                : actionDialogType == "success"
                ? "Close"
                : "Send"
            }
            actionContent={
              actionDialogType == "deposit" ? (
                <div className="flex items-center justify-start pt-2 pb-2 w-">
                  <div className="pl-5">
                    <span>
                      You are about to deposit funds to a contract,remember that
                      once it is sended it will take some minutes to be
                      displayed on contract
                    </span>
                  </div>
                </div>
              ) : actionDialogType == "withdraw" ? (
                <div className="flex items-center justify-start pt-2 pb-2">
                  <div className="pl-5">
                    You are about to withdraw funds from contract, remember that
                    once it is redeemed it will take some minutes to return to
                    your wallet
                  </div>
                </div>
              ) : actionDialogType == "success" ? (
                <div className="flex items-center justify-start pt-2 pb-2">
                  <div className="pl-5">{successDialogContent}</div>
                </div>
              ) : (
                <ContactForm
                  actionText="Send"
                  onSuccess={() => {
                    setSuccessDialogContent("Mail sended");
                    setActionDialogType("success");
                    setShowActionDialog(true);
                  }}
                  cancelFunction={() => {
                    setShowActionDialog(false);
                  }}
                ></ContactForm>
              )
            }
            actionTitle={
              actionDialogType == "deposit"
                ? "Do you want to deposit funds?"
                : actionDialogType == "withdraw"
                ? "Do you want to withdraw funds?"
                : actionDialogType == "success"
                ? "Success"
                : "Contact Us"
            }
            actionFunction={
              actionDialogType == "deposit"
                ? (value) => {
                    setShowActionDialog(false);
                    try {
                      lockFunds(value).then(() => {
                        setSuccessDialogContent("Wait for your funds");
                        setActionDialogType("success");
                        setShowActionDialog(true);
                      });
                      //   enqueueSnackbar("Please sign with your wallet...", {
                      //     autoHideDuration: 2000,
                      //     variant: "info",
                      //     anchorOrigin: { horizontal: "right", vertical: "top" },
                      //     sx: {
                      //       "& .SnackbarContent-root": {
                      //         color: `${themeSnackbar().color}`,
                      //         backgroundColor: `${
                      //           themeSnackbar().backgroundColor
                      //         }`,
                      //       },
                      //     },
                      //   });
                    } catch (error) {
                      //   enqueueSnackbar(`error listing asset`, {
                      //     variant: "error",
                      //     anchorOrigin: { horizontal: "right", vertical: "top" },
                      //     sx: {
                      //       "& .SnackbarContent-root": {
                      //         color: `${themeSnackbar().color}`,
                      //         backgroundColor: `${
                      //           themeSnackbar().backgroundErrorColor
                      //         }`,
                      //       },
                      //     },
                      //   });
                    }
                  }
                : actionDialogType == "withdraw"
                ? (value) => {
                    try {
                      setShowActionDialog(false);
                      //withdraw(value * 1000000000000000000);
                      withdraw(value).then(() => {
                        setSuccessDialogContent("Wait for your funds");
                        setActionDialogType("success");
                        setShowActionDialog(true);
                      });
                      //   enqueueSnackbar("Please sign with your wallet...", {
                      //     autoHideDuration: 2000,
                      //     variant: "info",
                      //     anchorOrigin: { horizontal: "right", vertical: "top" },
                      //     sx: {
                      //       "& .SnackbarContent-root": {
                      //         color: `${themeSnackbar().color}`,
                      //         backgroundColor: `${
                      //           themeSnackbar().backgroundColor
                      //         }`,
                      //       },
                      //     },
                      //   });
                    } catch (error) {
                      //   enqueueSnackbar(`error delisting asset`, {
                      //     variant: "error",
                      //     anchorOrigin: { horizontal: "right", vertical: "top" },
                      //     sx: {
                      //       "& .SnackbarContent-root": {
                      //         color: `${themeSnackbar().color}`,
                      //         backgroundColor: `${
                      //           themeSnackbar().backgroundErrorColor
                      //         }`,
                      //       },
                      //     },
                      //   });
                    }
                  }
                : (value) => {}
            }
            cancelFunction={() => {
              setShowActionDialog(false);
            }}
          ></ActionDialog>
        ) : (
          <></>
        )}
        {/* <div className="absolute md:static left-5 top-4 sm:left-auto sm:top-5 sm:right-5 flex flex-row-reverse justify-end">
                  <NftMoreDropdown
                    actions={[
                      {
                        id: "report",
                        name: "Report abuse",
                        icon: "las la-flag",
                      },
                    ]}
                    containerClassName="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 cursor-pointer"
                  />
                  <ButtonDropDownShare
                    className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 cursor-pointer mx-2"
                    panelMenusClass="origin-top-right !-right-5 !w-40 sm:!w-52"
                  />

                  <FollowButton
                    isFollowing={false}
                    fontSize="text-sm md:text-base font-medium"
                    sizeClass="px-4 py-1 md:py-2.5 h-8 md:!h-10 sm:px-6 lg:px-8"
                  />
                </div> */}
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    state_wallet: state.wallet,
    state_error: state.error,
  };
}
function mapDispatchToProps(dispatch: any) {
  return {};
}
export default compose(connect(mapStateToProps, mapDispatchToProps))(
  BalanceContainer
);
