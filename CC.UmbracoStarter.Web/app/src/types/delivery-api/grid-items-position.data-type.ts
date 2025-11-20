export enum ItemsPosition {
  Start = 'start',
  End = 'end',
  Center = 'center'
}

type PositionClass = 'place-items-start' | 'place-items-end' | 'place-items-center' | ''

export const getItemsPosition = (position?: ItemsPosition | null): PositionClass =>
  position ? `place-items-${position}` : ''
