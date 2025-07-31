'use strict';

export function removeHTML(html) {
  if (!html) return '';

  html = html.replace(/<[^>]*>?/gm, '');

  // replace any non-breaking spaces with normal spaces
  html = html.replace(/&nbsp;/g, ' ');

  // remove any apos
  html = html.replace(/&apos;/g, "'");

  // remove any ampersands
  html = html.replace(/&amp;/g, '&');

  // remove any quotes
  html = html.replace(/&quot;/g, '"');

  // remove any less than signs
  html = html.replace(/&lt;/g, '<');

  // remove any greater than signs
  html = html.replace(/&gt;/g, '>');

  // remove any leading or trailing spaces
  html = html.trim();

  // remove any double spaces
  html = html.replace(/\s\s+/g, ' ');

  // remove any trailing newlines
  html = html.replace(/\n\s*\n/g, '\n');

  // remove any leading newlines
  html = html.replace(/^\s*\n/g, '');
  return html;
}
