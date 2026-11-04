"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { getPersonalInfo, getSocialLinks } from "@/lib/config";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const personalInfo = getPersonalInfo();
  const socialLinks = getSocialLinks();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <motion.header
      className="fixed top-0 z-40 w-full border-b border-border/70 bg-background/85 backdrop-blur-xl"
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight sm:text-lg"
          onClick={closeMenu}
        >
          <motion.span
            className="flex gap-2 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              className="h-8 w-8"
              src="/imran-logo.svg"
              alt=""
              width={32}
              height={32}
            />
            {personalInfo.name.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-primary">
              {personalInfo.name.split(" ").at(-1) || ""}
            </span>
          </motion.span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Button
                  variant="ghost"
                  asChild
                  className="rounded-lg px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <Link href={item.href} onClick={closeMenu}>
                    {item.label}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="block lg:hidden"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-75 flex flex-col p-0 backdrop-blur-xl bg-background/90"
            >
              <SheetHeader className="p-6 border-b">
                <SheetTitle className="text-left flex items-center gap-2">
                  <div className="flex gap-2 items-center">
                    <Image
                      className="h-8 w-8"
                      src="/imran-logo.svg"
                      alt=""
                      width={32}
                      height={32}
                    />
                    <span className="text-xl font-bold">
                      {personalInfo.name.split(" ").slice(0, -1).join(" ")}{" "}
                      <span className="text-primary">
                        {personalInfo.name.split(" ").at(-1) || ""}
                      </span>
                    </span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col p-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <Button
                      variant="ghost"
                      asChild
                      className="w-full justify-start text-lg py-6 font-medium"
                      onClick={closeMenu}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </Button>
                  </motion.div>
                ))}
              </nav>

              <SheetFooter className="mt-auto p-6 border-t flex-row justify-center gap-4 sm:justify-start">
                {socialLinks.map((social) => {
                  const Icon =
                    social.platform === "GitHub"
                      ? FaGithub
                      : social.platform === "LinkedIn"
                        ? FaLinkedinIn
                        : social.platform === "Mail"
                          ? FaEnvelope
                          : FaWhatsapp;
                  return (
                    <Button
                      key={social.platform}
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      asChild
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.platform}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </a>
                    </Button>
                  );
                })}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
