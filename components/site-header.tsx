import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeSwitcher } from "./theme/mode-toggle"

export function SiteHeader() {
  return (
   <header className="flex h-(--header-height) shrink-0 items-center justify-between border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
  
  {/* Left side */}
  <div className="flex items-center gap-2 px-4 lg:px-6">
    <SidebarTrigger className="-ml-1" />

    <Separator
      orientation="vertical"
      className="mx-2 h-4"
    />

    <h1 className="text-base font-medium">Documents</h1>
  </div>

  {/* Right side */}
  <div className="px-4 lg:px-6">
    <ThemeSwitcher />
  </div>

</header>
  )
}
