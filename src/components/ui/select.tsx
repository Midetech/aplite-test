import * as React from "react";
import { cn } from "@/lib/utils";

// Context for managing select state
interface SelectContextProps {
  value: string;
  setValue: (value: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}
const SelectContext = React.createContext<SelectContextProps | undefined>(
  undefined
);

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}
export function Select({ value, onValueChange, children }: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  const contextValue = React.useMemo(
    () => ({
      value,
      setValue: onValueChange,
      open,
      setOpen,
      triggerRef,
      contentRef,
    }),
    [value, onValueChange, open]
  );

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !contentRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  // Keyboard navigation: close on Escape
  React.useEffect(() => {
    if (!open) return;
    function handle(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open]);

  return (
    <SelectContext.Provider value={contextValue}>
      {children}
    </SelectContext.Provider>
  );
}

interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectTriggerProps
>(({ className, children, ...props }, ref) => {
  const ctx = React.useContext<SelectContextProps | undefined>(SelectContext);
  if (!ctx) throw new Error("SelectTrigger must be used within a Select");
  return (
    <button
      type="button"
      ref={(node) => {
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
            node;
        ctx.triggerRef.current = node;
      }}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      aria-haspopup="listbox"
      aria-expanded={ctx.open}
      onClick={() => ctx.setOpen((o: boolean) => !o)}
      {...props}
    >
      {children}
      <svg
        className="ml-2 h-4 w-4 text-muted-foreground"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M6 8l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export const SelectContent = React.forwardRef<
  HTMLDivElement,
  SelectContentProps
>(({ className, children, ...props }, ref) => {
  const ctx = React.useContext<SelectContextProps | undefined>(SelectContext);
  if (!ctx) throw new Error("SelectContent must be used within a Select");
  if (!ctx.open) return null;
  return (
    <div
      ref={(node) => {
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        ctx.contentRef.current = node;
      }}
      className={cn(
        "absolute z-50 mt-1 w-full min-w-[8rem] rounded-md bg-popover border border-border shadow-lg focus:outline-none animate-in fade-in-0 slide-in-from-top-1",
        className
      )}
      tabIndex={-1}
      {...props}
    >
      <ul
        role="listbox"
        aria-activedescendant={ctx.value}
        className="max-h-60 overflow-auto py-1"
      >
        {children}
      </ul>
    </div>
  );
});
SelectContent.displayName = "SelectContent";

interface SelectItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  value: string;
  children: React.ReactNode;
}
export const SelectItem = React.forwardRef<HTMLLIElement, SelectItemProps>(
  ({ value, className, children, ...props }, ref) => {
    const ctx = React.useContext<SelectContextProps | undefined>(SelectContext);
    if (!ctx) throw new Error("SelectItem must be used within a Select");
    const selected = ctx.value === value;
    return (
      <li
        ref={ref}
        role="option"
        aria-selected={selected}
        tabIndex={-1}
        className={cn(
          "cursor-pointer select-none px-3 py-2 text-base rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground md:text-sm",
          selected && "bg-accent text-accent-foreground",
          className
        )}
        onClick={() => {
          ctx.setValue(value);
          ctx.setOpen(false);
        }}
        {...props}
      >
        {children}
        {selected && (
          <svg
            className="ml-2 h-4 w-4 text-primary float-right"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M6 10l3 3 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </li>
    );
  }
);
SelectItem.displayName = "SelectItem";

interface SelectValueProps {
  placeholder?: string;
  className?: string;
}
export function SelectValue({ placeholder, className }: SelectValueProps) {
  const ctx = React.useContext<SelectContextProps | undefined>(SelectContext);
  if (!ctx) throw new Error("SelectValue must be used within a Select");
  const selected = ctx.value;
  return (
    <span className={cn("truncate text-left flex-1", className)}>
      {selected === "" ||
      selected === undefined ||
      selected === null ||
      selected === "all"
        ? placeholder || "Select..."
        : selected}
    </span>
  );
}
