'use client'

import BlockGridContainer from '@/components/block-grid-container'
import { PageProvider } from '@/contexts/PageContext'
import { BlockGrid } from '@/types/delivery-api/block-grid.data-type'
import { PageProps } from '@/types/delivery-api/global'
import React from 'react'

type HomePageProps = {
  components: BlockGrid<any, any>
}

const HomePage: React.FC<PageProps<HomePageProps>> = ({ page }) => {
  return (
    <PageProvider page={page}>
      <BlockGridContainer {...page.properties.components} />
    </PageProvider>
  )
}

export default HomePage
