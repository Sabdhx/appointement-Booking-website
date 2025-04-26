"use client"
import { Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,} from '@/components/ui/menubar'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react';
import React from 'react'

type Props = {}

function UserRole({}: Props) {
  const session = useSession();
  console.log(session)
  return (
    <div>
       <Menubar>
  <MenubarMenu>
    <MenubarTrigger onClick={()=>redirect("/Provider/Dashboard")}>Dashboard</MenubarTrigger>
    <MenubarTrigger onClick={()=>redirect("/List")} >List</MenubarTrigger>
    <MenubarTrigger onClick={()=>redirect("/Provider/PostCreationPage")}>Post Creation</MenubarTrigger>
  </MenubarMenu>
</Menubar>
    </div>
  )
}

export default UserRole