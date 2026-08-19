// src/data/publications/spring-sprung-it.ts
// Published version of record. Journal of the West does not issue DOIs, so
// `doi` is absent; the shared formatters omit it rather than printing a gap.

import type { Citation, Note, FigureSet } from '../../lib/citation';
import {
  pages,
  citeChicago as chicago,
  citeMla as mla,
  citeBibtex as bibtex,
} from '../../lib/citation';

export const CITATION: Citation = {
  title:
    'A Spring Sprung It: Tracing and Understanding the True Genesis of North America\u2019s Longest River',
  displayTitle: 'A Spring Sprung It',
  subtitle:
    'Tracing and Understanding the True Genesis of North America\u2019s Longest River',
  authors: ['Austin Allison'],
  orcid: 'https://orcid.org/0000-0001-6787-9636',
  status: 'record',
  journal: 'Journal of the West',
  journalAbbrev: 'JOW',
  volume: '58',
  issue: '3',
  year: 2019,
  firstPage: 6,
  lastPage: 21,
  // no doi, no issn - left absent rather than guessed
  language: 'en',
  canonicalPath: '/publications/spring_sprung_it',
  versions: [],
};

/** Bound wrappers, so the page calls these with no argument. */
export const pageRange = (): string => pages(CITATION.firstPage, CITATION.lastPage);
export const citeChicago = (): string => chicago(CITATION);
export const citeMla = (): string => mla(CITATION);
export const citeBibtex = (): string => bibtex(CITATION, 'allison2019spring');

/**
 * Order of `entries` determines figure numbering.
 * `alt` values are Austin's own, carried over from the original page.
 */
