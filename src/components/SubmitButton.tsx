import { type } from 'os'
import { twMerge } from 'tailwind-merge'

interface SubmitButtonProps {
  text: string
  isLoading?: boolean
  align?: 'start' | 'center' | 'end'
  type: 'submit' | 'button'
}

export default function SubmitButton({
  text,
  isLoading,
  align,
  type,
}: SubmitButtonProps) {
  return (
    <button
      type={type}
      className={twMerge(
        'drop-shadow-yellow h-[56px] rounded-[500px] bg-primary px-16 text-[1.125rem] font-bold leading-[18px] text-gray-800',
        align === 'start' && 'self-start',
        align === 'center' && 'self-center',
        align === 'end' && 'self-end',
      )}
      disabled={isLoading}
    >
      {text}
    </button>
  )
}
