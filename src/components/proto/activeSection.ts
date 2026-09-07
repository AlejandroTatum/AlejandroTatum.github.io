/**
 * Scroll-spy rule shared by the fixed chrome tabs.
 *
 * The active section is the last one whose top has crossed a reference
 * line near the top of the viewport. Compared with "which section overlaps
 * the middle of the screen", this never mis-highlights the next section
 * when the current one is shorter than half the viewport (the about and
 * contact sections on tall monitors), and it never leaves a gap between
 * sections. When the page is scrolled to its very end the last section
 * wins, because on tall viewports it may never reach the line at all.
 */

/** Fraction of the viewport used for the reference line on short screens. */
const LINE_VIEWPORT_RATIO = 0.45;
/** Cap for the reference line on tall screens, in CSS px. */
const LINE_MAX_PX = 320;
/** Slack for fractional scroll positions at the end of the page. */
const END_OF_PAGE_SLACK_PX = 2;

export function activeLinePx(viewportHeight: number): number {
  return Math.min(viewportHeight * LINE_VIEWPORT_RATIO, LINE_MAX_PX);
}

/**
 * @param tops       Section tops relative to the viewport, in document order.
 * @param linePx     Reference line offset from the top of the viewport.
 * @param atPageEnd  Whether the document is scrolled to its maximum.
 * @returns the index of the active section (0 when nothing crossed the line).
 */
export function resolveActiveSection(tops: readonly number[], linePx: number, atPageEnd: boolean): number {
  if (tops.length === 0) return -1;
  if (atPageEnd) return tops.length - 1;
  let active = 0;
  tops.forEach((top, index) => {
    if (top <= linePx) active = index;
  });
  return active;
}

export function isAtPageEnd(scrollY: number, scrollHeight: number, viewportHeight: number): boolean {
  return scrollY >= scrollHeight - viewportHeight - END_OF_PAGE_SLACK_PX;
}
