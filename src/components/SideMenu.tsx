"use client"
import { useState } from "react"
import { cn } from "src/libs/utils"
import { ResizablePanel, ResizablePanelGroup } from "src/components/ui/resizable"
import { Separator } from "src/components/ui/separator"

export const SideMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(isCollapsed)}`
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
      }}
      className="h-full max-h-[800px] items-stretch"
    >
      <ResizablePanel
        defaultSize={265}
        collapsedSize={4}
        collapsible={true}
        minSize={15}
        maxSize={20}
        onCollapse={handleCollapse}
        className={cn(
          isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out",
        )}
      >
        <div
          className={cn(
            "flex h-[52px] items-center justify-center",
            isCollapsed ? "h-[52px]" : "px-2",
          )}
        ></div>
        <Separator />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
