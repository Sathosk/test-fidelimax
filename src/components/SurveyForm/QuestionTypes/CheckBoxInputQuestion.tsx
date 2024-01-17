import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { QuestionOptionsType } from '@/services/survey'

import { HandleInputChangeType } from '../DynamicSurveyForm'

interface CheckBoxInputQuestionProps {
  id: number
  description: string
  answerValue?: number[]
  horizontal?: boolean
  mandatory?: boolean
  options?: QuestionOptionsType[]
  handleChange: HandleInputChangeType
  toggleErrorMessage: (id: number) => void
}

export default function CheckBoxInputQuestion({
  description,
  id,
  answerValue,
  horizontal,
  mandatory,
  options,
  handleChange,
  toggleErrorMessage,
}: CheckBoxInputQuestionProps) {
  const [checkedOptions, setCheckedOptions] = useState<number[]>([])

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
      toggleErrorMessage(id)
    }
  }

  return (
    <div className="flex flex-col">
      <p className="pb-3 leading-4 text-gray-800">{description}</p>
      <div
        className={twMerge(
          'flex w-full flex-wrap items-center gap-2',
          horizontal ? 'flex-row' : 'flex-col items-start gap-4',
        )}
      >
        {options &&
          options.map(({ value, description }, index) =>
            horizontal ? (
              <div
                key={`checkboxHorizontalOptions${index}${id}`}
                className="flex-shrink-0"
              >
                <input
                  type="checkbox"
                  name={`horizontalCheckbox${index}${id}`}
                  id={`horizontalCheckbox${index}${id}`}
                  value={value}
                  defaultChecked={answerValue?.includes(value)}
                  onChange={(e) => handleCheckboxChange(+e.target.value, id)}
                  className="peer hidden"
                />
                <label
                  htmlFor={`horizontalCheckbox${index}${id}`}
                  className="flex cursor-pointer rounded-[500px] border-2 border-gray-300 px-4 py-2 text-gray-700 hover:text-gray-600 peer-checked:border-blue-600  "
                >
                  {description}
                </label>
              </div>
            ) : (
              <div
                key={`checkboxHorizontaloptions${index}${id}`}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  name={`checkboxHorizontal${index}${id}`}
                  id={`checkboxHorizontal${index}${id}`}
                  value={value}
                  defaultChecked={answerValue?.includes(value)}
                  onChange={(e) => handleCheckboxChange(+e.target.value, id)}
                  className="h-4 w-4 border-2"
                />
                <label
                  htmlFor={`checkboxHorizontal${index}${id}`}
                  className="text-[0.875rem] leading-[14px]"
                >
                  {description}
                </label>
              </div>
            ),
          )}
      </div>
    </div>
  )
}
