import { LinkType } from '@/types/delivery-api/link.data-type'

export const getUrlFromLink = (link: LinkType | undefined): string => {
  if (!link) return ''

  if (link.linkType === 'Content') {
    return link.route?.path ?? '' + link.queryString
  }

  if (link.linkType === 'Media') {
    return process.env.NEXT_PUBLIC_UMBRACO_BASE_URL + (link.url ?? '' + link.queryString)
  }

  return link.url ?? '' + link.queryString
}
