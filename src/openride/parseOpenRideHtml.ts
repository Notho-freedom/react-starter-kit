export type ParsedOpenRideHtml = {
  bodyClassName: string;
  bodyHtml: string;
  documentTitle: string;
  styles: string[];
};

const BODY_REGEX = /<body\b([^>]*)>([\s\S]*?)<\/body>/i;
const TITLE_REGEX = /<title>([\s\S]*?)<\/title>/i;
const STYLE_REGEX = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
const SCRIPT_REGEX = /<script\b[^>]*>[\s\S]*?<\/script>/gi;
const INLINE_HANDLER_REGEX = /\s+on[a-z-]+=(["'])[\s\S]*?\1/gi;
const BODY_CLASS_REGEX = /\bclass=(["'])([\s\S]*?)\1/i;

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function preserveKnownInteractions(html: string) {
  return html.replace(
    /\s+onclick=(["'])toggleView\((?:&#39;|')([^'"]+)(?:&#39;|')\)\1/gi,
    ' data-openride-toggle="$2"',
  );
}

function stripScripts(html: string) {
  return html.replace(SCRIPT_REGEX, "");
}

function stripInlineHandlers(html: string) {
  return html.replace(INLINE_HANDLER_REGEX, "");
}

export function parseOpenRideHtml(rawHtml: string): ParsedOpenRideHtml {
  const titleMatch = rawHtml.match(TITLE_REGEX);
  const bodyMatch = rawHtml.match(BODY_REGEX);
  const styles = Array.from(rawHtml.matchAll(STYLE_REGEX), (match) => match[1]).filter(Boolean);
  const bodyAttributes = bodyMatch?.[1] ?? "";
  const bodyHtml = bodyMatch?.[2] ?? rawHtml;
  const preservedHtml = preserveKnownInteractions(bodyHtml);
  const cleanedHtml = stripInlineHandlers(stripScripts(preservedHtml)).trim();
  const bodyClassName = decodeHtmlEntities(bodyAttributes.match(BODY_CLASS_REGEX)?.[2] ?? "").trim();
  const documentTitle = decodeHtmlEntities(titleMatch?.[1]?.trim() ?? "OpenRide");

  return {
    bodyClassName,
    bodyHtml: cleanedHtml,
    documentTitle,
    styles,
  };
}
