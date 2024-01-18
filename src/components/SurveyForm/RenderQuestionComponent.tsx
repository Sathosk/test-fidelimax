import { QuestionData } from '@/services/survey'

import { HandleInputChangeType } from './DynamicSurveyForm'
import CheckBoxInputQuestion from './QuestionTypes/CheckBoxInputQuestion'
import RadioInputQuestion from './QuestionTypes/RadioInputQuestion'
import SelectInputQuestion from './QuestionTypes/SelectInputQuestion'
import StarRatingQuestion from './QuestionTypes/StarRatingQuestion'
import TextAreaInputQuestion from './QuestionTypes/TextAreaInputQuestion'

export const renderQuestionComponent = (
  item: QuestionData,
  index: number,
  errors: Record<number, boolean>,
  handleInputChange: HandleInputChangeType,
  removeMessageOnSelect: (id: number) => void,
) => {
  switch (item.typeQuestion) {
    case 1:
      return (
        <div key={`starQuestion-${index}`}>
          <StarRatingQuestion
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
        <div className="flex flex-col gap-2" key={`checkBoxQuestion-${index}`}>
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
}
