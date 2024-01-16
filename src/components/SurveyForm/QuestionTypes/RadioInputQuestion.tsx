import { twMerge } from 'tailwind-merge'

import { QuestionOptionsType } from '@/services/survey'

import { HandleInputChangeType } from '../DynamicSurveyForm'

interface RadioInputQuestionProps {
  id: number
  description: string
  answerValue?: number | string | number[]
  mandatory?: boolean
  options?: QuestionOptionsType[]
  handleChange: HandleInputChangeType
}

export default function RadioInputQuestion({
  id,
  description,
  answerValue,
  mandatory,
  options,
  handleChange,
}: RadioInputQuestionProps) {
  return (
    <>
      {options ? (
        <div>
          <p className="mt-2 leading-4 text-gray-800">{description}</p>
          <div className="mt-3 flex items-center gap-4 ">
            {options.map(({ value, description }, index) => (
              <div
                key={value}
                className={twMerge(
                  'flex items-center gap-3',
                  index === 0 && 'pl-1',
                )}
              >
                <input
                  id={`radioDynamic${value}`}
                  type="radio"
                  name="radioDynamicGroup"
                  className="h-4 w-4 border-2"
                  defaultChecked={answerValue ? answerValue === value : false}
                  required={mandatory}
                  onChange={() => handleChange(value, id)}
                  value={value}
                />
                <label htmlFor={`radioDynamic${value}`}>{description}</label>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full">
          <p className="text-2xl text-gray-800">
            Título da pergunta deve ficar aqui
          </p>
          <p className="mt-2 text-sm">{description}</p>
          <div className="mt-10 flex w-full flex-wrap items-center justify-between gap-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index + 1} className="flex flex-col items-center gap-3">
                <input
                  id={`radioFixed${index + 1}`}
                  type="radio"
                  name="radioFixedGroup"
                  className="h-3 w-3 border-2 sm:h-4 sm:w-4"
                  defaultChecked={
                    answerValue ? answerValue === index + 1 : false
                  }
                  onChange={() => handleChange(index + 1, id)}
                  required={mandatory}
                  value={index}
                />
                <label htmlFor={`radioFixed${index + 1}`}>{index + 1}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
