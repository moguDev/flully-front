export const removeParamsFromUrl = (url: string | null): string | null => {
  if (url) {
    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".webp",
      ".bmp",
      ".tiff",
    ];

    for (const ext of imageExtensions) {
      const extIndex = url.indexOf(ext);
      if (extIndex !== -1) {
        return url.slice(0, extIndex + ext.length);
      }
    }

    return url;
  }
  return null;
};
