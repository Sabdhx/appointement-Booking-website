"use client"
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useRouter } from 'next/navigation';

function Navbar() {
  const route = useRouter()
  return (
    <div>
        <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Authentication</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink onClick={()=>route.push("/Authentication/SignIn")}>Sign In</NavigationMenuLink>
                    <NavigationMenuLink onClick={()=>route.push("/Authentication/Registration")}>Registration</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
    </div>
  )
}
export default Navbar