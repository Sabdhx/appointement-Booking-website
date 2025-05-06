"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { redirect, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

function Navbar() {
  const route = useRouter();
  const session = useSession();

  return (
    <div>
      {session?.data?.user ? (
        session.data.user.role === "admin" ? (
          <>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger onClick={() => redirect("/")}>Home</MenubarTrigger>
                <MenubarTrigger onClick={() => redirect("/admin/dashboard")}>Dashboard</MenubarTrigger>
                <MenubarTrigger onClick={() => redirect("/admin/reports")}>Reports</MenubarTrigger>
                <MenubarTrigger onClick={() => redirect("/admin/users")}>Users</MenubarTrigger>
                <MenubarTrigger onClick={() => redirect("/admin/categories")}>Categories</MenubarTrigger>
                <MenubarTrigger onClick={() => signOut({ callbackUrl: "/" })}>Logout</MenubarTrigger>
              </MenubarMenu>
            </Menubar>
          </>
        ) : (
          <>
            <Menubar>
              <MenubarMenu>
                {session.data.user.role === "provider" ? (
                  <>
                    <MenubarTrigger onClick={() => redirect("/")}>Home</MenubarTrigger>
                    <MenubarTrigger onClick={() => redirect("/Provider/Dashboard")}>Dashboard</MenubarTrigger>
                    <MenubarTrigger onClick={() => redirect("/Provider/PostCreationPage")}>Post Creation</MenubarTrigger>
                    <MenubarTrigger onClick={() => redirect("/List")}>List</MenubarTrigger>
                    <MenubarTrigger onClick={() => signOut({ callbackUrl: "/" })}>Logout</MenubarTrigger>
                  </>
                ) : (
                  <>
                    <MenubarTrigger onClick={() => redirect("/")}>Home</MenubarTrigger>
                    <MenubarTrigger onClick={() => redirect("/List")}>List</MenubarTrigger>
                    <MenubarTrigger onClick={() => redirect("/normalUser/Dashboard")}>Dashboard</MenubarTrigger>
                    <MenubarTrigger onClick={() => signOut({ callbackUrl: "/" })}>Logout</MenubarTrigger>
                  </>
                )}
              </MenubarMenu>
            </Menubar>
          </>
        )
      ) : (
        <>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Authentication</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink onClick={() => route.push("/Authentication/SignIn")}>
                    Sign In
                  </NavigationMenuLink>
                  <NavigationMenuLink onClick={() => route.push("/Authentication/Registration")}>
                    Registration
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </>
      )}
    </div>
  );
}

export default Navbar;
