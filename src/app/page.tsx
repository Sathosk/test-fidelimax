import DynamicSurveyForm from '@/components/SurveyForm/DynamicSurveyForm'
import Wrapper from '@/components/Wrapper'

export default function Home() {
  return (
    <main className="relative w-full bg-gray-100">
      <div className="absolute top-0 h-[244px] w-full bg-gray-800">
        <span className="mx-auto block w-11/12 pb-6 pl-6 pt-[18px] text-[0.75rem] font-medium leading-3 text-gray-400">
          Pesquisa de Satisfação
        </span>
      </div>

      <Wrapper className="justify-center">
        <section className="z-10 mt-14 flex w-full max-w-[648px] flex-col gap-6">
          <h2 className="self-start text-center text-3xl font-medium text-white md:text-[2.5rem]">
            Pesquisa de Satisfação
          </h2>
          <DynamicSurveyForm />
        </section>
      </Wrapper>
    </main>
  )
}
