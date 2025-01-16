import React from 'react'

export type VideoProps = {
  src: string
  className?: string
  thumbnail?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
}

const Video: React.FC<VideoProps> = ({
  src: url,
  thumbnail,
  className,
  autoPlay,
  muted,
  loop,
  playsInline
}) => {
  return (
    <video
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      poster={thumbnail}
    >
      <source src={url} />
    </video>
  )
}

export default Video
