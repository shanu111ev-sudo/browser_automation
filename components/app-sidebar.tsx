import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { WorkflowNav } from "@/features/workflows/components/workflow-nav"

export function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="gap-0 px-4 py-4 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2">
        <div className="flex h-9 items-center justify-between gap-0 group-data-[collapsible=icon]:hidden">
          <div className="min-w-0 flex-1">
            <OrganizationSwitcher
              hidePersonal
              appearance={{
                elements: {
                  rootBox: "w-full! min-w-0!",
                  organizationSwitcherTrigger:
                    "w-full min-w-0 justify-start gap-2 px-0 text-[#a4a4a4] hover:bg-transparent",
                  organizationPreview: "min-w-0",
                  organizationPreviewAvatarBox: "size-7 shrink-0",
                  organizationPreviewTextContainer: "min-w-0",
                  organizationPreviewMainIdentifier:
                    "truncate text-sm font-semibold text-[#a4a4a4]",
                  organizationSwitcherTriggerIcon:
                    "size-4 shrink-0 text-[#a4a4a4]",
                },
              }}
            />
          </div>
          {/* <SidebarTrigger className="size-2 shrink-0 text-[#a4a4a4] group-data-[collapsible=icon]:hidden hover:bg-white/10 hover:text-white text-right" /> */}
        </div>
        <div className="hidden h-9 w-full items-center justify-center group-data-[collapsible=icon]:flex">
          <OrganizationSwitcher
            hidePersonal
            appearance={{
              elements: {
                rootBox:
                  "flex size-8 items-center justify-center overflow-hidden [&_.cl-organizationPreviewTextContainer]:hidden [&_.cl-organizationSwitcherTriggerIcon]:hidden",
                organizationSwitcherTrigger:
                  "flex size-8 items-center justify-center gap-0 p-0 text-[#a4a4a4] hover:bg-[#282828]",
                organizationPreview: "flex items-center justify-center",
                organizationPreviewAvatarBox: "size-7 shrink-0",
                organizationPreviewTextContainer: "hidden",
                organizationSwitcherTriggerIcon: "hidden",
              },
            }}
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 group-data-[collapsible=icon]:px-2">
        <WorkflowNav />
      </SidebarContent>

      <SidebarFooter className="px-4 py-5 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2">
        <UserButton
          showName
          appearance={{
            elements: {
              userButtonBox:
                "gap-2 text-sm font-semibold text-[#d7d7d7] group-data-[collapsible=icon]:gap-0",
              userButtonAvatarBox: "size-8",
              userButtonOuterIdentifier:
                "truncate group-data-[collapsible=icon]:hidden",
            },
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
