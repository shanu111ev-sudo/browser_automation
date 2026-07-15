"use client"

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Plus, Workflow } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const workflows = [
  "dominant-wasp",
  "honest-reindeer",
  "expected-llama",
  "essential-ocelot",
  "creepy-echidna",
  "eastern-silkworm",
  "cultural-lion",
  "proud-weasel",
  "regional-bonobo",
]

export function AppSidebar() {
  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
    >
      <SidebarHeader className="gap-0 px-4 py-4 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2">
        <div className="flex h-9 items-center justify-between gap-0 group-data-[collapsible=icon]:hidden">
          <div className="min-w-0 flex-1">
            <OrganizationSwitcher
              hidePersonal
              appearance={{
                elements: {
                  rootBox: "max-w-50!",
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
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="h-9 px-3 text-base font-semibold text-[#a4a4a4]">
            Workflows
          </SidebarGroupLabel>
          <SidebarGroupAction
            aria-label="Create workflow"
            className="top-1.5 right-2 size-7 text-[#a4a4a4] hover:bg-white/10 hover:text-white"
          >
            <Plus className="size-4" />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {workflows.map((workflow, index) => (
                <SidebarMenuItem key={workflow}>
                  <SidebarMenuButton
                    isActive={index === 0}
                    className="h-9 rounded-lg px-3 text-sm font-medium text-[#d7d7d7] group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:text-xs hover:bg-[#282828] hover:text-white data-active:bg-[#282828] data-active:text-white"
                    tooltip={workflow}
                  >
                    <Workflow className="hidden size-4 group-data-[collapsible=icon]:block" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {workflow}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
