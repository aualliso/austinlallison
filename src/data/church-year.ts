/**
 * church-year.ts — the season of the Western church year on a given day,
 * and the colour of that season.
 *
 * Used by src/pages/faith.astro twice: once when the page is built, so the
 * ribbon has a colour with no script at all, and again in the browser, so
 * a page built weeks ago still shows today's season.
 *
 * THE YEAR, as most Western churches keep it:
 *
 *   Advent            violet   the fourth Sunday before Christmas to Christmas Eve
 *   Christmastide     white    25 December to 5 January
 *   Epiphany          white    6 January
 *   Ordinary Time     green    from Epiphany to Ash Wednesday, and from the
 *                              day after Pentecost to Advent
 *   Ash Wednesday     violet   46 days before Easter
 *   Lent              violet   to Palm Sunday
 *   Palm Sunday       red      the Sunday before Easter
 *   Holy Week         violet   the days between, but for
 *   Good Friday       red
 *   Easter Day        white
 *   Eastertide        white    the fifty days to Pentecost
 *   Pentecost         red      the fiftieth day
 *   Trinity Sunday    white    the Sunday after Pentecost
 *   Christ the King   white    the Sunday before Advent
 *
 * Traditions differ in the details (blue for Advent, black for Good
 * Friday, rose for two Sundays); these are the common colours.
 */

export type LiturgicalColour = 'violet' | 'white' | 'red' | 'green';

export interface Season {
  name: string;
  colour: LiturgicalColour;
}

/** Days since 1970 for a calendar date, free of time zones and DST. */
const dayOf = (year: number, month: number, date: number) => Date.UTC(year, month - 1, date) / 86_400_000;

/** Easter Day in the Gregorian calendar (the Meeus/Jones/Butcher rule). */
export function easter(year: number): number {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const date = ((h + l - 7 * m + 114) % 31) + 1;
  return dayOf(year, month, date);
}

/** The first Sunday of Advent: the fourth Sunday before Christmas. */
export function adventSunday(year: number): number {
  const christmas = dayOf(year, 12, 25);
  const weekday = new Date(christmas * 86_400_000).getUTCDay(); // 0 is Sunday
  return christmas - (weekday === 0 ? 7 : weekday) - 21;
}

/** The season on the calendar date of `when`, in the local time zone. */
export function seasonOn(when: Date): Season {
  const year = when.getFullYear();
  const t = dayOf(year, when.getMonth() + 1, when.getDate());

  const advent = adventSunday(year);
  const christmas = dayOf(year, 12, 25);
  const pascha = easter(year);
  const ash = pascha - 46;
  const palm = pascha - 7;
  const goodFriday = pascha - 2;
  const pentecost = pascha + 49;
  const trinity = pascha + 56;
  const christTheKing = advent - 7;

  if (t >= christmas || t <= dayOf(year, 1, 5)) return { name: 'Christmastide', colour: 'white' };
  if (t >= advent) return { name: 'Advent', colour: 'violet' };
  if (t === dayOf(year, 1, 6)) return { name: 'Epiphany', colour: 'white' };
  if (t === ash) return { name: 'Ash Wednesday', colour: 'violet' };
  if (t > ash && t < palm) return { name: 'Lent', colour: 'violet' };
  if (t === palm) return { name: 'Palm Sunday', colour: 'red' };
  if (t === goodFriday) return { name: 'Good Friday', colour: 'red' };
  if (t > palm && t < pascha) return { name: 'Holy Week', colour: 'violet' };
  if (t === pascha) return { name: 'Easter Day', colour: 'white' };
  if (t > pascha && t < pentecost) return { name: 'Eastertide', colour: 'white' };
  if (t === pentecost) return { name: 'Pentecost', colour: 'red' };
  if (t === trinity) return { name: 'Trinity Sunday', colour: 'white' };
  if (t === christTheKing) return { name: 'Christ the King', colour: 'white' };
  return { name: 'Ordinary Time', colour: 'green' };
}
