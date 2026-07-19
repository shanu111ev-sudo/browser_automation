"use server";

import { auth } from "@clerk/nextjs/server"
import { createWorkflow } from "@/features/workflows/data"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export async function createWorkflowAction(name: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  // Sentry.getIsolationScope().setAttributes({
  //   action: "createWorkflowAction",
  //   orgId,
  // })

  const workflow = await createWorkflow(orgId, name)

  // Sentry.logger.info("Workflow created", { workflowId: workflow.id, orgId })

  revalidatePath("/workflows", "layout")
  redirect(`/workflows/${workflow.id}`)
}
