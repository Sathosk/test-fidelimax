'use client'

import { useEffect, useState } from 'react'

import RadioInputQuestion from './QuestionTypes/RadioInputQuestion'

export type HandleInputChangeType = (value: string | number, id: number) => void

type AnswerType = {
  typeQuestion: number
  answerValue: string | number
}

type QuestionOptionsType = {
  value: number
  description: string
}

type QuestionType = {
  typeQuestion: number
  content: string
  mandatory: boolean
  answerValue?: number | string
  horizontal?: boolean
  itens?: QuestionOptionsType[]
  error: string
  warning: string
}

const mockobj: QuestionType = {
  typeQuestion: 5,
  content: 'Pergunta de escolha única?',
  mandatory: true,
  answerValue: 1,
  itens: [
    {
      value: 0,
      description: 'Sim',
    },
    {
      value: 1,
      description: 'Não',
    },
  ],
  error: '',
  warning: '',
}

const mockobj2: QuestionType = {
  typeQuestion: 2,
  answerValue: 9,
  mandatory: true,
  content:
    'Também é importante ter um espaço para o dono da loja colocar uma descrição da pergunta para ajudar o entendimento do usuário',
  error: '',
  warning: '',
}

const arrayMock = [mockobj2, mockobj]

export default function DynamicSurveyForm() {
  const [answers, setAnswers] = useState<AnswerType[]>([])

  useEffect(() => {
    const answers = arrayMock.map((item, index) => {
      return {
        id: index,
        typeQuestion: item.typeQuestion,
        answerValue: item.answerValue || '',
      }
    })

    setAnswers(answers)
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
      {arrayMock.map((item, index) => (
        <RadioInputQuestion
          key={index}
          id={index}
          description={item.content}
          mandatory={item.mandatory}
          answerValue={item.answerValue}
          options={item.itens || undefined}
          onChange={handleInputChange}
        />
      ))}

      <button type="submit" className="h-10 w-48 bg-gray-950 text-white">
        Enviar
      </button>
    </form>
  )
}
