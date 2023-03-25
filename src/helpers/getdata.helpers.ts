import cheerio from 'cheerio';
import { PreviewModel } from 'models/preview.mode';
import { validateUrl } from './validate.helpers';
import { getAbsolutePath } from './general.helpers';

export const getDomain = (url: string): string | undefined => {
  if (!validateUrl(url)) { return undefined; }

  const urlObj = new URL(url);
  return urlObj.hostname.replace('www.', '');
};

export const getTitle = (html: cheerio.Root): string | undefined => {
  const title = html("meta[property='og:title']").attr('content');
  return !title ? html('title').text() : title;
};

export const getImage = (url: string, html: cheerio.Root): string | undefined => {
  const image = html("meta[property='og:image']").attr('content');
  return image ? getAbsolutePath(url, image) : image;
};

export const getFavicon = (url: string, html: cheerio.Root): string | undefined => {
  const favicon = html("link[rel='icon']").attr('href');
  return favicon ? getAbsolutePath(url, favicon) : favicon;
};

export const getDescription = (html: cheerio.Root): string | undefined => html("meta[property='og:description']").attr(
  'content',
);

export const getSitename = (html: cheerio.Root): string | undefined => html("meta[property='og:site_name']").attr('content');

export const getOgUrl = (html: cheerio.Root): string | undefined => html("meta[property='og:url']").attr('content');

export const getType = (html: cheerio.Root): string | undefined => html("meta[property='og:type']").attr('content');

export const getAll = (url: string, html: cheerio.Root) => {
  const title = getTitle(html);
  const description = getDescription(html);
  const image = getImage(url, html);
  const sitename = getSitename(html);
  const ogUrl = getOgUrl(html);
  const type = getType(html);
  const domain = getDomain(url);
  const favicon = getFavicon(url, html);

  const preview: PreviewModel = {
    title, description, image, sitename, ogUrl, type, domain, favicon,
  };
  return preview;
};
