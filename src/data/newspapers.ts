// src/data/newspapers.ts
//
// The newspaper digitization program, as data.
//
// Lifted out of cv.astro 2026-09-09 so the CV is not the only thing that can
// read it. This is the module a future /projects/newspapers page imports; the
// CV's "Cataloging and Metadata Projects" section and its year view both
// already derive from it, so there is one place to add a title.
//
// NOTE: Snyder Daily News appears twice under 2026 (14,782 issues, complete;
// and 1,238 issues). Left as recorded - merge the rows if that is a duplicate
// rather than a second run.

export type Paper = {
  title: string;
  /** Years covered by the run, where known. */
  span?: string;
  issues: number;
  status?: 'Complete' | 'Ongoing';
};

export type PaperGroup = {
  /** Label as printed on the page. */
  group: string;
  /** Single year the group is filed under in a chronology. */
  year: string;
  items: Paper[];
};

export const NEWSPAPERS: PaperGroup[] = [
  {
    group: '2026',
    year: '2026',
    items: [
      { title: 'Wichita Falls Times Record News', span: '1920\u20131929', issues: 2725, status: 'Ongoing' },      
      { title: 'Snyder Daily News', span: '1941\u20132004', issues: 14782, status: 'Complete' },
      { title: 'Midland Reporter-Telegram', span: '1981\u20132018', issues: 10757, status: 'Complete' },
      { title: 'Lubbock Avalanche-Journal', span: '1926\u20131930', issues: 2819, status: 'Ongoing' },
      { title: 'Colorado City Record', issues: 5135, status: 'Complete' },
      { title: 'Snyder Daily News', issues: 1238, status: 'Complete' },
      { title: 'Dawson County Courier', issues: 874, status: 'Ongoing' },
      { title: 'Junction Eagle', issues: 699, status: 'Ongoing' },
      { title: 'West Texas Baptist', issues: 586, status: 'Complete' },
    ],
  },
  {
    group: '2025',
    year: '2025',
    items: [
      { title: 'Mitchell County News', issues: 2074, status: 'Complete' },
      { title: 'Perryton Herald', issues: 1848, status: 'Ongoing' },
      { title: 'Texas Live Stock Journal', issues: 634, status: 'Complete' },
      { title: 'Portales Valley News', issues: 554, status: 'Ongoing' },
      { title: 'Friona Star', issues: 51, status: 'Complete' },
    ],
  },
  {
    group: '2024\u20132022',
    year: '2024',
    items: [
      { title: 'Talco Times', issues: 2890, status: 'Complete' },
      { title: 'Texas Christian Advocate', issues: 2543, status: 'Complete' },
      { title: 'Burkburnett Star', issues: 2336, status: 'Complete' },
      { title: 'Abernathy Review', issues: 1568, status: 'Complete' },
      { title: 'Neu-Braunfelser Zeitung', issues: 1487, status: 'Complete' },
      { title: 'Stanton Reporter', issues: 1209, status: 'Complete' },
      { title: 'El Mosquito', issues: 861, status: 'Complete' },
    ],
  },
];

export const groupTotal = (g: PaperGroup) =>
  g.items.reduce((t, i) => t + i.issues, 0);

export const issuesTotal = NEWSPAPERS.reduce((s, g) => s + groupTotal(g), 0);

export const titleCount = NEWSPAPERS.reduce((s, g) => s + g.items.length, 0);
