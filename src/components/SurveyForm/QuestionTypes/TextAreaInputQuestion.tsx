import { twMerge } from 'tailwind-merge'

import { HandleInputChangeType } from '../DynamicSurveyForm'

interface TextAreaInputQuestionProps {
  id: number
  question: string
  answerValue?: number | string
  mandatory?: boolean
  handleChange: HandleInputChangeType
}

export default function TextAreaInputQuestion({
  id,
  mandatory,
  question,
  answerValue,
  handleChange,
}: TextAreaInputQuestionProps) {
  return (
    // optional
    <div className="flex flex-col gap-2">
      <label htmlFor="textArea1" className="leading-4 text-gray-800">
        {question}
        {!mandatory && (
          <span className="text-[0.875rem] leading-[0.875rem] text-gray-500">
            {' '}
            (opcional)
          </span>
        )}
      </label>
      <textarea
        id="textArea1"
        name="textArea1"
        placeholder={mandatory ? 'Digite a resposta' : 'Digite aqui...'}
        defaultValue={answerValue}
        maxLength={mandatory ? 500 : 250}
        required={mandatory}
        className={twMerge(
          'h-[104px] w-full resize-none rounded-lg border-[1px] border-gray-400 p-4 outline outline-0 focus:border-2 focus:border-gray-500 focus:outline-0',
          mandatory && 'h-[168px]',
        )}
        onChange={(e) => handleChange(e.target.value, id)}
      />
    </div>
  )
}
