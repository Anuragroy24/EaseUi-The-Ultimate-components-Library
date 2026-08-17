import { Slot } from "@radix-ui/react-slot";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/libs/utils";
import { entranceAnimations } from "@/libs/animations/entranceAnimation";
import { hoverAnimations } from "@/libs/animations/hoverAnimation";
import gsap from "gsap";
import { Button } from "../Button";

const navbarVariants = cva(
  "relative w-full flex items-center justify-between px-6 py-4 rounded-md border transition-all",
  {
    variants: {
      variant: {
        dark: "bg-slate-900 text-white border-slate-700",
        light: "bg-white text-gray-800 shadow border-gray-200",
        primary: "bg-indigo-600 text-white border-indigo-500",
        glass:
          "backdrop-blur-md bg-white/10 text-white border-white/20 shadow-lg",
      },
      size: {
        default: "h-16",
        sm: "h-12 px-4",
        lg: "h-20 px-8",
        xl: "h-24 px-10",
      },
      sticky: {
        true: "sticky top-0 z-40",
        false: "",
      },
    },
    defaultVariants: {
      variant: "light",
      size: "default",
      sticky: false,
    },
  }
);

const linkVariants = cva(
  "text-sm font-medium transition-colors cursor-pointer hover:opacity-80",
  {
    variants: {
      variant: {
        dark: "text-gray-300 hover:text-white",
        light: "text-gray-600 hover:text-gray-900",
        primary: "text-indigo-100 hover:text-white",
        glass: "text-white/80 hover:text-white",
      },
      active: {
        true: "font-semibold opacity-100",
        false: "",
      },
    },
    defaultVariants: {
      variant: "light",
      active: false,
    },
  }
);

export interface NavLink {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

interface NavbarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navbarVariants> {
  asChild?: boolean;
  logo?: React.ReactNode;
  links?: NavLink[];
  actions?: React.ReactNode;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  animation?: keyof typeof entranceAnimations;
  hoverAnimation?: keyof typeof hoverAnimations;
}

const Navbar = forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      variant = "light",
      size,
      sticky,
      asChild = false,
      logo = "Logo",
      links = [],
      actions,
      showSearch = false,
      searchPlaceholder = "Search...",
      onSearch,
      animation = "fadeIn",
      hoverAnimation = "none",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "nav";
    const navbarRef = useRef<HTMLElement | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
      if (!navbarRef.current || animation === "none") return;
      entranceAnimations[animation]?.(navbarRef.current);
    }, [animation]);

    const handleMouseEnter = () => {
      if (!navbarRef.current || hoverAnimation === "none") return;
      hoverAnimations[hoverAnimation]?.(navbarRef.current);
    };

    const handleMouseLeave = () => {
      if (!navbarRef.current || hoverAnimation === "none") return;
      hoverAnimations.reset(navbarRef.current);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
      onSearch?.(event.target.value);
    };

    const searchInputClass =
      variant === "light"
        ? "bg-gray-50 border-gray-200 text-gray-700 placeholder-gray-400"
        : "bg-white/10 border-white/20 text-inherit placeholder-white/60";

    const renderLink = (link: NavLink, mobile = false) => {
      const linkClass = cn(
        linkVariants({ variant, active: link.active }),
        mobile && "block py-2 text-base"
      );

      if (link.href) {
        return (
          <a
            key={link.label}
            href={link.href}
            className={linkClass}
            onClick={() => mobile && setMobileOpen(false)}
          >
            {link.label}
          </a>
        );
      }

      return (
        <button
          key={link.label}
          type="button"
          className={linkClass}
          onClick={() => {
            link.onClick?.();
            if (mobile) setMobileOpen(false);
          }}
        >
          {link.label}
        </button>
      );
    };

    return (
      <Comp
        ref={(node) => {
          navbarRef.current = node as HTMLElement;
          if (typeof ref === "function") ref(node as HTMLElement);
          else if (ref)
            (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn(navbarVariants({ variant, size, sticky }), className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className="flex items-center gap-6 min-w-0">
          <div className="font-bold text-lg shrink-0">{logo}</div>

          {showSearch && (
            <div
              className={cn(
                "hidden md:flex items-center rounded-md px-3 py-1.5 border",
                searchInputClass
              )}
            >
              <Search size={16} className="opacity-70 shrink-0" />
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder={searchPlaceholder}
                className="ml-2 bg-transparent outline-none text-sm w-40 lg:w-52"
              />
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-6">
          {links.length > 0 && (
            <div className="flex items-center gap-5">
              {links.map((link) => renderLink(link))}
            </div>
          )}
          {actions}
        </div>

        <button
          type="button"
          className="md:hidden p-2 rounded-md hover:bg-black/5 transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {mobileOpen && (
          <div
            className={cn(
              "absolute left-0 right-0 top-full mt-2 mx-4 p-4 rounded-lg border shadow-lg md:hidden flex flex-col gap-3",
              variant === "light"
                ? "bg-white border-gray-200"
                : variant === "primary"
                  ? "bg-indigo-700 border-indigo-500"
                  : variant === "glass"
                    ? "backdrop-blur-md bg-slate-900/90 border-white/20"
                    : "bg-slate-900 border-slate-700"
            )}
          >
            {showSearch && (
              <div
                className={cn(
                  "flex items-center rounded-md px-3 py-2 border",
                  searchInputClass
                )}
              >
                <Search size={16} className="opacity-70 shrink-0" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder={searchPlaceholder}
                  className="ml-2 bg-transparent outline-none text-sm w-full"
                />
              </div>
            )}

            {links.map((link) => renderLink(link, true))}

            {actions && (
              <div className="pt-2 border-t border-current/10">{actions}</div>
            )}
          </div>
        )}
      </Comp>
    );
  }
);

Navbar.displayName = "Navbar";

export { Navbar, navbarVariants };
