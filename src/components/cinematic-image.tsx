import Image from "next/image";

/**
 * Tall, deliberate image crop with an optional continuous slow zoom
 * ("Ken Burns") — the way a considered product site treats photography
 * as the primary event, not filler. Container defines the aspect ratio;
 * the image always fills and covers it.
 */
export function CinematicImage({
  src,
  alt,
  kenBurns = false,
  objectPosition = "center",
  className = "",
  sizes = "100vw",
  preload = false,
}: {
  src: string;
  alt: string;
  kenBurns?: boolean;
  objectPosition?: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        className={`object-cover ${kenBurns ? "animate-kenburns" : ""}`}
        style={{ objectPosition }}
      />
    </div>
  );
}
