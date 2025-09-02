import { PUBLIC_IMAGE_BASE_PATH } from '../constants/AppConstants';

export async function fetchPublicFile(filename: string) {
  const response = await fetch(`${filename}`, { cache: 'no-store' });

  // On dev server, fetches for nonexistent files will return the index.html content with a 200 response
  const contentType = response.headers.get('content-type') ?? '';
  if (!response.ok || contentType.includes('text/html')) {
    throw new Error(
      `[${response.statusText}] Failed to fetch ${filename}: ${response.status}`,
    );
  }
  return response;
}

export function getPublicImagePath(imgFileName: string) {
  return `${PUBLIC_IMAGE_BASE_PATH}${imgFileName}`;
}
