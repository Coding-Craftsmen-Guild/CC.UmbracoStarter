import { LinkType } from './link.data-type'

export type ContentResult<T> = {
  data: Content<T>
  isSuccess: boolean
  statusCode: number
}

export type QueryResult<T> = {
  total: number
  items: Content<T>[]
}

export type PageProps<T> = {
  page: Content<Page<T>>
}

export type Page<T> = SeoPageProperties & T

export type Content<T> = {
  id: string
  contentType: string
  name: string
  properties: T
}

export type SeoPageProperties = {
  seoTitle: string
  canonicalLink: [LinkType] | null
  seoDescription: string
  seoKeywords: string
}
