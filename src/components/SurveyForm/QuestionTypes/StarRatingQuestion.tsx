import Image from 'next/image'
import { useState } from 'react'

import goldenStarIcon from '@/assets/golden-star.svg'
import grayStarIcon from '@/assets/gray-star.svg'

import { AnswerValueType } from '../DynamicSurveyForm'

interface StarRatingQuestionProps {
  id: number
  question: string
  answerValue?: number | string | number[]
  mandatory?: boolean
  handleChange: (value: AnswerValueType, id: number) => void
  toggleErrorMessage: (id: number) => void
}

export default function StarRatingQuestion({
  id,
  question,
  answerValue,
  toggleErrorMessage,
  handleChange,
}: StarRatingQuestionProps) {
  const [rating, setRating] = useState((answerValue as number) || 0)
  const [hover, setHover] = useState(0)

  function handleClick(index: number) {
    setRating(index)
    handleChange(index, id)
    toggleErrorMessage(id)
  }

  return (
    <div className="flex flex-col">
      <p className="text-2xl text-gray-800">
        Título da pergunta deve ficar aqui
      </p>
      <p className="mt-2 text-sm">{question}</p>
      <div className="mt-4 flex">
        {[...Array(5)].map((_, index) => {
          index += 1
          return (
            <button
              type="button"
              key={`star${index}`}
              onClick={() => handleClick(index)}
              className="flex h-16 w-20 items-center justify-center"
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              {index <= (hover || rating) ? (
                <Image src={goldenStarIcon} alt="" />
              ) : (
                <Image src={grayStarIcon} alt="" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
