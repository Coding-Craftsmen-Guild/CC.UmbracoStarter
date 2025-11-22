export type ImageType = {
  focalPoint: null | { x: number; y: number }
  crops: Array<{
    alias: string
    width: number
    height: number
    coordinates: { x1: number; y1: number; x2: number; y2: number }
  }>
  id: string
  name: string
  mediaType: string
  url: string
  extension: string
  width: number
  height: number
  bytes: number
  properties: Record<string, unknown>
}
