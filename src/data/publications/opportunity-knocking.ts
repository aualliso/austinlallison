// src/data/publications/opportunity-knocking.ts
// Published version of record. Note: Panhandle-Plains Historical Review does
// not issue DOIs, so `doi` is absent throughout. The shared formatters and
// ScholarlyMeta omit DOI fields rather than printing an empty one.

import type { Citation, Note, FigureSet } from '../../lib/citation';
import {
  pages,
  citeChicago as chicago,
  citeMla as mla,
  citeBibtex as bibtex,
} from '../../lib/citation';

export const CITATION: Citation = {
  title:
    '\u2018Opportunity Knocking\u2019: The Vaughan Land Company and Early Bailey County Development',
  authors: ['Austin Allison'],
  orcid: 'https://orcid.org/0000-0001-6787-9636',
  status: 'record',
  journal: 'Panhandle-Plains Historical Review',
  journalAbbrev: 'PPHR',
  publisher: 'Panhandle-Plains Historical Society',
  volume: '96',
  // no issue number: PPHR is published as a single annual volume
  year: 2025,
  firstPage: 40,
  lastPage: 65,
  // no doi, no issn - left absent rather than guessed
  language: 'en',
  canonicalPath: '/publications/opportunity_knocking',
  // Only one version of this article is online, so the masthead version
  // switcher does not render. Add entries here if that changes.
  versions: [],
};

/** Bound wrappers, so the page calls these with no argument. */
export const pageRange = (): string => pages(CITATION.firstPage, CITATION.lastPage);
export const citeChicago = (): string => chicago(CITATION);
export const citeMla = (): string => mla(CITATION);
export const citeBibtex = (): string => bibtex(CITATION, 'allison2025opportunity');

/**
 * Order of `entries` determines figure numbering.
 * `alt` values are Austin's own, carried over from the original page. Four of
 * the six restate their caption almost word for word; emptying those would
 * stop a screen reader hearing the same sentence twice, but they are his
 * words so they are kept as written.
 */
export const FIGURES: FigureSet = {
  dir: 'opportunity_knocking',
  entries: [
    {
      id: 'vaughan-ad-1911',
      plates: [
        {
          file: 'vaughan_land_company_ad_1911.jpg',
          alt: 'Vaughan Land Company advertisement with portrait of M.C. Vaughan',
        },
      ],
      caption:
        'Vaughan Land Company advertisement with portrait of M.C. Vaughan, circa 1910.',
      credit: 'Waterloo Courier (Waterloo, Iowa), July 6, 1911',
      size: '3xl',
    },
    {
      id: 'vvn-ranch-1898',
      plates: [
        {
          file: 'old_vvn_ranch_1898.jpg',
          alt: 'Image of the \u201cOld VVN Ranch\u201d taken in 1898',
        },
      ],
      caption: 'The \u201cOld VVN Ranch,\u201d photographed in 1898.',
      credit: 'Courtesy of the National Cowboy &amp; Western Heritage Museum',
      size: '3xl',
    },
    {
      id: 'texas-steer-pamphlet',
      plates: [
        {
          file: 'texas_steer_pamphlet_1907.jpg',
          alt: 'Image of \u201cA Texas Steer\u201d pamphlet issued in 1907',
        },
      ],
      caption:
        '\u201cA Texas Steer\u201d pamphlet issued in 1907 by the Texas &amp; Southwest Colonization Company.',
      credit: 'Courtesy of the Beinecke Library, Yale University',
      size: '3xl',
    },
    {
      id: 'ow-kerr-portrait',
      plates: [{ file: 'ow_kerr_portrait.jpg', alt: 'Portrait of O.W. Kerr' }],
      caption: 'Portrait of O.W. Kerr.',
      credit: 'Courtesy of Austin Allison',
      size: 'sm',
    },
    {
      id: 'monument-lake-ad',
      plates: [
        {
          file: 'monument_lake_ranch_ad_1908.jpg',
          alt: 'Sample advertisement for \u201cMonument Lake Ranch\u201d in Bailey County',
        },
      ],
      caption:
        'Sample advertisement for \u201cMonument Lake Ranch\u201d in Bailey County.',
      credit:
        'Courtesy of the State Center Enterprise (State Center, Iowa), November 19, 1908',
      size: '3xl',
    },
    {
      id: 'vaughan-cars-portales',
      plates: [
        {
          file: 'vaughan_cars_portales.jpg',
          alt: 'Image of Vaughan Land Company cars in Portales, New Mexico',
        },
      ],
      caption:
        'Vaughan Land Company cars in Portales, New Mexico, prior to an excursion to Bailey County. From the \u201cTexas South Plains Lands\u201d pamphlet issued in 1909.',
      credit: 'Courtesy of Beinecke Library, Yale University',
      size: '3xl',
    },
  ],
};

