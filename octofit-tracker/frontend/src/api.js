const CODESPACE_URL_REGEX = /^(?<name>.+)-(?<port>\d+)\.app\.github\.dev$/;

export function getCodespaceName() {
  if (process.env.REACT_APP_CODESPACE_NAME) {
    return process.env.REACT_APP_CODESPACE_NAME;
  }

  if (typeof window === 'undefined') {
    return null;
  }

  const hostname = window.location.hostname;
  const match = hostname.match(CODESPACE_URL_REGEX);
  return match?.groups?.name ?? null;
}

export function getCodespaceHost() {
  if (typeof window === 'undefined') {
    return null;
  }

  const hostname = window.location.hostname;
  const match = hostname.match(CODESPACE_URL_REGEX);
  if (!match?.groups?.name) {
    return null;
  }

  return `${match.groups.name}-8000.app.github.dev`;
}

export function getApiBaseUrl() {
  if (process.env.NODE_ENV === 'development') {
    const baseUrl = '/api';
    console.log('[api] development proxy base URL:', baseUrl);
    return baseUrl;
  }

  const codespaceHost = getCodespaceHost();
  if (codespaceHost) {
    const baseUrl = `https://${codespaceHost}/api`;
    console.log('[api] codespace backend base URL:', baseUrl);
    return baseUrl;
  }

  const protocol = typeof window !== 'undefined' ? window.location.protocol : 'http:';
  const baseUrl = `${protocol}//localhost:8000/api`;
  console.log('[api] local backend base URL:', baseUrl);
  return baseUrl;
}

export function getApiUrl(resource) {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/${resource}/`;
  console.log('[api] REST API endpoint:', endpoint);
  return endpoint;
}

export function normalizeResponse(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.results)) return data.results;
  return [data];
}
