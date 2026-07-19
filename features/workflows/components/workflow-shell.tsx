import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

// import { Canvas } from "./canvas"
// import { ConsolePanel } from "./console-panel"
// import { RightSidebar } from "./right-sidebar"

interface WorkflowShellProps {
  workflowId: string
}

export function WorkflowShell({ workflowId }: WorkflowShellProps) {
  return (
    <ResizablePanelGroup orientation="horizontal" className="size-full">

      <ResizablePanel minSize="30rem">
        <ResizablePanelGroup orientation="vertical">

          <ResizablePanel minSize="18rem">
            {/* <Canvas /> */}
            <div>
              Canvas
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize="8rem" minSize="6rem">
            {/* <ConsolePanel /> */}
            <div>
              Console Panel
            </div>
          </ResizablePanel>

        </ResizablePanelGroup>
      
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize="16rem" minSize="14rem" maxSize="36rem">
        {/* <RightSidebar workflowId={workflowId} /> */}
        <div>
          Right Sidebar
        </div>
      </ResizablePanel>

    </ResizablePanelGroup>
  )
}