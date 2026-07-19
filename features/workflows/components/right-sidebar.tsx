"use client"

import { PlayIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { runWorkflowAction } from "@/features/workflows/actions"

interface RightSidebarProps {
  workflowId: string
}

export function RightSidebar({ workflowId }: RightSidebarProps) {

  
  return (
    <div className="flex h-full items-center justify-center">
      <Button onClick={() => runWorkflowAction()}>
        <PlayIcon className="size-4" />
        Run
      </Button>
    </div>
  )
}
