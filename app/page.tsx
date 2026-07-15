import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

export default function Page() {
  return (
    <main className="flex min-h-svh flex-col items-start gap-3 p-6">
      <UserButton />
      <OrganizationSwitcher />
    </main>
  )
}
