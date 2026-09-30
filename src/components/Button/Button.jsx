export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  const variantClass = variant === "primary" ? "" : ` button_${variant}`;

  return (
    <button
      className={`button${variantClass}${className ? ` ${className}` : ""}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
