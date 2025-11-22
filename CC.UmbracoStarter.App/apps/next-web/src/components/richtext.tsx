'use client'

import { BlockGridComponent } from '@/types/delivery-api/block-grid.data-type'
import { cn } from '@/utils'
import { getColSpan, getRowSpan } from '@/utils/grid.utils'
import parse from 'html-react-parser'
import React from 'react'

type ContainerProps = BlockGridComponent<RichtextContent, RichtextSettings>

type RichtextObject = {
  markup: string
  blocks: any[]
}

export type RichtextContent = {
  text: RichtextObject
}

export type RichtextSettings = {
  variant: string
  foreground?: string
}

const Richtext: React.FC<ContainerProps> = ({ content, columnSpan, rowSpan, settings }) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        getColSpan(columnSpan),
        getRowSpan(rowSpan),
        'text-foreground'
      )}
      style={
        settings.properties.foreground
          ? ({ '--foreground': settings.properties.foreground } as React.CSSProperties)
          : undefined
      }
    >
      {parse(content.properties.text.markup)}
    </div>
  )
}

export default Richtext
