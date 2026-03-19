import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  alt: string;
  /** Enable lazy loading via IntersectionObserver (default: true) */
  lazy?: boolean;
  /** Show blur placeholder while loading (default: true) */
  blurPlaceholder?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  lazy = true,
  blurPlaceholder = true,
  className = "",
  ...props
}: OptimizedImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isVisible, setIsVisible] = useState(!lazy);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!lazy || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [lazy]);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : undefined}
      alt={alt}
      onLoad={() => setIsLoaded(true)}
      className={`${className} transition-all duration-500 ${
        blurPlaceholder && !isLoaded ? "blur-sm scale-[1.02]" : "blur-0 scale-100"
      }`}
      loading={lazy ? "lazy" : undefined}
      decoding="async"
      {...props}
    />
  );
};

export default OptimizedImage;
