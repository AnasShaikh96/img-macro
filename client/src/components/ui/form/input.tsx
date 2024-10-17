import React from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  error?: string | undefined;
  // error?: FieldError | Merge<FieldError, FieldErrorsImpl> | undefined;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error }, ref) => {
    console.log(error);
    return (
      <div>
        <input className={className} type={type} ref={ref} />
        <p>{error ?? ""}</p>
      </div>
    );
  }
);

export { Input };
