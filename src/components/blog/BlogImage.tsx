import Image from 'next/image'

interface BlogImageProps {
  src: string
  alt: string
  caption?: string
  priority?: boolean
  className?: string
}

export function BlogImage({
  src,
  alt,
  caption,
  priority = false,
  className = '',
}: BlogImageProps) {
  return (
    <figure className={`my-8 ${className}`}>
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#1a2e35]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-gray-400 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
