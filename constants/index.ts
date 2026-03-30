// First, import the needed Lucide icons
import { 

  Menu, 
  Folder, 
  Users, 
  LayoutDashboardIcon,
  BarChart2Icon
} from "lucide-react";

export const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboardIcon
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: Menu 
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChart2Icon
    },
    {
      title: "Projects",
      url: "#",
      icon: Folder
    },
    {
      title: "Team",
      url: "#",
      icon: Users
    },
  ],
};