'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import ErrorIcon from '@/assets/error.svg'
import SuccessIcon from '@/assets/success.svg'
import {
  FakePostResType,
  QuestionData,
  SurveyResponseType,
  SurveyServices,
} from '@/services/survey'

import LoadingComponent from '../LoadingComponent'
import { Modal } from '../Modal'
import Spinner from '../Spinner'
import SubmitButton from '../SubmitButton'
import { renderQuestionComponent } from './RenderQuestionComponent'

export type AnswerValueType = string | number | number[]

export type HandleInputChangeType = (value: AnswerValueType, id: number) => void

type AnswerType = {
  id: number
  typeQuestion: number
  answerValue: AnswerValueType
  mandatory: boolean
}

type ModalContentType = {
  state: 'success' | 'error' | 'initial'
  content: string
}

export default function DynamicSurveyForm() {
  const [modalContent, setModalContent] = useState<ModalContentType>({
    state: 'initial',
    content: '',
  })
  const [openModal, setOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
      } finally {
        setIsLoading(false)
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

  // Handle close modal
  function handleCloseModal() {
    setOpenModal(false)
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
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Find checkbox questions and check if they are mandatory and if they have at least one option selected
    const isCheckboxValid = validateCheckboxQuestions()
    const isStarRatingValid = validateStarRatingQuestions()

    if (isCheckboxValid && isStarRatingValid) {
      try {
        setIsLoading(true)
        // Create a deep copy of surveyData to avoid modifying the original object
        const newBody = JSON.parse(
          JSON.stringify(surveyData),
        ) as FakePostResType

        // Update answerValue property of each question with user input
        answers.forEach((answer) => {
          newBody.itens[answer.id].answerValue = answer.answerValue
        })

        // Send fake post request
        const res = await SurveyServices.postSurvey(newBody)

        newBody.id = 101 // Add property that fake post adds to the response body for strict equality check. Comment this to test failure

        // Perform a strict equality check between the body sent and the body received
        const isEqual = JSON.stringify(newBody) === JSON.stringify(res)

        if (!isEqual) {
          alert('Formulário inválido!')
        } else {
          setModalContent({
            state: 'success',
            content: 'Seu formulário foi enviado com sucesso!',
          })
          setOpenModal(true)
        }
      } catch (error) {
        console.log('error', error)
        alert('Algo deu errado! Tente novamente mais tarde.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Get modal error
  async function getModalError() {
    try {
      setIsLoading(true)
      const res = await SurveyServices.getError()

      setModalContent({ state: 'error', content: res.error })
      setOpenModal(true)
    } catch (error) {
      setModalContent({
        state: 'error',
        content: 'Houve um erro ao enviar o formulário',
      })
      setOpenModal(true)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Get modal success
  async function getModalSuccess() {
    try {
      setIsLoading(true)
      const res = await SurveyServices.getSuccess()

      setModalContent({
        state: 'success',
        content: 'Seu formulário foi enviado com sucesso!',
      })
      setOpenModal(true)
    } catch (error) {
      setModalContent({
        state: 'error',
        content: 'Houve um erro ao enviar o formulário',
      })
      setOpenModal(true)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className="flex w-full flex-col gap-10 rounded-2xl bg-white p-8"
      onSubmit={onSubmit}
    >
      <Modal openModal={openModal} closeOnOverlay closeModal={handleCloseModal}>
        <div className="relative flex h-[350px] w-[400px] items-center justify-center bg-white p-4">
          <button
            className="absolute right-4 top-4 cursor-pointer text-2xl font-bold text-black"
            onClick={() => setOpenModal(false)}
            type="button"
          >
            &#10005;
          </button>
          <div className="flex flex-col items-center gap-10">
            {modalContent.state === 'error' && (
              <Image
                alt="red cross icon"
                src={ErrorIcon}
                className="h-20 w-20"
              />
            )}

            {modalContent.state === 'success' && (
              <Image
                alt="red cross icon"
                src={SuccessIcon}
                className="h-20 w-20"
              />
            )}
            <p
              className={
                modalContent.state === 'success'
                  ? 'text-gray-700'
                  : 'text-danger'
              }
            >
              {modalContent.content}
            </p>
          </div>
        </div>
      </Modal>

      {surveyData ? (
        Array.isArray(surveyData.itens) &&
        surveyData.itens.map((item, index) =>
          renderQuestionComponent(
            item,
            index,
            errors,
            handleInputChange,
            removeMessageOnSelect,
          ),
        )
      ) : (
        <div className="flex w-full items-center justify-center">
          <Spinner />
        </div>
      )}

      {surveyData && (
        <div className="flex flex-col gap-5">
          <SubmitButton
            text="Enviar"
            align="start"
            type="button"
            isLoading={isLoading}
          />
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <SubmitButton
              text="Enviar Fake Post"
              align="start"
              color="dark-gray"
              type="submit"
              isLoading={isLoading}
            />
            <SubmitButton
              text="Enviar Erro"
              align="start"
              color="red"
              type="button"
              onClick={getModalError}
              isLoading={isLoading}
            />
            <SubmitButton
              text="Enviar Sucesso"
              align="start"
              color="green"
              type="button"
              onClick={getModalSuccess}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </form>
  )
}
