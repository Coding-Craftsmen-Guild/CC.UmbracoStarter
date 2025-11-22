'use client'

import Container from '@/components/container'
import Richtext from '@/components/richtext'
import NotFound from '@/components/ui/not-found'
import { ComponentTypes } from '@/constants/component-types.constants'
import { BlockGrid, BlockGridComponent } from '@/types/delivery-api/block-grid.data-type'
import { cn } from '@/utils'
import { getNumOfCols } from '@/utils/grid.utils'
import React from 'react'

type BlockGridProps = BlockGrid<any, any> & {
  className?: string
}

const getBlockComponent = (item: BlockGridComponent<any, any>) => {
  const mapper = new Map<string, React.FC<any>>([
    [ComponentTypes.ContainerComponent.toString(), Container],
    [ComponentTypes.RichtextComponent.toString(), Richtext]
  ])

  const BlockGridComponent = mapper.get(item.content.contentType)

  if (!BlockGridComponent) {
    return <NotFound />
  }

  return <BlockGridComponent key={item.content.id} {...item} />
}

const BlockGridContainer: React.FC<BlockGridProps> = ({ gridColumns, items, className }) => {
  return (
    <div className={cn('grid', getNumOfCols(gridColumns), className)}>
      {items.map((item, index) => getBlockComponent(item))}
    </div>
  )
}

export default BlockGridContainer
