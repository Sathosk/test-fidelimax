import Image from 'next/image'

import logoPlaceholder from '@/assets/logo-placeholder.svg'

export default function Home() {
  return (
    <main>
      <Image src={logoPlaceholder} alt="asdf" />
    </main>
  )
}
