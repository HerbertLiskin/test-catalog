export function Divider({ text }: { text: string }) {
  return (
    <div className="flex w-full items-center gap-2.5">
      <div className="h-px flex-1 bg-divider" />
      <span className="text-base font-medium leading-[1.5] text-divider">
        {text}
      </span>
      <div className="h-px flex-1 bg-divider" />
    </div>
  )
}
