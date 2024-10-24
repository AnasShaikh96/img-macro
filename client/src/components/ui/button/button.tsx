import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, className, ...props }, ref) => {
    return (
      <button className={className} ref={ref} {...props}>
        {text}
      </button>
    );
  }
);

export { Button };