export const FIGURES: FigureSet = {
  dir: 'spring_sprung_it',
  entries: [
    {
      id: 'three-forks-confluence',
      plates: [
        {
          file: 'confluence_three_forks_1919.jpg',
          alt: 'Confluence of the Jefferson, Gallatin, and Madison rivers near Three Forks, Montana',
        },
      ],
      caption:
        'Confluence of the Jefferson River, the Gallatin River, and the Madison River near Three Forks, Montana. This photograph appeared on a 1919 postcard.',
      credit: 'Public domain',
      size: '3xl',
    },
    {
      id: 'culvers-canyon-map',
      plates: [
        {
          file: 'culvers_canyon_map_1896.jpg',
          alt: 'Map of Culver\u2019s Canyon published in Brower\u2019s 1896 and 1897 books',
        },
      ],
      caption:
        'Map of Culver\u2019s Canyon published in Brower\u2019s 1896 and 1897 books. The map marks Lillian Lake, Hanson Mountain, and the utmost branch of the Missouri, but it does not mark the Hole in the Mountains or the utmost spring of the Missouri River.',
      credit:
        'From Brower, <em>The Missouri River and Its Utmost Source</em> (1896). Public domain',
      size: '3xl',
    },
    {
      id: 'culvers-canyon-downed-trees',
      plates: [
        {
          file: 'culvers_canyon_downed_trees.jpg',
          alt: 'View at the lower extremity of Culver\u2019s Canyon showing trees downed in the river',
        },
      ],
      caption:
        'View at the lower extremity of Culver\u2019s Canyon showing trees downed in the river. This is an example of the treacherous hike Brower was confronted with during his exploration.',
      credit:
        'From Brower, <em>The Missouri River and Its Utmost Source</em> (1896). Public domain',
      size: '3xl',
    },
    {
      id: 'brower-hole-in-mountains',
      plates: [
        {
          file: 'brower_hole_in_mountains.jpg',
          alt: 'Photograph of Brower at the Hole in the Mountains',
        },
      ],
      caption:
        'One of two photographs taken at Brower\u2019s Hole in the Mountains. This photograph shows Brower in the foreground and is subtitled \u201cView at the Source of the Missouri River.\u201d This was one of the photographs that the author used during his attempt to digitally recreate this scene with Google Earth.',
      credit:
        'From Brower, <em>The Missouri River and Its Utmost Source</em> (1896). Public domain',
      size: '3xl',
    },
    {
      id: 'stone-monuments',
      plates: [
        {
          file: 'stone_monuments_grid.jpg',
          alt: 'Photographs of stone monuments erected by Brower and his team',
        },
      ],
      caption:
        'Photographs of stone monuments erected by Brower and his team on the border of Montana and Idaho.',
      credit:
        'From Brower, <em>The Missouri River and Its Utmost Source</em> (1896). Public domain',
      size: '3xl',
    },
    {
      id: 'centennial-mountains-map',
      plates: [
        {
          file: 'centennial_mountains_map.jpg',
          alt: 'Map of the eastern Centennial Mountains and Valley and the Alaska Basin',
        },
      ],
      caption:
        'Map of the eastern Centennial Mountains and Valley and the Alaska Basin.',
      credit:
        'Created by the author from topographical maps published by the United States Geological Survey',
      size: '3xl',
    },
    {
      id: 'culver-hole-in-mountains',
      plates: [
        {
          file: 'culver_hole_in_mountains.jpg',
          alt: 'Photograph of Culver at the Hole in the Mountains',
        },
      ],
      caption:
        'The second of two photographs taken at Brower\u2019s Hole in the Mountains. This is a photograph of William N. Culver standing in the foreground. Although this photograph was taken at the same location as the photograph of Brower, it is subtitled \u201cThe Hole in the Mountains.\u201d',
      credit:
        'From Brower, <em>The Missouri River and Its Utmost Source</em> (1896). Public domain',
      size: '3xl',
    },
    {
      id: 'utmost-spring-closeup',
      plates: [
        {
          file: 'utmost_spring_closeup.jpg',
          alt: 'Utmost spring of the Missouri River at the head of Culver\u2019s Canyon',
        },
      ],
      caption:
        'Utmost spring of the Missouri River at the head of Culver\u2019s Canyon. Lillian Culver described the spring as coming \u201cfrom under a large black rock on the side of the mountain.\u201d Near this site, modern hikers and explorers erected a rock mound under which is buried a container for visitors to deposit their names.',
      credit: 'Photograph courtesy of the author',
      size: '3xl',
    },
    {
      id: 'utmost-spring-wide',
      plates: [
        { file: 'utmost_spring_wide.jpg', alt: 'Wider view of the utmost spring location' },
      ],
      caption: 'Wider view of the utmost spring location.',
      credit: 'Photograph courtesy of the author',
      size: '3xl',
    },
    {
      id: 'brower-google-earth',
      plates: [
        {
          file: 'brower_google_earth_comparison.jpg',
          alt: 'Side-by-side comparison of Brower\u2019s photograph, Google Earth\u2019s rendering, and a modern photograph',
        },
      ],
      caption:
        'Side-by-side comparison of Brower\u2019s photograph of the Hole in the Mountains, Google Earth\u2019s rendering of the site, and a photograph of the author at the site. The photograph of the author was taken in August 2018 using a drone.',
      credit:
        'Left-hand photograph from Brower, <em>The Missouri River and Its Utmost Source</em> (1896). Public domain. Other illustrations courtesy of the author',
      size: '3xl',
    },
    {
      id: 'lillian-culver-portrait',
      plates: [
        { file: 'lillian_culver_portrait.jpg', alt: 'Undated photograph of Lillian Culver' },
      ],
      caption:
        'Undated photograph of Lillian Culver. Lillian Culver, like Brower, explored Culver\u2019s Canyon in search of the source of the Missouri River. In fact, she may have been the one to mark the true source of the river.',
      credit:
        'From Brower, <em>The Missouri River and Its Utmost Source</em> (1896). Public domain',
      size: 'sm',
    },
  ],
};

