import "./Button.css";

import type {
    ButtonHTMLAttributes,
    MouseEventHandler,
} from "react";

import {
    BaseComponentProps,
    Size,
    Variant,
    classNames,
    getTestProps,
} from "../common";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">,
    BaseComponentProps {
  /**
   * Button style.
   */
  variant?: Variant;

  /**
   * Button size.
   */
  size?: Size;

  /**
   * Shows loading state and disables the button.
   */
  loading?: boolean;

  /**
   * Expands to fill parent width.
   */
  fullWidth?: boolean;

  /**
   * Click handler.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Button({
  children,

  className,
  style,
  dataTest,

  ariaLabel,
  ariaDescribedBy,
  ariaBusy,
  ariaDisabled,

  variant = "primary",
  size = "md",

  loading = false,
  fullWidth = false,

  disabled,

  onClick,

  type = "button",

  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      {...getTestProps(dataTest)}
      type={type}
      style={style}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-busy={loading || ariaBusy}
      aria-disabled={disabled || loading || ariaDisabled}
      className={classNames(
        "btn",
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth && "btn-full-width",
        loading && "btn-loading",
        className
      )}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;
