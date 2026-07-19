import { WorkflowShell } from "@/features/workflows/components/workflow-shell";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";


export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { orgId } = await auth();

  if (!orgId) {
    notFound();
  }

  return (
    <div className="h-full w-full p-4">
      <WorkflowShell workflowId={id} />
    </div>
  );
}