export const NOTES: Note[] = [

  { n: 1, html: `Brower published his research in an 1896 book titled The Missouri River and Its Utmost Source. Only 300 copies of this first edition were published. This edition was distributed chiefly to libraries and historical societies, but Brower amended his initial findings with an expanded volume released in 1897. Brower published 500 copies of the second edition. For this article, I make use of the 1897 edition, for it contains the entire compilation of Brower&rsquo;s work.` },
  { n: 2, html: `Thomas Jefferson to Meriwether Lewis, June 20, 1803. Library of Congress Manuscript/Mixed Material. https://www.loc.gov/item/mtjbib012509/.` },
  { n: 3, html: `Meriwether Lewis, August 12, 1805, entry in The Journals of the Lewis and Clark Expedition, ed. Gary Moulton (Lincoln, NE: University of Nebraska Press / University of Nebraska-Lincoln Libraries-Electronic Text Center, 2005), https://lewisandclarkjournals.unl.edu/item/lc.jrn.1805-08-12.` },
  { n: 4, html: `U.S. Geological Survey, 19810501, U.S. Geographic Names Information System (GNIS): U.S. Geological Survey, Reston, VA.` },
  { n: 5, html: `Jacob Vandenberg, The Missouri River and Its Utmost Source (Minneapolis: Pioneer Press, 1897), 107.` },
  { n: 6, html: `USGS maps identify Culver&rsquo;s Canyon as Hell Roaring Canyon, but Brower chose not to use this designation. He noted that he did not like this name and chose instead to name the canyon in honor of the Centennial Valley rancher William N. Culver. Brower contested the Hell Roaring Canyon name, but his efforts failed. The canyon still bears its original name. Brower&rsquo;s concern for this name seems justified, for there are at least two other canyons and numerous creeks that bear the same name. This article makes use of Brower&rsquo;s name for the canyon to establish a delineation between Hell Roaring Creek and Hell Roaring Canyon. Culver&rsquo;s Canyon should be recognized as the same as Hell Roaring Canyon.` },
  { n: 7, html: `Ibid., 109.` },
  { n: 8, html: `Ibid., 110.` },
  { n: 9, html: `U.S. Geological Survey Geographic Names Information System: Madison River.` },
  { n: 10, html: `Ibid., Gibbon River.` },
  { n: 11, html: `Ibid., Gallatin River.` },
  { n: 12, html: `Brower, 110, 150.` },
  { n: 13, html: `U.S. Geological Survey Geographic Names Information System: Beaverhead River.` },
  { n: 14, html: `United States Board on Geographic Names. Case Brief 685.01. Red Rock River, Red Rock Creek, Hell Roaring Creek. In 1965, the Board conducted a survey of the three creeks to clarify their streambeds. The Red Rock River is noted as being 60 miles, Red Rock Creek 21 miles, and Hell Roaring Creek 9 miles. This total distance, along with the Jefferson River&rsquo;s 69 mile length, totals 159 miles.` },
  { n: 15, html: `U.S. Geological Survey Geographic Names Information System: Big Hole River.` },
  { n: 16, html: `Brower, 110&ndash;113.` },
  { n: 17, html: `&ldquo;Headwaters of the Missouri,&rdquo; Saint Paul Daily Globe (Saint Paul, Minn.), May 10, 1896.` },
  { n: 18, html: `Brower, 136&ndash;147.` },
  { n: 19, html: `&ldquo;Centennial,&rdquo; The Dillon Tribune (Dillon, Mont.), August 7, 1896.` },
  { n: 20, html: `Jacob Vandenberg Brower to William N. Culver, September 3rd, 1896, box 1, folder 1, collection 2147, Lillian E. H. Culver Papers, Montana State University&mdash;Bozeman Library, Merrill G. Burlingame Special Collections.` },
  { n: 21, html: `Ibid., 146.` },
  { n: 22, html: `&ldquo;Bare Walls Stand: East Half of the Ryan Annex and the Schutte Block Are Now Dismantled Ruins.&rdquo; Saint Paul Globe (Saint Paul, Minn.), December 20, 1896.` },
  { n: 23, html: `Brower, 169, 200.` },
  { n: 24, html: `Ibid., frontispiece, 112.` },
  { n: 25, html: `Ibid, 115.` },
  { n: 26, html: `Ibid, 121.` },
  { n: 27, html: `Donald F. Nell and Anthony Demetriades, &ldquo;The Utmost Reaches of the Missouri,&rdquo; We Proceeded On 28, no. 4 (Nov. 2002): 29&ndash;33.` },
  { n: 28, html: `U.S. Geological Survey. Hebgen Lake, Mont.-Idaho-Wyo. [map]. 1:100,000. 30 x 60 Minute Quadrangle. Washington, DC: USGS, 1993.` },
  { n: 29, html: `Centennial Valley Historical Society, Centennial Valley: A Journey Through Time 1820&ndash;1930, Vol. 1. (Butte, Mont.: Artcraft Printers, 2006), 2.` },
];

export const note = (n: number): Note | undefined => NOTES.find((x) => x.n === n);
