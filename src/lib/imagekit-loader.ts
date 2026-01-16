export default function imagekitLoader({ src, width, quality }: {
  src: string;
  width: number;
  quality?: number;
}) {
  const params = [`w-${width}`];
  
  if (quality) {
    params.push(`q-${quality}`);
  }
  
  // Auto format conversion
  params.push('f-auto');
  
  const paramsString = params.join(',');
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  
  if (!urlEndpoint) {
    console.warn('NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is not defined, falling back to original src');
    return src;
  }
  
  // Clean the source path: remove leading slashes and handle edge cases
  let cleanSrc = src;
  while (cleanSrc.startsWith('/')) {
    cleanSrc = cleanSrc.slice(1);
  }
  
  // If cleanSrc is empty after removing slashes, use a default
  if (!cleanSrc) {
    cleanSrc = 'placeholder';
  }
  
  return `${urlEndpoint}/tr:${paramsString}/${cleanSrc}`;
}