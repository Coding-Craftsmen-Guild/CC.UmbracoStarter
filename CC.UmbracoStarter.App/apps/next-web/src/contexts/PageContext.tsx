import { Page } from '@/types/delivery-api/global'
import { createContext, useContext } from 'react'

type PageContext<T> = {
  page: Page<T>
}

const PageContext = createContext<PageContext<{ [key: string]: any }> | undefined>(undefined)

export const PageProvider = (props: { children: React.ReactNode; page: Page<any> }) => {
  const values = {
    page: props.page
  }

  return <PageContext.Provider value={values}>{props.children}</PageContext.Provider>
}

export function usePageContext<T>(): PageContext<T> {
  const context = useContext(PageContext as React.Context<PageContext<T> | undefined>)
  if (!context) {
    throw new Error('usePageContext must be used within TranslationsProvider')
  }
  return context
}
