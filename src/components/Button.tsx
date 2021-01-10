import React from "react";

export enum ButtonType {
  FILL,
  OUTLINE,
}

type ButtonProps = {
  className?: string;
  type?: ButtonType;
  size?: ButtonSizes;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => unknown;
  disabled?: boolean;
};

const ButtonTypeStyles = {
  [ButtonType.FILL]:
    "border-white bg-gradient-to-r from-purple-500 to-purple-700 text-white",
  [ButtonType.OUTLINE]: "border-purple-500 bg-white text-purple-500",
};

export enum ButtonSizes {
  NONE,
  SMALL,
}

const ButtonSizeStyles = {
  [ButtonSizes.NONE]: "p-2",
  [ButtonSizes.SMALL]: "text-xs px-2 py-1",
};

const Button = ({
  className = "",
  type = ButtonType.FILL,
  size = ButtonSizes.NONE,
  disabled,
  children,
  onClick,
}: ButtonProps) => {
  const buttonTypeStyle = ButtonTypeStyles[type];
  const buttonSizeStyle = ButtonSizeStyles[size];
  const disabledStyle = disabled && "disabled:opacity-50";
  return (
    <button
      className={`rounded border ${buttonTypeStyle} ${buttonSizeStyle} ${disabledStyle} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
