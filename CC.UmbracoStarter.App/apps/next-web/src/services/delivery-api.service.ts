import 'server-only'

import { Content, ContentResult, QueryResult } from '@/types/delivery-api/global'

export const getContentByUrlSlugPath = async <T>(slug: string[]): Promise<ContentResult<T>> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_UMBRACO_BASE_URL}/umbraco/delivery/api/v2/content/item/${slug?.join('/') ?? '/'}`,
      { cache: 'force-cache' }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = (await response.json()) as Content<T>
    return { data, isSuccess: true, statusCode: response.status }
  } catch (error: any) {
    console.log(error)
    return { data: {} as Content<T>, isSuccess: false, statusCode: error.status || 500 }
  }
}

interface QueryParams {
  fetch?: string
  filter?: string
  sort?: string
  skip?: number
  take?: number
  expand?: string
  fields?: string
}

export const getContentByQuery = async <T>(params: QueryParams): Promise<QueryResult<T>> => {
  try {
    const query = new URLSearchParams()

    if (params.fetch) query.append('fetch', params.fetch)
    if (params.filter) query.append('filter', params.filter)
    if (params.sort) query.append('sort', params.sort)
    if (params.skip !== undefined) query.append('skip', params.skip.toString())
    if (params.take !== undefined) query.append('take', params.take.toString())
    if (params.expand) query.append('expand', params.expand)
    if (params.fields) query.append('fields', params.fields)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_UMBRACO_BASE_URL}/umbraco/delivery/api/v2/content?${query.toString()}`,
      { cache: 'force-cache' }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return (await response.json()) as QueryResult<T>
  } catch (error: any) {
    console.log(error)
    return {} as QueryResult<T>
  }
}
