import Spinner from './Spinner'

export default function LoadingComponent() {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center overflow-hidden bg-black opacity-50">
      <Spinner />
    </div>
  )
}
