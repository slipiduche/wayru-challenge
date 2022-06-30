import React, { FC } from "react";
import Input from "../shared/Input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import FormItem from "./FormItem";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import ButtonSecondary from "../shared/Button/ButtonSecondary";
import Textarea from "../shared/Textarea/Textarea";
type Inputs = {
  name: string;
  email: string;
  message: string;
};
export const ContactForm: FC<{
  actionText: string;

  cancelFunction;
}> = ({ actionText, cancelFunction }) => {
  const defaultValues: Inputs = {
    name: "",
    email: "",
    message: "",
  };
  const methods = useForm({ defaultValues: defaultValues });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;
  return (
    <div>
      {/* <div className="relative px-6 flex items-center justify-start">
        <p className="pb-0 pt-4   text-slate-500 text-lg leading-relaxed">
          Name
        </p>
      </div> */}
      <div className="justify-start px-5 pt-2 pb-4">
        <FormItem
          label="Name"
          error={`${
            errors.name
              ? errors.name.type == "maxLength"
                ? "Cannot exceed 64 characters"
                : errors.name.message
              : ""
          }`}
        >
          <Input
            className="max-w-2xl  shadow-lg border-0 dark:border;"
            type="text"
            placeholder="Name..."
            sizeClass=" px-5 py-5 h-12 md:pl-4"
            rounded="rounded-xl"
            //   value={""}
            {...register("name", {
              required: "This field is required",
              maxLength: 25,
            })}
          />
        </FormItem>
      </div>
      <div className="justify-start px-5 pt-2 pb-4">
        <FormItem
          label="Email"
          error={`${
            errors.email
              ? errors.email.type == "maxLength"
                ? "Cannot exceed 64 characters"
                : errors.email.message
              : ""
          }`}
        >
          <Input
            className="max-w-2xl  shadow-lg border-0 dark:border;"
            type="email"
            placeholder="Email..."
            sizeClass=" px-5 py-5 h-12 md:pl-4"
            rounded="rounded-xl"
            //   value={""}
            {...register("email", {
              required: "This field is required",
              maxLength: 25,
            })}
          />
        </FormItem>
      </div>
      <div className="justify-start px-5 pt-2 pb-4">
        <FormItem
          label="Message"
          error={`${
            errors.message
              ? errors.message.type == "maxLength"
                ? "Cannot exceed 250 characters"
                : errors.message.message
              : ""
          }`}
        >
          {/* <Input
            className="max-w-2xl  shadow-lg border-0 dark:border;"
            type="text"
            placeholder="Type your message..."
            sizeClass=" px-5 py-5 h-12 md:pl-4"
            rounded="rounded-xl"
            //   value={""}
            {...register("message", {
              required: "This field is required",
              maxLength: 250,
            })}
          /> */}
          <Textarea
            rows={3}
            className="mt-1.5 shadow-lg px-5 py-5 border-0 dark:border;"
            placeholder="Type you message"
            {...register("message", {
              required: "This field is required",
              maxLength: 250,
            })}
          />
        </FormItem>
      </div>

      <div className="flex items-center justify-start px-5 pt-4 pb-8 border-solid border-slate-200 rounded-b">
        <ButtonPrimary
          className="font-bold w-auto  text-sm ease-linear transition-all duration-150"
          onClick={handleSubmit(async () => {
            ///Send info to mail
            console.log("submited");
          })}
        >
          {actionText}
        </ButtonPrimary>

        <ButtonSecondary
          className="font-bold w-[110px] ml-4  text-sm ease-linear transition-all duration-150"
          onClick={() => {
            cancelFunction();
          }}
        >
          Close
        </ButtonSecondary>
      </div>
    </div>
  );
};
