"use client"

import { Plus, Workflow } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
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

export function WorkflowNav() {
  const { state } = useSidebar()

  if (state === "collapsed") {
    return (
      <SidebarGroup className="p-0">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Popover>
                <PopoverTrigger asChild>
                  <SidebarMenuButton aria-label="Workflows" className="mx-auto">
                    <Workflow />
                  </SidebarMenuButton>
                </PopoverTrigger>
                <PopoverContent side="right" align="start">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton className="mb-2">
                        <Plus className="size-4" /> New workflow
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <Separator className="mb-2" />
                    {workflows.map((workflow, index) => (
                      <SidebarMenuItem key={workflow}>
                        <SidebarMenuButton isActive={index === 0}>
                          <span>{workflow}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </PopoverContent>
              </Popover>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  return (
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
                className="h-9 rounded-lg px-3 text-sm font-medium text-[#d7d7d7] hover:bg-[#282828] hover:text-white data-active:bg-[#282828] data-active:text-white"
                tooltip={workflow}
              >
                <span>{workflow}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
