import type { InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={[
        "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900",
        "outline-none transition placeholder:text-slate-400",
        "focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
        "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500",
        className,
      ].join(" ")}
      {...props}
    />
  );
}