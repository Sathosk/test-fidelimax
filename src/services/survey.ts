import axios from '@/lib/axios'

type QuestionOptionsType = {
  value: number
  description: string
}

export type QuestionData = {
  typeQuestion: number
  content: string
  mandatory: boolean
  answerValue?: number | string
  horizontal?: boolean
  itens?: QuestionOptionsType[]
}

export type SurveyResponseType = {
  itens: QuestionData[]
  error: string
  warning: string
}

export const SurveyServices = {
  async getSurveyData() {
    const response = await axios.get('/survey.json')

    return response.data as SurveyResponseType
  },
}
