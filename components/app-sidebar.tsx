"use client";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { SignInButtonClerk } from "./clerk-sign-button/Sign-in-button";
import JournalSidebarList from "@/modules/editor/ui/all-journal";
import Image from "next/image";
import Link from "next/link";
import { PenLine } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>

      {/* HEADER — logo */}
      <SidebarHeader className="px-4 pt-5 pb-3">
        <Link href="/" className="block">
          <Image
            src="/logo2.png"
            alt="InkFlow"
            width={130}
            height={52}
            className="h-12 w-auto object-contain"
          />
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      {/* NEW ENTRY button */}
    

      {/* CONTENT — journal list */}
      <SidebarContent className="px-1 my-2">
        <JournalSidebarList />
      </SidebarContent>

      <SidebarSeparator />

      {/* FOOTER — user / sign in */}
      <SidebarFooter className="px-3 py-3">
        <SignInButtonClerk />
      </SidebarFooter>

    </Sidebar>
  );
}