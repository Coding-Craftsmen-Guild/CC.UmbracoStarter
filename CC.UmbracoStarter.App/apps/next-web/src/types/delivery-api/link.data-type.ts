export type LinkType = {
  url: string | null
  queryString: string | null
  title: string | null
  target: '_blank' | null
  destinationId: string | null
  destinationType: string | null
  route: {
    path: '/'
  } | null
  linkType: 'Content' | 'External' | 'Media'
}
