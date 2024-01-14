'use client'
import Image from 'next/image'
import Link from 'next/link'

import hamburgerIcon from '@/assets/hamburger.svg'
import logoPlaceholder from '@/assets/logo-placeholder.svg'

import LoginMenu from './Header/LoginMenu'
import Wrapper from './Wrapper'

export default function Header() {
  return (
    <header className="h-[72px] w-full bg-gray-800 text-white">
      <Wrapper className="h-full items-center justify-between">
        {/* Logo / SideMenu */}
        <div className="flex gap-4">
          <button className="transition-all hover:cursor-pointer hover:opacity-80">
            <Image src={hamburgerIcon} alt="Hamburger menu" />
          </button>
          <Link href="/">
            <Image
              src={logoPlaceholder}
              alt="Logo que contém texto 'sua' na cor branca e 'logo' em fonte negrito e cor amarela"
            />
          </Link>
        </div>
        <LoginMenu userName="Fábio C Pinto" />
      </Wrapper>
    </header>
  )
}
