'use client'

import { useEffect, useState } from 'react'

import { SurveyResponseType, SurveyServices } from '@/services/survey'

import RadioInputQuestion from './QuestionTypes/RadioInputQuestion'

export type HandleInputChangeType = (value: string | number, id: number) => void

type AnswerType = {
  typeQuestion: number
  answerValue: string | number
}

export default function DynamicSurveyForm() {
  const [surveyData, setSurveyData] = useState<SurveyResponseType>()
  const [answers, setAnswers] = useState<AnswerType[]>([])

  console.log('surveyData: ', surveyData)

  useEffect(() => {
    async function fetchSurveyData() {
      try {
        const surveyResData = await SurveyServices.getSurveyData()

        const answers = surveyResData.itens.map((item, index) => {
          return {
            id: index,
            typeQuestion: item.typeQuestion,
            answerValue: item.answerValue || '',
          }
        })

        setAnswers(answers)
        setSurveyData(surveyResData)
      } catch (error) {
        console.log('fall on exception')
        console.error(error)
      }
    }

    fetchSurveyData()
  }, [])

  const handleInputChange: HandleInputChangeType = (value, id) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers]
      const targetAnswer = updatedAnswers[id]

      if (targetAnswer) {
        targetAnswer.answerValue = value
      }

      return updatedAnswers
    })
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(answers)
  }

  return (
    <form
      className="flex w-full flex-col gap-10 rounded-2xl bg-white p-8"
      onSubmit={onSubmit}
    >
      {surveyData &&
        surveyData.itens.map((item, index) =>
          item.typeQuestion === 5 || item.typeQuestion === 2 ? (
            <RadioInputQuestion
              key={index}
              id={index}
              description={item.content}
              mandatory={item.mandatory}
              answerValue={item.answerValue}
              options={item.itens || undefined}
              onChange={handleInputChange}
            />
          ) : null,
        )}

      <button type="submit" className="h-10 w-48 bg-gray-950 text-white">
        Enviar
      </button>
    </form>
  )
}
