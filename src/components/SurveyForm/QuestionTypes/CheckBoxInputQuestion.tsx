import { useState } from 'react'

import { QuestionOptionsType } from '@/services/survey'

import { HandleInputChangeType } from '../DynamicSurveyForm'

interface CheckBoxInputQuestionProps {
  id: number
  description: string
  answerValue?: number[]
  mandatory?: boolean
  options?: QuestionOptionsType[]
  handleChange: HandleInputChangeType
  toggleSetCheckboxRequired: (id: number) => void
}

export default function CheckBoxInputQuestion({
  description,
  id,
  answerValue,
  mandatory,
  options,
  handleChange,
  toggleSetCheckboxRequired,
}: CheckBoxInputQuestionProps) {
  const [checkedOptions, setCheckedOptions] = useState<number[]>([])

  console.log(checkedOptions)

  function handleCheckboxChange(value: number, id: number) {
    let newCheckedOptions = [...checkedOptions]

    if (newCheckedOptions.includes(value)) {
      newCheckedOptions = newCheckedOptions.filter((option) => option !== value)
    } else {
      newCheckedOptions.push(value)
    }

    setCheckedOptions(newCheckedOptions)
    handleChange(newCheckedOptions, id)

    if (mandatory) {
      toggleSetCheckboxRequired(id)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="pb-2 leading-4 text-gray-800">{description}</p>
      {options &&
        options.map(({ value, description }, index) => (
          <div
            key={`checkbox${index}${id}`}
            className="flex items-center gap-2"
          >
            <input
              type="checkbox"
              name={`checkbox${index}${id}`}
              id={`checkbox${index}${id}`}
              value={value}
              defaultChecked={answerValue?.includes(value)}
              onChange={(e) => handleCheckboxChange(+e.target.value, id)}
              className="h-4 w-4 border-2"
            />
            <label
              htmlFor={`checkbox${index}${id}`}
              className="text-[0.875rem] leading-[14px]"
            >
              {description}
            </label>
          </div>
        ))}
    </div>
  )
}
