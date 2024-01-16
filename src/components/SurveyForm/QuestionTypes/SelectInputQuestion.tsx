import Image from 'next/image'
import { useState } from 'react'

import arrowDownDarkIcon from '@/assets/arrow-down-dark.svg'
import { QuestionOptionsType } from '@/services/survey'

import { HandleInputChangeType } from '../DynamicSurveyForm'

interface SelectInputQuestionProps {
  id: number
  question: string
  answerValue?: number | undefined
  mandatory?: boolean
  options: QuestionOptionsType[] | undefined
  handleChange: HandleInputChangeType
}

export default function SelectInputQuestion({
  id,
  question,
  answerValue,
  mandatory,
  options,
  handleChange,
}: SelectInputQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | number>('')

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(Number(e.target.value), id)
    setSelectedOption(e.target.value)
  }

  return (
    <div className="relative">
      <Image
        src={arrowDownDarkIcon}
        alt=""
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 transform"
      />
      <select
        required={mandatory}
        name={`select${id}`}
        id={`select${id}`}
        value={answerValue !== undefined ? answerValue : selectedOption}
        onChange={handleOptionChange}
        className="h-[56px] w-full resize-none appearance-none rounded-lg border-[1px] border-gray-400 p-4 text-gray-500 outline outline-0 focus:border-2 focus:border-gray-500 focus:outline-0"
      >
        <option value="" disabled hidden>
          {question}
        </option>
        {options?.map(({ value, description }) => (
          <option key={value} value={value}>
            {description}
          </option>
        ))}
      </select>
    </div>
  )
}
