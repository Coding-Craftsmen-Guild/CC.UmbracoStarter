'use client'

import { BlockGridComponent } from '@/types/delivery-api/block-grid.data-type'
import { ImageType } from '@/types/delivery-api/image.data-type'
import { LinkType } from '@/types/delivery-api/link.data-type'
import { cn } from '@/utils'
import { getColSpan, getRowSpan } from '@/utils/grid.utils'
import React from 'react'
import Background from './ui/background'

type ContainerProps = BlockGridComponent<ContainerContent, ContainerSettings>

export type ContainerContent = {}

export type ContainerSettings = {
  bgVideo: [LinkType] | null
  bgImage: [ImageType] | null
  isFullWidth: boolean
}

const Container: React.FC<ContainerProps> = ({ rowSpan, columnSpan, content, settings }) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        settings.properties.isFullWidth ? 'w-full' : 'container mx-auto',
        getColSpan(columnSpan),
        getRowSpan(rowSpan)
      )}
    >
      <Background
        bgVideo={settings.properties.bgVideo?.[0]}
        bgImage={settings.properties.bgImage?.[0]}
      />
    </div>
  )
}

export default Container
