"use server"

import { auth } from "@clerk/nextjs/server"
import { createWorkflow } from "@/features/workflows/data"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { helloWorldTask } from "@/trigger/example"
import { tasks } from "@trigger.dev/sdk"

export async function createWorkflowAction(name: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  const workflow = await createWorkflow(orgId, name)

  revalidatePath("/workflows", "layout")
  redirect(`/workflows/${workflow.id}`)
}

export async function runWorkflowAction() {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", {
    message: "Hello sir!",
  })

  return handle
}
