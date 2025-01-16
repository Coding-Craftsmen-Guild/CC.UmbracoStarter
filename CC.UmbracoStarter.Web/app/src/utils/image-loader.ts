function buildUrlParams(params: { [key: string]: any }): string {
  const urlParams = new URLSearchParams()
  for (const key in params) {
    if (params[key] !== undefined) {
      urlParams.append(key, params[key])
    }
  }
  return urlParams.toString()
}

export default function myImageLoader({
  src,
  width,
  quality
}: {
  src: string
  width?: number
  quality?: number
}) {
  if (!src) return

  const params = buildUrlParams({ w: width, q: quality || 90 })
  return `${process.env.NEXT_PUBLIC_UMBRACO_BASE_URL}/${src}?${params}`
}
