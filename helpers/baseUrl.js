export const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'https://back.joe13th.com').replace(/\/+$/, '');

export const baseImage = (url) => baseUrl + url;
