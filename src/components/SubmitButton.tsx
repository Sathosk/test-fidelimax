import { twMerge } from 'tailwind-merge'

import Spinner from './Spinner'

interface SubmitButtonProps {
  text: string
  type: 'submit' | 'button'
  isLoading?: boolean
  color?: 'yellow' | 'green' | 'red' | 'dark-gray'
  align?: 'start' | 'center' | 'end'
  onClick?: () => void
}

export default function SubmitButton({
  text,
  isLoading,
  align,
  color = 'yellow',
  type,
  onClick,
}: SubmitButtonProps) {
  return (
    <button
      type={type}
      className={twMerge(
        'relative h-[56px] rounded-[500px] px-16 text-[1.125rem] font-bold leading-[18px] text-gray-800',
        align === 'start' && 'self-start',
        align === 'center' && 'self-center',
        align === 'end' && 'self-end',
        color === 'yellow' && 'bg-primary drop-shadow-yellow',
        color === 'green' && 'bg-success px-6 drop-shadow-green',
        color === 'red' && 'bg-danger px-6 drop-shadow-red',
        color === 'dark-gray' &&
          'bg-gray-800 px-6 text-white drop-shadow-dark-gray',
      )}
      disabled={isLoading}
      onClick={onClick}
    >
      <span className={isLoading ? 'invisible' : ''}>{text}</span>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </button>
  )
}
