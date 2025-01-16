'use client'

import { Configuration } from '@/types/delivery-api/configuration.repository'
import { cn } from '@/utils'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import React, { useState } from 'react'
import { DesktopNavbar } from './navbar.desktop'

const Header: React.FC<Configuration> = props => {
  if (!props) return

  const { scrollY } = useScroll()

  const [isSticky, setIsSticky] = useState(false)
  useMotionValueEvent(scrollY, 'change', value => setIsSticky(value > 100))

  return (
    <motion.nav
      className={cn(
        'fixed mx-auto inset-x-0 z-50 w-full text-white overflow-hidden',
        isSticky && 'golden-border text-neutral-800'
      )}
      initial={{ opacity: 0, height: '0px' }}
      animate={{
        opacity: 1,
        height: 'fit-content',
        background: isSticky ? 'rgba(255, 255, 255, 0.85)' : 'transparent'
      }}
    >
      <div className="hidden lg:block w-full">
        <DesktopNavbar {...props} />
      </div>
      <div className="flex h-full w-full items-center lg:hidden ">
        {/* {data?.left_navbar_items && (
          <MobileNavbar
            locale={locale}
            leftNavbarItems={data?.left_navbar_items}
            rightNavbarItems={data?.right_navbar_items}
            logo={data?.logo}
          />
        )} */}
      </div>
    </motion.nav>
  )
}

export default Header
