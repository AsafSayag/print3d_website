import Image from "next/image";

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {images.map((src) => (
        <div
          key={src}
          className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[color:var(--navy-800)]/10"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
