import { cn } from '@/lib/utils'
import NextImage from 'next/image'
interface imageProps {
  width: number
  height: number
  src: string
  alt: string
  className?: string
}
const Image = ({ src, height, width, alt, className }: imageProps) => {
  return (
    <div className={cn(`h-[${height}px] w-[${width}px] overflow-hidden relative`, className)}>
      <NextImage fill src={src} alt={alt}></NextImage>
    </div>
  )
}

export default Image
