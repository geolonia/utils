/**
 * normalize allowed origins string set
 * @param {any} allowedOrigins
 * @returns
 */
export const normalizeOrigins = (lineDelimetedAllowedOrigins: string) => {
  const allowedOrigins = lineDelimetedAllowedOrigins.split(/[\n,]/);
  if (!Array.isArray(allowedOrigins) || allowedOrigins.length === 0) {
    return [];
  }
  const filteredOrigins = allowedOrigins.reduce<Set<string>>((prev, rawOrigin) => {
    const urlPattern = /^(?<protocol>https?):\/\/(?<hostAndPort>[^/]+)(?<directory>(\/.*)?(\?.*)?(#.*)?)$/g;
    if (rawOrigin && typeof rawOrigin === 'string') {
      const origin = rawOrigin.trim();
      if (origin === '*') {
        prev.add(origin);
      } else {
        try {
          const { groups: { protocol, hostAndPort } } = (urlPattern.exec(origin) || {}) as { groups: { protocol: any, hostAndPort: any, directory: any } };
          if (protocol && hostAndPort) {
            const origin = `${protocol}://${hostAndPort}`;
            prev.add(origin);
          }
        } catch (_e) {
          // skip invalid URL
        }
      }
    }
    return prev;
  }, new Set([]));

  if (filteredOrigins.size > 0) {
    return Array.from(filteredOrigins);
  } else {
    return [];
  }
};
