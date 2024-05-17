import React, { ReactNode } from "react";
import { Tooltip } from "antd";

interface ButtonProps {
  icon?: string;
  tooltipText?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  color?: string;
  block?: boolean;
  className?: string;
  children?: ReactNode;
}

export const ButtonCustom: React.FC<ButtonProps> = ({
  icon,
  tooltipText,
  onClick,
  disabled,
  type = "button",
  color = "default",
  block,
  className,
  children,
}) => {
  return (
    <Tooltip title={tooltipText}>
      <span>
        <button
          disabled={disabled}
          type={type}
          onClick={onClick}
          className={`btn btn-${color} ${className ? className : ""} ${
            block ? "d-block w-100" : ""
          }`}
        >
          {children || <i className={`fas ${icon}`}></i>}
        </button>
      </span>
    </Tooltip>
  );
};