export const NOTES: Note[] = [

  { n: 1, html: `Waterloo Daily Courier, January 18, 1909.` },
  { n: 2, html: `Charles Barnard and John Jones, Farm Real Estate Values in the United States by Counties, 1850-1982 (Washington D.C.: U.S. Department of Agriculture, 1987), 93.` },
  { n: 3, html: `United States, Census, 1900; Jacksboro Gazette, May 17, 1900; Karen Mason and Lisa Cope, &ldquo;Sources of Age and Date-of-Birth Misreporting in the 1900 U.S. Census Information,&rdquo; Demography 24, No. 4 (November 1987), 570.` },
  { n: 4, html: `&ldquo;Capitol Land Reservation,&rdquo; Map, GLO File #76175, Maddox Collection, Texas General Land Office` },
  { n: 5, html: `[H.S. Melven to Leon Blum et al.], Bailey County Deed Records, Book 1, 1, Bailey County Courthouse, Muleshoe, Texas.` },
  { n: 6, html: `Alice Gray Upchurch, &ldquo;Fifty Cent Act,&rdquo; Handbook of Texas Online, accessed January 4, 2025, https://www.tshaonline.org/handbook/entries/fifty-cent-act.` },
  { n: 7, html: `Morrison &amp; Fourmy, Morrison &amp; Fourmy&rsquo;s General Directory of the City of Galveston: 1896-1897, (Galveston, Texas: Morrison &amp; Fourmy, 1896), 12.` },
  { n: 8, html: `Diana J. Kleiner, &ldquo;Leon and H. Blum,&rdquo; Handbook of Texas Online, accessed January 4, 2025, https://www.tshaonline.org/handbook/entries/leon-and-h-blum.` },
  { n: 9, html: `Galveston Daily News, July 18, 1885.` },
  { n: 10, html: `Galveston Daily News, October 4, 1882; Fannin Scrip files, Melven, Blum, and Blum File 16626, Abstract 89, Bailey County, Texas General Land Office, Austin, Texas.` },
  { n: 11, html: `State of Texas v. W. H. Sulflow et al., 60 Tex. Civ. App. 615, May 4, 1910.` },
  { n: 12, html: `[Capitol Lands field note book compiled by J.T. Munson], 1880, File #81701, General Map Collection, Texas General Land Office, Austin, Texas, 654.` },
  { n: 13, html: `Fannin Scrip files, Melven, Blum, and Blum File 16643, Abstract 64, Bailey County, Texas General Land Office, Austin, Texas.` },
  { n: 14, html: `John Miller Morris, El Llano Estacado: exploration and imagination on the High Plains of Texas and New Mexico, 1536-1860 (Austin: Texas State Historical Association, 1997), 189.` },
  { n: 15, html: `United States Geological Survey, EarthExplorer, Aerial Image, Entity ID: AR1VGB0004A0048, AR1VGB0004A0049.` },
  { n: 16, html: `Ernest Wallace, cartographer, Colonel R.S. Mackenzie&rsquo;s 1872 Campaign, Map, (Lubbock, Texas, 1950).` },
  { n: 17, html: `Morris, El Llano Estacado, 188.` },
  { n: 18, html: `Henry &ldquo;Hank&rdquo; Clay Smith, cartographer, [Map of a new mail route to Fort Sumner from Mount Blanco], Map File, DeGolyer Library, Southern Methodist University.` },
  { n: 19, html: `&ldquo;Capitol Land Reservation,&rdquo; Map, GLO File #76175, Maddox Collection, Texas General Land Office; State of Texas v. W. H. Sulflow et al.: &ldquo;that just before arriving at said corner they met a man by the name of Carter, who was holding his cattle at a lake nearby, who showed them what he said was the northwest corner of said league 628.&rdquo;` },
  { n: 20, html: `Galveston Daily News, April 5, 1882.` },
  { n: 21, html: `H. Allen Anderson, &ldquo;Carter, James W.,&rdquo; Handbook of Texas Online, accessed January 3, 2025, https://www.tshaonline.org/handbook/entries/carter-james-w.` },
  { n: 22, html: `Frank Collinson, Life in the Saddle (Norman, Oklahoma: University of Oklahoma Press, 1963), 70-71.` },
  { n: 23, html: `Fort Worth Daily Gazette, April 12, 1890.` },
  { n: 24, html: `The Fairplay Flume, April 15, 1880.` },
  { n: 25, html: `Fremont County Record, August 20, 1881.` },
  { n: 26, html: `Rocky Mountain News, March 14, 1884.` },
  { n: 27, html: `James Cox, Historical and Biographical Record of the Cattle Industry and the Cattlemen of Texas and Adjacent Territory (publisher not identified, 1895), 505.` },
  { n: 28, html: `Carlsbad Current Argus, December 11, 1896; Roberta S. Duncan, &ldquo;Williams, Elizabeth Ellen Johnson [Lizzie],&rdquo; Handbook of Texas Online, accessed January 3, 2025, https://www.tshaonline.org/handbook/entries/williams-elizabeth-ellen-johnson-lizzie; Jimmy M. Skaggs, &ldquo;Moore, Thomas Jefferson,&rdquo; Handbook of Texas Online, accessed January 3, 2025, https://www.tshaonline.org/handbook/entries/moore-thomas-jefferson.; Live Stock Inspector, July 1, 1898.` },
  { n: 29, html: `San Antonio Light, March 25, 1896.` },
  { n: 30, html: `Galveston Tribune, May 23, 1896; Galveston Tribune, May 12, 1896; Galveston Tribune, April 22, 1896; Galveston Daily News, April 19, 1896.` },
  { n: 31, html: `Texas Stock and Farm Journal, May 24, 1899.` },
  { n: 32, html: `Dallas Morning News, June 27, 1900.` },
  { n: 33, html: `Texas Stock and Farm Journal, July 4, 1899; Bailey County Journal, June 30, 1963.` },
  { n: 34, html: `Couts v. Holland, 1908, 48 Tex. Civ. App. 476, 107 S.W. 913` },
  { n: 35, html: `Weatherford Weekly Herald, July 14, 1902.` },
  { n: 36, html: `William Curry Holden, Rollie Burns: or an account of the ranching industry on the South Plains (Dallas: The Southwest Press, 1932), 210.` },
  { n: 37, html: `Muleshoe Journal, April 18, 1940.` },
  { n: 38, html: `Dallas Morning News, October 21, 1905.` },
  { n: 39, html: `Naomi Hatton Kincaid, &ldquo;Simpson, John Nicholas,&rdquo; Handbook of Texas Online, accessed January 3, 2025, https://www.tshaonline.org/handbook/entries/simpson-john-nicholas; Fort Worth Star Telegram, September 30, 1907.` },
  { n: 40, html: `[Letter from W. Sloan Simpson to Theodore Roosevelt], November 27, 1904, Theodore Roosevelt Papers. Library of Congress Manuscript Division. https://www.theodorerooseveltcenter.org/Research/Digital-Library/Record?libID=o47783, Theodore Roosevelt Digital Library. Dickinson State University, accessed January 4, 2025.` },
  { n: 41, html: `Bailey County Journal, June 30, 1963; Muleshoe Journal, February 2, 1933; Amarillo Globe-Times, September 13, 1933.` },
  { n: 42, html: `Bailey County History Book Committee, Tales and Trails of Bailey County: The First Seventy Years, 1918-1988 (Muleshoe, Texas, Bailey County History Book Committee, 1988), 24.` },
  { n: 43, html: `Fort Worth Star Telegram, December 16, 1906.` },
  { n: 44, html: `Dallas Morning News, December 25, 1906.` },
  { n: 45, html: `Fort Worth Star Telegram, December 23, 1906.` },
  { n: 46, html: `Minneapolis Journal, December 30, 1906; Portales Times, January 5, 1907.` },
  { n: 47, html: `O.W. Kerr Company, The O.W. Kerr Co.: Lands, Investments (Minneapolis: A.B. Farnham Printing &amp; Stationery Co., 1907)` },
  { n: 48, html: `Portales Times, January 12, 1907.` },
  { n: 49, html: `Portales Times, January 26, 1907.` },
  { n: 50, html: `Minneapolis Journal, December 30, 1906.` },
  { n: 51, html: `Pella Chronicle, January 31, 1907.` },
  { n: 52, html: `Minneapolis Tribune, February 24, 1907.` },
  { n: 53, html: `Texas &amp; Southwest Colonization Co., A Texas Steer (Minneapolis: A.B. Farnham Printing and Stationery Co., 1907), Beinecke Rare Book &amp; Manuscript Library, Yale University.` },
  { n: 54, html: `Waterloo Courier, January 1, 1903.` },
  { n: 55, html: `Roosevelt County Herald, September 25, 1907.` },
  { n: 56, html: `Waterloo Daily Courier, June 5, 1907.` },
  { n: 57, html: `Waterloo Daily Courier, January 18, 1909.` },
  { n: 58, html: `Waterloo Daily Courier, September 28, 1907.` },
  { n: 59, html: `Webster County Argus, December 6, 1907.` },
  { n: 60, html: `Vaughan Land Company, Texas South Plains Land (Waterloo, Iowa: Vaughan Land Company, 1911), Beinecke Rare Book &amp; Manuscript Library, Yale University.` },
  { n: 61, html: `Waterloo Daily Courier, November 16, 1907.` },
  { n: 62, html: `Roosevelt County Herald, January 17, 1908; El Paso Herald, February 7, 1910; El Paso Herald, January 18, 1911; Waterloo Evening Courier, September 6, 1911.` },
  { n: 63, html: `Post Office Department, Location of Proposed Post Office: Montezuma, Texas, 1909, Record Group 28, M1126 - Post Office Department Reports of Site Locations, 1837-1950, Roll 564, National Archives.` },
  { n: 64, html: `Virginia City, Proposed County Seat, Bailey Co., Texas, March 6, 1909, Bailey County Deed Records, Bailey County Courthouse, Muleshoe, Texas, 184-185.` },
  { n: 65, html: `Portales Times, January 26, 1907.` },
  { n: 66, html: `Roosevelt County Herald, March 5, 1909.` },
  { n: 67, html: `Roosevelt County Herald, August 14, 1908.` },
  { n: 68, html: `Waterloo Daily Courier, July 31, 1909.` },
  { n: 69, html: `Post Office Department, Location of Proposed Post Office: Montezuma, Texas` },
  { n: 70, html: `[Blocks A, B and C], Map, General Map Collection, Texas General Land Office, Austin, Texas.` },
  { n: 71, html: `Roosevelt County Herald, May 4, 1910.` },
  { n: 72, html: `[Minutes of the Board of Directors Meeting of C.C. Slaughter Cattle Company], January 2, 1912, Folder 7, George Morgan Slaughter collection, Southwest Collection/Special Collections Library, Texas Tech University, Lubbock, Texas.` },
  { n: 73, html: `Roosevelt County Herald, October 20, 1910.` },
  { n: 74, html: `Articles of Incorporation of Rock Island, Texico-Farwell and Southern Railway Co., Box 2000/139-3, Railroad Commission of Texas Rail Division railroad history files, Archives and Information Services Division, Texas State Library and Archives Commission, Austin, Texas.` },
  { n: 75, html: `Roosevelt County Herald, February 9, 1911.` },
  { n: 76, html: `Carlsbad Current-Argus, December 30, 1910.` },
  { n: 77, html: `El Paso Evening Times, January 5, 1911.` },
  { n: 78, html: `Albuquerque Journal, January 23, 1911.` },
  { n: 79, html: `Carlsbad Current, February 17, 1911.` },
  { n: 80, html: `Carlsbad Current, July 7, 1911.` },
  { n: 81, html: `Muscatine News Tribune, August 24, 1915.` },
  { n: 82, html: `Vaughan v. Morris, 180 S.W. 954 (Tex. Civ. App. 1915), Decided December 4, 1915.` },
  { n: 83, html: `Thelma Walker Stevens, &ldquo;History of Bailey County,&rdquo; (master&rsquo;s thesis, Texas Tech University, 1939), 50-51.` },
  { n: 84, html: `Lafayette Journal, December 11, 1914.` },
  { n: 85, html: `[Letter from J.C. Whicker to M.C. Vaughan], November 14, 1914, J. C. Whicker Papers, 1896-1919 and undated, Southwest Collection/Special Collections Library, Texas Tech University, Lubbock, Texas.` },
  { n: 86, html: `Lamb County Leader, August 16, 1923.` },
  { n: 87, html: `Waterloo Daily Courier, November 21, 1911.` },
  { n: 88, html: `The Courier, October 5, 1904.` },
  { n: 89, html: `Hereford Brand, June 11, 1915.` },
  { n: 90, html: `Bailey County, Texas, General Index of Deeds, Matthew C. Vaughan to F.F. McElhinney, filed May 29, 1911, Bailey County Courthouse, Muleshoe, Texas.` },
  { n: 91, html: `Marshalltown Times Republican, January 15, 1914.` },
  { n: 92, html: `Waterloo Courier, September 5, 1913.` },
  { n: 93, html: `Waterloo Courier, November 29, 1912.` },
  { n: 94, html: `James Darlington Hamlin, William Curry Holden and J. Evetts Haley, eds. The Flamboyant Judge: James D. Hamlin (Canyon, Texas: Palo Duro Press, 1972), 227-228.` },
  { n: 95, html: `Philip Pope, &ldquo;A Failed Plains Empire: W. P. Soash on the South Plains,&rdquo; West Texas Historical Association Year Book, No. 84, 110-121.` },
  { n: 96, html: `Portales Herald, May 29, 1913; Portales Herald, July 10, 1913.` },
  { n: 97, html: `Stevens, History of Bailey County, 53.` },
  { n: 98, html: `Portales Valley News, April 20, 1916.` },
  { n: 99, html: `Muleshoe Journal, September 13, 2007.` },
  { n: 100, html: `Muleshoe Journal, April 5, 1924.` },
  { n: 101, html: `Weekly New Mexico, December 13, 1880.` },
  { n: 102, html: `LaVonne McKillip, Early Bailey County History: Paleo-man to Plow-man, 12,000 B.C. to 1930 A.D. (Muleshoe, Texas: Bob Stovall Printing, 1978), 17.` },
  { n: 103, html: `Waterloo Evening Courier, May 29, 1926.` },
  { n: 104, html: `Roosevelt County Herald, October 29, 1909.` },
  { n: 105, html: `Texas Live Stock Journal, October 3, 1885.` },
  { n: 106, html: `Stevens, History of Bailey County, 52.` },
];

export const note = (n: number): Note | undefined => NOTES.find((x) => x.n === n);
