import { Plus, Workflow } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function Page() {
  return (
    <div className="flex min-h-svh bg-[#181818] text-white">
      <Empty className="gap-5 rounded-none border-0 p-6">
        <EmptyHeader className="max-w-md gap-3">
          <EmptyMedia className="mb-2 size-12 rounded-xl bg-[#282828] text-white">
            <Workflow className="size-6 stroke-[2.5]" />
          </EmptyMedia>
          <EmptyTitle className="text-2xl leading-none font-semibold tracking-normal text-white">
            No workflow selected
          </EmptyTitle>
          <EmptyDescription className="max-w-md text-lg leading-8 font-normal text-[#a4a4a4]">
            Select a workflow from the sidebar
            <br />
            or create a new one to get started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            size="lg"
            className="h-11 gap-2.5 rounded-lg bg-[#eeeeee] px-5 text-base font-semibold text-[#1d1d1d] hover:bg-white cursor-pointer"
          >
            <Plus className="size-5 stroke-[2.5]" />
            New workflow
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
