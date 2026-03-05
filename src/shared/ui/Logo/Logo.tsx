import Image from 'next/image'

export function Logo() {
  return (
    <div
      className="flex size-[52px] items-center justify-center rounded-full border border-[rgba(237,237,237,0.7)]"
      style={{
        backgroundImage:
          'linear-gradient(0deg, rgba(35,35,35,0) 50%, rgba(35,35,35,0.06) 100%), linear-gradient(90deg, #fff 0%, #fff 100%)',
        boxShadow: '0 0 0 2px white, 0 12px 8px 0 rgba(0,0,0,0.03)',
      }}
    >
      <Image src="/icons/logo.svg" alt="Logo" width={35} height={34} />
    </div>
  )
}
