import { validateUrl } from './validate.helpers';

export const getAbsolutePath = (url: string, relativePath: string): string | undefined => {
  if (!validateUrl(url)) {
    return undefined;
  }

  const { origin, pathname } = new URL(url);

  if (relativePath.slice(0, 1) === '/') {
    return origin + pathname + relativePath.slice(1);
  }

  if (relativePath.slice(0, 2) === './') {
    return origin + pathname + relativePath.slice(2);
  }

  return relativePath;
};
