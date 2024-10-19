import React from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl> | undefined;
  registration: Partial<UseFormRegisterReturn>;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, registration, ...props }, ref) => {
    return (
      <div>
        <input
          className={className}
          type={type}
          ref={ref}
          {...props}
          {...registration}
        />
        <p>{error?.message?.toString()}</p>
      </div>
    );
  }
);

export { Input };
