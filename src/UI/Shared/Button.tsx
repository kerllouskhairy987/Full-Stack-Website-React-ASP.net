import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/Utils";

const buttonVariants = cva(
  "rounded-md font-medium text-white duration-300  disabled:cursor-not-allowed flex items-center justify-center",
  {
    variants: {
      variant: {
        default:
          "text-white text-[16px] font-bold  bg-[#031f47] hover:opacity-90 rounded-md px-[20px] py-[10px] md:px-[31px] md:py-[10px]",

        outline:
          " text-[#031f47]  text-[16px] font-bold border border-[#031f47] rounded-md px-[20px] py-[10px] md:px-[31px] md:py-[10px]",
      },
      size: {
        default: "",
        sm: "text-sm px-4 py-2",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button";
}

const Button = ({
  type = "button",
  variant,
  size,
  fullWidth,
  className,
  children,
  isLoading,
  disabled,
  ...props
}: ButtonProps & { disabled?: boolean }) => {
  return (
    <button
      type={type}
      disabled={isLoading || disabled} // هنا يتم التحكم في الخاصية disabled
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-5 w-5 text-white mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};


export default Button;
