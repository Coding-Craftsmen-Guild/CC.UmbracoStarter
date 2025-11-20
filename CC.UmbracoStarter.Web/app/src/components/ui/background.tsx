import { ImageType } from '@/types/delivery-api/image.data-type'
import { LinkType } from '@/types/delivery-api/link.data-type'
import { getUrlFromLink } from '@/utils/data-types.utils'
import myImageLoader from '@/utils/image-loader'
import Image from 'next/image'
import React from 'react'
import Video from './video'

export type BackgroundProps = {
  bgVideo?: LinkType | null
  bgImage?: ImageType | null
}

const Background: React.FC<BackgroundProps> = ({ bgVideo, bgImage }) => {
  const className = '-z-10 absolute top-0 left-0 w-auto h-auto min-w-full min-h-full object-cover'

  if (bgVideo) {
    return (
      <Video
        className={className}
        autoPlay={true}
        muted={true}
        loop={true}
        src={getUrlFromLink(bgVideo)}
        thumbnail={myImageLoader({ src: bgImage?.url ?? '' })}
      />
    )
  }

  if (bgImage) {
    return (
      <Image
        className={className}
        src={bgImage.url}
        fill={true}
        loading="lazy"
        decoding="async"
        alt="container bg-image"
      />
    )
  }
}

export default Background
