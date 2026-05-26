"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Portfólio", href: "/portfolio" },
  { label: "Sobre", href: "/#sobre" },
];

function NavHeader() {
  const pathname = usePathname();
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  // Listen to hash change for the "Sobre" anchor link
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    // Initial check
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <ul
      className="relative flex w-fit rounded-full border border-neutral-800 bg-black/80 backdrop-blur-md p-1 shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {navItems.map((item) => {
        let isActive = false;
        if (item.href === "/") {
          isActive = pathname === "/" && activeHash !== "#sobre";
        } else if (item.href === "/#sobre") {
          isActive = pathname === "/" && activeHash === "#sobre";
        } else {
          isActive = pathname === item.href;
        }

        return (
          <Tab
            key={item.label}
            setPosition={setPosition}
            href={item.href}
            isActive={isActive}
            isHovered={isHovered}
          >
            {item.label}
          </Tab>
        );
      })}

      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
  href,
  isActive,
  isHovered,
}: {
  children: React.ReactNode;
  setPosition: any;
  href: string;
  isActive: boolean;
  isHovered: boolean;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isActive && !isHovered && ref.current) {
      const updatePosition = () => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      };

      // Measure immediately
      updatePosition();

      // Measure again after layout settle to ensure precise position
      const timer = setTimeout(updatePosition, 100);

      window.addEventListener("resize", updatePosition);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isActive, isHovered, setPosition]);

  const handleClick = (e: React.MouseEvent) => {
    if (href === "/") {
      if (window.location.pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }
    } else if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (window.location.pathname === "/") {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        }
      }
    }
  };

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base font-medium transition-colors montserrat-regular"
    >
      <Link href={href} onClick={handleClick} className="block w-full h-full">
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-full bg-white md:h-12"
    />
  );
};

export default NavHeader;
