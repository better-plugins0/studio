import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
      {...props}
    >
      <rect width="40" height="40" rx="8" fill="currentColor" />
      <path
        d="M12 10V30H20C24.4183 30 28 26.4183 28 22V18C28 13.5817 24.4183 10 20 10H12Z"
        fill="#1A202C"
      />
      <path
        d="M12 10V30H20C24.4183 30 28 26.4183 28 22V18C28 13.5817 24.4183 10 20 10H12Z"
        fillOpacity="0.3"
        fill="url(#paint0_linear_logo)"
      />
      <path d="M19 15V25H21C22.6569 25 24 23.6569 24 22V18C24 16.3431 22.6569 15 21 15H19Z" fill="white" />
      <defs>
        <linearGradient
          id="paint0_linear_logo"
          x1="12"
          y1="10"
          x2="28"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.5" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
