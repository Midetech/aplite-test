import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(!!checked);
    React.useEffect(() => {
      if (typeof checked === "boolean") setInternalChecked(checked);
    }, [checked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      setInternalChecked(e.target.checked);
      onCheckedChange?.(e.target.checked);
      props.onChange?.(e);
    };

    return (
      <label
        className={cn(
          "peer inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          internalChecked ? "bg-green-600" : "bg-gray-700",
          className,
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input
          type="checkbox"
          ref={ref}
          className="sr-only"
          checked={internalChecked}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        <span
          className={cn(
            "block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform bg-white",
            internalChecked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </label>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
