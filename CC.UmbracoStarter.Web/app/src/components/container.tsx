'use client'

import BlockGridContainer from '@/components/block-grid-container'
import { BlockGridComponent } from '@/types/delivery-api/block-grid.data-type'
import { getItemsPosition, ItemsPosition } from '@/types/delivery-api/grid-items-position.data-type'
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
  className: string | null
  isFullWidth: boolean
  itemsPosition: ItemsPosition | null
}

const Container: React.FC<ContainerProps> = ({
  rowSpan,
  columnSpan,
  areas,
  areaGridColumns,
  content,
  settings
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        settings.properties.isFullWidth ? 'w-full' : 'container mx-auto',
        getColSpan(columnSpan),
        getRowSpan(rowSpan),
        settings.properties.className
      )}
    >
      {areas &&
        areas.length > 0 &&
        areas.map((x, i) => (
          <BlockGridContainer
            key={x.alias}
            className={cn('h-full', getItemsPosition(settings.properties.itemsPosition))}
            gridColumns={x.columnSpan}
            items={x.items}
          />
        ))}
      <Background
        bgVideo={settings.properties.bgVideo?.[0]}
        bgImage={settings.properties.bgImage?.[0]}
      />
    </div>
  )
}

export default Container
