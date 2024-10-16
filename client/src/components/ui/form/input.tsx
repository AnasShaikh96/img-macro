import React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type }, ref) => {
    return <input className={className} type={type} ref={ref} />;
  }
);

export { Input };
