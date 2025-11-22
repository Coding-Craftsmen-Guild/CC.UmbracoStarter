'use client'
import { Configuration } from '@/types/delivery-api/configuration.repository'
import { cn } from '@/utils'
import { motion } from 'motion/react'
import Link from 'next/link'
import { BlurImage } from '../ui/blur-image'

export const DesktopNavbar = ({ logo }: Configuration) => {
  return (
    <motion.div
      className={cn(
        'container flex relative justify-between px-4 py-3 rounded-md  transition duration-200 bg-transparent mx-auto'
      )}
    >
      <div className="flex flex-row gap-2 items-center">
        {logo && (
          <Link href={`/`} className="flex space-x-2 items-center mr-4 relative z-20">
            <BlurImage
              src={logo[0]?.url}
              alt={'Brand logo'}
              width={200}
              height={200}
              className="h-10 w-10 mr-2"
            />
          </Link>
        )}
        {/* <div className="flex items-center gap-1.5">
          {leftNavbarItems.map((item) => (
            <NavbarItem
              href={`/${locale}${item.URL}` as never}
              key={item.text}
              target={item.target}
            >
              {item.text}
            </NavbarItem>
          ))}
        </div> */}
      </div>
    </motion.div>
  )
}
