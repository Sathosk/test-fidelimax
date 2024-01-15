'use client'

import { useEffect, useState } from 'react'

import { SurveyResponseType, SurveyServices } from '@/services/survey'

import RadioInputQuestion from './QuestionTypes/RadioInputQuestion'
import SelectInputQuestion from './QuestionTypes/SelectInputQuestion'
import TextAreaInputQuestion from './QuestionTypes/TextAreaInputQuestion'

export type HandleInputChangeType = (value: string | number, id: number) => void

type AnswerType = {
  typeQuestion: number
  answerValue: string | number
}

export default function DynamicSurveyForm() {
  const [surveyData, setSurveyData] = useState<SurveyResponseType>() // Survey Data from API
  const [answers, setAnswers] = useState<AnswerType[]>([]) // Answers from user and body for post request

  console.log('surveyData: ', surveyData)

  // fetch survey data from API and set it to surveyData and answers state
  useEffect(() => {
    async function fetchSurveyData() {
      try {
        const surveyResData = await SurveyServices.getSurveyData()

        const answers = transformSurveyDataToAnswers(surveyResData.itens)

        setAnswers(answers)
        setSurveyData(surveyResData)
      } catch (error) {
        console.error('Error fetching survey data:', error)
      }
    }

    fetchSurveyData()
  }, [])

  // transform survey data from API to answers array state so each question has an id attached to it for further use
  function transformSurveyDataToAnswers(
    surveyItems: SurveyResponseType['itens'],
  ) {
    return surveyItems.map((item, index) => ({
      id: index,
      typeQuestion: item.typeQuestion,
      answerValue: item.answerValue || '',
    }))
  }

  // handle input change from user and set it to answers state
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

  // handle form submit
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    console.log('answers: ', answers)
  }

  return (
    <form
      className="flex w-full flex-col gap-10 rounded-2xl bg-white p-8"
      onSubmit={onSubmit}
    >
      {surveyData &&
        Array.isArray(surveyData.itens) &&
        surveyData.itens.map((item, index) => {
          switch (item.typeQuestion) {
            case 2:
            case 5:
              return (
                <RadioInputQuestion
                  key={index}
                  id={index}
                  description={item.content}
                  mandatory={item.mandatory}
                  answerValue={item.answerValue}
                  options={item.itens || undefined}
                  handleChange={handleInputChange}
                />
              )
            case 3:
              return (
                <TextAreaInputQuestion
                  key={index}
                  id={index}
                  handleChange={handleInputChange}
                  question={item.content}
                  answerValue={item.answerValue}
                  mandatory={index === 7}
                />
              )
            case 4:
              return (
                <SelectInputQuestion
                  key={index}
                  id={index}
                  question={item.content}
                  answerValue={item.answerValue}
                  mandatory={item.mandatory}
                  options={item.itens || undefined}
                  handleChange={handleInputChange}
                />
              )
            default:
              return null
          }
        })}

      <button type="submit" className="h-10 w-48 bg-gray-950 text-white">
        Enviar
      </button>
    </form>
  )
}
