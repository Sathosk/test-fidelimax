import { twMerge } from 'tailwind-merge'

interface WrapperProps {
  children: React.ReactNode
  className?: string
}

export default function Wrapper({ children, className }: WrapperProps) {
  return (
    <div className={twMerge('mx-auto flex w-11/12 max-w-[1440px]', className)}>
      {children}
    </div>
  )
}
