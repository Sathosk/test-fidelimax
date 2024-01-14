import Image from 'next/image'

import arrowDownIcon from '@/assets/arrow-down.svg'

interface LoginMenuProps {
  userName: string
}

export default function LoginMenu({ userName }: LoginMenuProps) {
  return (
    <div className="flex items-center gap-4 font-semibold">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-lg leading-[18px]">
        {userName[0].toUpperCase()}
      </div>
      <span className="hidden text-[0.75rem] sm:inline-block ">{userName}</span>
      <button className="transition-all hover:opacity-80">
        <Image src={arrowDownIcon} alt="" />
      </button>
    </div>
  )
}
