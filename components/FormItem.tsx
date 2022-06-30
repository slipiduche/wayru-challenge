import Label from "../components/Label/Label";
import React, { ReactNode } from "react";
import { FC } from "react";


export interface FormItemProps {
  className?: string;
  label?: string;
  desc?: ReactNode | string;
  children?: ReactNode;
  error?: ReactNode | string;
}

const FormItem: FC<FormItemProps> = ({
  children,
  className = "",
  label,
  desc,
  error,
}) => {
  return (
    <div className={className}>
      {label && <Label>{label}</Label>}
      <div className="mt-1.5">{children}</div>
      {desc && (
        <div className="block mt-3 text-xs text-neutral-500 dark:text-neutral-400 ">
          {desc}
        </div>
      )}
      {error && (
        <div className="block mt-3 text-xs text-red-500 dark:text-red-400 ">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormItem;
