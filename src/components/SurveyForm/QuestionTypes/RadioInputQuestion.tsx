import { twMerge } from 'tailwind-merge'

import { HandleInputChangeType } from '../DynamicSurveyForm'

type RadioOptionsType = {
  value: number
  description: string
}

interface RadioInputQuestionProps {
  id: number
  description: string
  answerValue?: number | string
  mandatory?: boolean
  options?: RadioOptionsType[]
  onChange: HandleInputChangeType
}

export default function RadioInputQuestion({
  id,
  description,
  answerValue,
  mandatory,
  options,
  onChange,
}: RadioInputQuestionProps) {
  return (
    <>
      {options ? (
        <div>
          <p className="mt-2 leading-4 text-gray-800">{description}</p>
          <div className="mt-3 flex items-center gap-4">
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
                  onChange={() => onChange(value, id)}
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
          <div className="mt-10 flex w-full items-center justify-between">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index + 1} className="flex flex-col items-center gap-3">
                <input
                  id={`radioFixed${index + 1}`}
                  type="radio"
                  name="radioFixedGroup"
                  className="h-4 w-4 border-2"
                  defaultChecked={
                    answerValue ? answerValue === index + 1 : false
                  }
                  onChange={() => onChange(index + 1, id)}
                  required={mandatory}
                  value={index}
                />
                <label htmlFor={`radioOption${index + 1}`}>{index + 1}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}