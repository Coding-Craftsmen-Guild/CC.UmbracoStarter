type ColSpan =
  | 'col-span-1'
  | 'col-span-2'
  | 'col-span-3'
  | 'col-span-4'
  | 'col-span-5'
  | 'col-span-6'
  | 'col-span-7'
  | 'col-span-8'
  | 'col-span-9'
  | 'col-span-10'
  | 'col-span-11'
  | 'col-span-12'

export type SpanSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type RowSpan =
  | 'row-span-1'
  | 'row-span-2'
  | 'row-span-3'
  | 'row-span-4'
  | 'row-span-5'
  | 'row-span-6'
  | 'row-span-7'
  | 'row-span-8'
  | 'row-span-9'
  | 'row-span-10'
  | 'row-span-11'
  | 'row-span-12'

type NumOfCols =
  | 'grid-cols-1'
  | 'grid-cols-2'
  | 'grid-cols-3'
  | 'grid-cols-4'
  | 'grid-cols-5'
  | 'grid-cols-6'
  | 'grid-cols-7'
  | 'grid-cols-8'
  | 'grid-cols-9'
  | 'grid-cols-10'
  | 'grid-cols-11'
  | 'grid-cols-12'

export const getColSpan = (columnSpan: SpanSize): ColSpan => `col-span-${columnSpan}`

export const getRowSpan = (rowSpan: SpanSize): RowSpan => `row-span-${rowSpan}`

export const getNumOfCols = (numCols: SpanSize): NumOfCols => `grid-cols-${numCols}`
