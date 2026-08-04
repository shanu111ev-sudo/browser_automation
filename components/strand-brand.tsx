import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

/** Product mark for Strand — logo at `public/brand/logo.png`. */
export function StrandBrand({
  className,
  showWordmark = true,
}: {
  className?: string
  showWordmark?: boolean
}) {
  return (
    <Link
      href="/"
      className={cn(
        "flex min-w-0 items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <Image
        src="/brand/logo.png"
        alt="Strand"
        width={28}
        height={28}
        className="size-7 shrink-0 object-contain"
        priority
      />
      {showWordmark && (
        <span className="truncate text-sm font-semibold tracking-tight">
          Strand
        </span>
      )}
    </Link>
  )
}
