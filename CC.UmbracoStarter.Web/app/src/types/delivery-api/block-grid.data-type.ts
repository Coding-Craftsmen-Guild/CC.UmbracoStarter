import { SpanSize } from '@/utils/grid.utils'

export type BlockGrid<TContent, TSettings> = {
  gridColumns: SpanSize
  items: BlockGridComponent<TContent, TSettings>[]
}

export type BlockGridComponent<TContent, TSettings> = {
  rowSpan: SpanSize
  columnSpan: SpanSize
  areaGridColumns: SpanSize
  areas: []
  content: {
    contentType: string
    id: string
    properties: TContent
  }
  settings: {
    contentType: string
    id: string
    properties: TSettings
  }
}
