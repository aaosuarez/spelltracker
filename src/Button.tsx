import React from "react";

export enum ButtonType {
  Fill,
  Outline,
}

type ButtonProps = {
  className?: string;
  type?: ButtonType;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => unknown;
};

const ButtonTypeStyles = {
  [ButtonType.Fill]: "border-white bg-purple-500 text-white",
  [ButtonType.Outline]: "border-purple-500 bg-white text-purple-500",
};

const Button = ({
  className,
  type = ButtonType.Fill,
  ...props
}: ButtonProps) => {
  const buttonStyles = ButtonTypeStyles[type];
  return (
    <button
      className={`py-2 px-2 rounded border ${buttonStyles} ${className}`}
      {...props}
    />
  );
};

export default Button;
