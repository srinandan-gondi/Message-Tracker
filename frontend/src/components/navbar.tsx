// import { Button } from "@nextui-org/button";
// import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
// import { Input } from "@nextui-org/input";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
// import { link as linkStyles } from "@nextui-org/theme";
// import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  GithubIcon,
} from "@/components/icons";
import { Logo } from "@/components/icons";

export const Navbar = () => {


  return (
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand className="gap-3 max-w-fit">
            <Link
                className="flex justify-start items-center gap-1"
                color="foreground"
                href="/"
            >
              <Logo />
              <p className="font-bold text-inherit">Message Tracker</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent
            className="hidden sm:flex basis-1/5 sm:basis-full"
            justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <Link isExternal href={siteConfig.links.github} title="GitHub">
              <GithubIcon className="text-default-500" />
            </Link>
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>


      </NextUINavbar>
  );
};