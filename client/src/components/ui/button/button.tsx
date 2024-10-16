import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className }, ref) => {
    return (
      <button className={className} ref={ref}>
        Button
      </button>
    );
  }
);

export { Button };
