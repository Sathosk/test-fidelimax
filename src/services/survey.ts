import axios from 'axios'

import api from '@/lib/axios'

export type QuestionOptionsType = {
  value: number
  description: string
}

export type QuestionData = {
  typeQuestion: number
  content: string
  mandatory: boolean
  answerValue?: number | string | number[]
  horizontal?: boolean
  itens?: QuestionOptionsType[]
}

export type SurveyResponseType = {
  itens: QuestionData[]
  error: string
  warning: string
}

export interface FakePostResType extends SurveyResponseType {
  id: number
}

export type getModalMessagesResType = {
  error: string
  warning: string
}

export const SurveyServices = {
  async getSurveyData() {
    const response = await api.get('/survey.json')

    return response.data as SurveyResponseType
  },

  async getError() {
    const response = await api.get('/survey-post-error.json')

    return response.data as getModalMessagesResType
  },

  async getSuccess() {
    const response = await api.get('/survey-post-success.json')

    return response.data as getModalMessagesResType
  },

  async postSurvey(answers: SurveyResponseType) {
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/posts/ ',
      answers,
    )

    return response.data as FakePostResType
  },
}
