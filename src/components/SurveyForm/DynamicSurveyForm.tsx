'use client'

import { useEffect, useState } from 'react'

import {
  QuestionData,
  SurveyResponseType,
  SurveyServices,
} from '@/services/survey'

import CheckBoxInputQuestion from './QuestionTypes/CheckBoxInputQuestion'
import RadioInputQuestion from './QuestionTypes/RadioInputQuestion'
import SelectInputQuestion from './QuestionTypes/SelectInputQuestion'
import StarQuestion from './QuestionTypes/StarRatingQuestion'
import TextAreaInputQuestion from './QuestionTypes/TextAreaInputQuestion'

export type HandleInputChangeType = (
  value: string | number | number[],
  id: number,
) => void

type AnswerType = {
  id: number
  typeQuestion: number
  answerValue: string | number | number[]
  mandatory: boolean
}

export default function DynamicSurveyForm() {
  const [surveyData, setSurveyData] = useState<SurveyResponseType>() // Survey Data from API
  const [answers, setAnswers] = useState<AnswerType[]>([]) // Answers from user and body for post request
  const [errors, setErrors] = useState<Record<number, boolean>>({})

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
    return surveyItems.map((item, index) => {
      let answerValue: QuestionData['answerValue']

      switch (true) {
        case item.answerValue !== undefined:
          answerValue = item.answerValue
          break
        case item.typeQuestion === 1:
          answerValue = 0
          break
        case item.typeQuestion === 6:
          answerValue = []
          break
        default:
          answerValue = ''
      }

      return {
        id: index,
        typeQuestion: item.typeQuestion,
        answerValue,
        mandatory: item.mandatory,
      }
    })
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

  // Remove error from checkbox question or star rating question if user selects at least one option
  const removeMessageOnSelect = (id: number) => {
    if (errors[id]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: false,
      }))
    }
  }

  // Validate if checkbox questions have at least one option selected
  function validateCheckboxQuestions() {
    let isValid = true

    const checkboxAnswers = answers.filter(
      (answers) => answers.typeQuestion === 6,
    )

    checkboxAnswers.forEach((checkboxAnswer) => {
      const answerValue = checkboxAnswer.answerValue as number[]
      const isNotSelected = answerValue.length === 0

      if (isNotSelected && checkboxAnswer.mandatory) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [checkboxAnswer.id]: true,
        }))

        isValid = false
      }
    })

    return isValid
  }

  // Validate if star rating questions is selected
  function validateStarRatingQuestions() {
    let isValid = true

    const starRatingAnswers = answers.filter(
      (answers) => answers.typeQuestion === 1,
    )

    starRatingAnswers.forEach((starRatingAnswer) => {
      const answerValue = starRatingAnswer.answerValue
      const isNotSelected = answerValue === 0 || !answerValue

      if (isNotSelected && starRatingAnswer.mandatory) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [starRatingAnswer.id]: true,
        }))

        isValid = false
      }
    })

    return isValid
  }

  // Handle form submit
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Find checkbox questions and check if they are mandatory and if they have at least one option selected
    const isCheckboxValid = validateCheckboxQuestions()
    const isStarRatingValid = validateStarRatingQuestions()

    if (isCheckboxValid && isStarRatingValid) {
      console.log('answers: ', answers)
    }
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
            case 1:
              return (
                <div key={`starQuestion-${index}`}>
                  <StarQuestion
                    id={index}
                    question={item.content}
                    answerValue={item.answerValue}
                    mandatory={item.mandatory}
                    handleChange={handleInputChange}
                    toggleErrorMessage={removeMessageOnSelect}
                  />
                  {errors[index] && (
                    <p className="text-sm text-red-500">
                      Por favor, selecione uma pontuação
                    </p>
                  )}
                </div>
              )

            case 2:
            case 5:
              return (
                <RadioInputQuestion
                  key={`radioQuestion-${index}`}
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
                  key={`textAreaQuestion-${index}`}
                  id={index}
                  handleChange={handleInputChange}
                  question={item.content}
                  answerValue={item.answerValue}
                  mandatory={item.mandatory}
                />
              )
            case 4:
              return (
                <SelectInputQuestion
                  key={`selectQuestion-${index}`}
                  id={index}
                  question={item.content}
                  answerValue={item.answerValue as number}
                  mandatory={item.mandatory}
                  options={item.itens || undefined}
                  handleChange={handleInputChange}
                />
              )

            case 6:
              return (
                <div
                  className="flex flex-col gap-2"
                  key={`checkBoxQuestion-${index}`}
                >
                  <CheckBoxInputQuestion
                    id={index}
                    description={item.content}
                    mandatory={item.mandatory}
                    horizontal={item.horizontal}
                    answerValue={item.answerValue as number[] | undefined}
                    options={item.itens || undefined}
                    handleChange={handleInputChange}
                    toggleErrorMessage={removeMessageOnSelect}
                  />
                  {errors[index] && (
                    <p className="text-sm text-red-500">
                      Por favor, selecione pelo menos uma opção
                    </p>
                  )}
                </div>
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
