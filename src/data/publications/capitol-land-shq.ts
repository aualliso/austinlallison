// src/data/publications/capitol-land-shq.ts
// The published version of record.

import type { Citation, Note, FigureSet } from '../../lib/citation';
import {
  pages,
  doiLink,
  citeChicago as chicago,
  citeMla as mla,
  citeBibtex as bibtex,
} from '../../lib/citation';

export const CITATION: Citation = {
  title: 'Surveying the Capitol Land Reservation in Texas',
  authors: ['Austin Allison'],
  orcid: 'https://orcid.org/0000-0001-6787-9636',
  status: 'record',
  journal: 'Southwestern Historical Quarterly',
  journalAbbrev: 'SWHQ',
  publisher: 'Texas State Historical Association',
  volume: 'CXXIX',
  issue: '3',
  monthYear: 'January 2026',
  year: 2026,
  firstPage: 335,
  lastPage: 364,
  doi: '10.1353/swh.2026.a982690',
  issn: '',                // deliberately empty until confirmed; never guess
  language: 'en',
  rights: 'Republished with permission from the Texas State Historical Association.',
  canonicalPath: '/publications/capitol_land_shq',
  versions: [
    { label: 'Submitted manuscript', path: '/publications/capitol_land' },
    { label: 'Version of record', path: '/publications/capitol_land_shq' },
  ],
};

/** Bound wrappers, so the page calls these with no argument. */
export const pageRange = (): string => pages(CITATION.firstPage, CITATION.lastPage);
export const doiUrl = (): string => doiLink(CITATION.doi);
export const citeChicago = (): string => chicago(CITATION);
export const citeMla = (): string => mla(CITATION);
export const citeBibtex = (): string => bibtex(CITATION, 'allison2026capitol');

/** Order of `entries` determines figure numbering. */
export const FIGURES: FigureSet = {
  dir: 'capitol_land_shq',
  entries: [
    {
      id: 'reservation-north',
      plates: [{ file: '01-map-dallam-hartley-oldham.png' }],
      caption: 'Map of the Capitol Land Reservation; Dallam, Hartley, and Oldham Counties.',
      credit: 'Courtesy of the Twitchell Survey Records Collection, Texas General Land Office',
      size: '2xl',
    },
    {
      id: 'wiley-field-notes',
      plates: [{ file: '02-wiley-field-notes-p1.png' }],
      caption: 'Page one of field notes of work done by H. A. Wiley, compass man for J.T. Munson.',
      credit: 'Courtesy of the Texas State Library and Archives Commission',
      size: 'md',
    },
    {
      id: 'munson-portrait',
      plates: [{ file: '03-munson-portrait.png' }],
      caption: 'Portrait of Joseph Theodore (J.T.) Munson, circa 1870s.',
      credit: 'Courtesy of the Grayson College Foundation, Portal to Texas History, University of North Texas',
      size: 'xs',
    },
    {
      id: 'bailey-county-maps',
      plates: [
        { file: '04-bailey-county-1884.png', label: '1884' },
        { file: '05-bailey-county-1891.png', label: '1891' },
        { file: '06-bailey-county-1913.png', label: '1913' },
      ],
      caption:
        'Bailey County, Texas, mapped three times in three decades: July 18, 1884; November 23, 1891; and November 1913 (the last a cadastral map drafted by John W. Pritchett). Capitol Lands and the center of the county are marked on each; the 1913 sheet also marks bodies of water.',
      credit:
        'Courtesy of the GLO Historic County Maps Collection provided by the Texas General Land Office to the Portal to Texas History, University of North Texas',
      size: '3xl',
    },
    {
      id: 'wiley-agua-negra',
      plates: [{ file: '07-wiley-agua-negra-map.png' }],
      caption: 'H.\u2009A. Wiley\u2019s map of Agua Negra and Noche Triste Lake (Wolf Lakes) in Bailey County, Texas.',
      credit: 'Courtesy of the General Map Collection, Texas General Land Office',
      size: 'md',
    },
    {
      id: 'oldham-deaf-smith',
      plates: [{ file: '08-oldham-deaf-smith-map.png' }],
      caption: 'Capitol Lands in Oldham and Deaf Smith Counties surveyed by J.T. Munson.',
      credit: 'Courtesy of the Twitchell Survey Records Collection, Texas General Land Office',
      size: 'lg',
    },
    {
      id: 'capitol-lands-compiled',
      plates: [{ file: '09-capitol-lands-compiled-map.png' }],
      caption:
        'Map of the Capitol Land Reservation compiled from J.T. Munson\u2019s work; F.G. Blau (Draftsman) A.B. Langermann (Compiler).',
      credit: 'Courtesy of the General Map Collection, Texas General Land Office',
      size: 'xl',
    },
  ],
};

export const NOTES: Note[] = [

  { n: 1, html: `&ldquo;Current Miscellaneous File 9,&rdquo; Texas GLO Map Database and Store, https://historictexasmaps.com/collection/search-results/73741-current-miscellaneous-file-9-general-map-collection (accessed July 13, 2025).` },
  { n: 2, html: `Field notes of work done by H. A. Wiley, compass man for J.T. Munson, Texas Supreme Court, no prefix case files, Box 201-5668, Box 3806, Texas State Library and Archives, Austin [TSLA].` },
  { n: 3, html: `Texas Constitution of 1876, Article 16, Section 57.` },
  { n: 4, html: `H.P.N. Gammel, Laws of Texas, 10 vols. (Austin: Gammel Publishing Company, 1897), 8: 1,309.` },
  { n: 5, html: `Galveston Daily News, April 15, 1879.` },
  { n: 6, html: `Proposals for surveying 3,000,000 acres for Capitol Building, 1879, Box 2019/115-2, Folder 2, Records of the Capitol Building Commission, TSLA.` },
  { n: 7, html: `Matagorda County Book Committee, Historic Matagorda County, Volume 1 (Houston: D. Armstrong Co., 1986), 667.` },
  { n: 8, html: `Francis F. Hopp to Oran M. Roberts, May 5, 1879, Hopp to George McCormick, May 31, 1879, Box 2019/115-2, Folder 2, Records of the Capitol Building Commission, TSLA.` },
  { n: 9, html: `J. Evetts Haley, The XIT Ranch of Texas and the Early Days of the Llano Estacado (Chicago: Lakeside Press, 1929), 55.` },
  { n: 10, html: `William Benjamin [W. B.] Munson to Joseph Theodore [J.T.] Munson, June 14, 1879, Munson Letter Press, Southwest Collection/Special Collections Library, Texas Tech University, Lubbock [SWC/SCL].` },
  { n: 11, html: `J.T. Munson to William C. Walsh, July 12, 1879, Box 2019/115-2, Folder 3, Records of the Capitol Building Commission, TSLA.` },
  { n: 12, html: `Gunter &amp; Munson [G&amp;M] to John S. Summerfield, June 30, 1879, G&amp;M to John B. Quigley, July 11, 1879, Munson Letter Press, SWC/SCL.` },
  { n: 13, html: `Roberts to Walter P. Lane, July 10, 1879, Box 2019/115-2, Folder 3, Records of the Capitol Building Commission, TSLA; Tri-Weekly Herald (Marshall, Texas), May 24, 1879; Douglas Hale, &ldquo;Lane, Walter Paye,&rdquo; Handbook of Texas Online, https://www.tshaonline.org/handbook/entries/lane-walter-paye [accessed July 31, 2024].` },
  { n: 14, html: `G&amp;M to J.T. Munson, July 11, 1879, Munson Letter Press, SWC/SCL; Jimmy L. Bryan, More Zeal than Discretion: The Westward Adventures of Walter P. Lane (College Station: Texas A&amp;M University Press, 2008), 159-160; Walter P. Lane, The Adventures and Recollections of General Walter P. Lane, ed. Jimmy L. Bryan (Dallas, Texas: Southern Methodist University, 2000), 18.` },
  { n: 15, html: `J.T. Munson to Roberts, July 19, 1879, Box 2019/115-2, Folder 3, Records of the Capitol Building Commission, TSLA; Sam Devall and B. H. Laster, Recommendation for N.L. Norton, June 5, 1871, Portal to Texas History, https://texashistory.unt.edu/ark:/67531/metapth1330270 (accessed July 14, 2025); Austin American-Statesman, July 14, 1878; Weekly Democratic-Statesman (Austin, Texas), Nov. 2, 1876; Walter Williams, A History of Northwest Missouri, Volume 1 (Chicago: Lewis Publishing Company, 1915), 122; John H. Brown, Indian Wars and Pioneers of Texas (Austin: L.E. Daniell, 1896), 698; Lucie C. Price, &ldquo;Norton, Nimrod Lindsay,&rdquo; Handbook of Texas, https://www.tshaonline.org/handbook/entries/norton-nimrod-lindsay (accessed July 31, 2024).` },
  { n: 16, html: `G&amp;M to J.T. Munson, July 17, 1879, Munson Letter Press, SWC/SCL.` },
  { n: 17, html: `Clarendon News, Sept. 18, 1879.` },
  { n: 18, html: `Nimrod L. Norton to Roberts, Sept. 10, 1879, Box 2019/115-2, Folder 3, Records of the Capitol Building Commission, TSLA.` },
  { n: 19, html: `William S. Mabry, Some Memories of W.S. Mabry (Bandera, TX: Frontier Time Printing, 1927), 5.` },
  { n: 20, html: `Norton to Roberts, Sept. 15, 1879, Box 2019/115-2, Folder 3, Records of the Capitol Building Commission, TSLA.` },
  { n: 21, html: `Norton to Roberts, Sept. 20, 1879, Box 2019/115-2, Folder 3, Records of the Capitol Building Commission, TSLA.` },
  { n: 22, html: `Capitol Lands field notebook compiled by J.T. Munson, 1880, #81701, General Map Collection, Texas General Land Office, Austin [GLO].` },
  { n: 23, html: `Norton to Roberts, Oct. 2, 1879, Box 2019/115-2, Folder 3, Records of the Capitol Building Commission, TSLA.` },
  { n: 24, html: `Public Lands, Title LXXIX, Chapter 7, Article 3911 (1879).` },
  { n: 25, html: `Norton to Roberts, Oct. 12, 1879, Box 2019/115-2, Folder 3, Records of the Capitol Building Commission, TSLA; G&amp;M to Norton, Nov. 13, 1879, G&amp;M to David T. Beals, Dec. 1, 1879, G&amp;M to John S. Summerfield, June 14, 1879, Munson Letter Press, SWC/SCL; Austin American-Statesman, Nov. 30, 1879.` },
  { n: 26, html: `Sam A. Willson to Roberts, Dec. 5, 1879, Old Miscellaneous File 27, #75636, General Map Collection, GLO.` },
  { n: 27, html: `Galveston Daily News, Dec. 24, 1879; Austin American-Statesman, Dec. 20, 1879; William C. Walsh, Testimony, Old Miscellaneous File 27a, #75651, General Map Collection, GLO.` },
  { n: 28, html: `Fannin Scrip Tyler Tap R.R. Co. Block C3, File 14204, Abstract 341, Certificate 196, Donley County, Texas GLO Land Grant Database, https://s3.glo.texas.gov/glo/history/archives/land-grants/landgrants.cfm?intID=205708 (accessed July 14, 2025).` },
  { n: 29, html: `Rhoads Fisher, Testimony, Old Miscellaneous File 27a, #75651, General Map Collection, GLO.` },
  { n: 30, html: `Jonathan Gunter, Testimony, Old Miscellaneous File 27a, #75651, General Map Collection, GLO; G&amp;M to Summerfield, Sept. 28, 1879, Munson Letter Press, SWC/SCL.` },
  { n: 31, html: `Galveston Daily News, Jan. 7, 1880; Dennis Corwin, Testimony, Richard M. Gano, Testimony, Old Miscellaneous File 27a, #75651, General Map Collection, GLO.` },
  { n: 32, html: `G&amp;M to Lee and Reynolds, Jan. 3, 1880, G&amp;M to Howard and McClure, Jan. 5, 1880, Munson Letter Press, SWC/SCL; Frank Sperling to Norton, Feb. 11, 1880, Box 2019/115-2, Folder 3, Records of the Capitol Building Commission, TSLA.` },
  { n: 33, html: `J.T. Munson to Roberts, Mar. 5, 1880, Box 2019/115-2, Folder 4, Norton to Roberts, Feb. 16, May 2, 1880, Box 2019/115-2, Folder 6, Records of the Capitol Building Commission, TSLA.` },
  { n: 34, html: `Field notes of work done by H. A. Wiley, 1.` },
  { n: 35, html: `Ibid., 2.` },
  { n: 36, html: `Ibid., 2-14; Anonymous, &ldquo;Alamocitos Creek,&rdquo; Handbook of Texas, https://www.tshaonline.org/handbook/entries/alamocitos-creek (accessed July 31, 2024).` },
  { n: 37, html: `Anonymous, &ldquo;Vara,&rdquo; Handbook of Texas, https://www.tshaonline.org/handbook/entries/vara (accessed July 31, 2024).` },
  { n: 38, html: `Field notes of work done by H. A. Wiley, 14-18; A. B. Langermann and F. G. Blau, &ldquo;Map of the Capitol Land Reservation,&rdquo; Map #1751, General Map Collection, GLO.` },
  { n: 39, html: `J.T. Munson to Roberts, May 17, 1880, Box 2019/115-2, Folder 4, Records of the Capitol Building Commission, TSLA.` },
  { n: 40, html: `Anonymous, &ldquo;Garcia Lake,&rdquo; Handbook of Texas, https://www.tshaonline.org/handbook/entries/garcia-lake (accessed July 31, 2024).` },
  { n: 41, html: `Field notes of work done by H. A. Wiley, 18-21.` },
  { n: 42, html: `Ibid, 23-24; Gunnar Brune, Springs of Texas (College Station: Texas A&amp;M University Press, 1981), 158; H. Bailey Carroll, &ldquo;The Route of the Texan Santa Fe Expedition,&rdquo; (Ph.D. Diss., Texas Tech University, 1935), 238-241.` },
  { n: 43, html: `Field notes of work done by H. A. Wiley, 24-28.` },
  { n: 44, html: `Ibid., 28; Capitol Lands, #91655, General Map Collection, GLO; Frances G. Stegall, Grassroots of Bailey County (Bloomington, IN: iUniverse, 2006), 1; Brune, Springs of Texas, 57.` },
  { n: 45, html: `Field notes of work done by H. A. Wiley, 28-30.` },
  { n: 46, html: `Philip S. Lee to Assistant Adjutant General, May 25, 1877, Records of the Office of the Chief of Engineers, 1789&ndash;1996, Record Group 77, National Archives, Washington, DC; Charles Pressler, Pocket Map of the State of Texas, 1879, #76208, G. W. &amp; C. B. Colton &amp; Co., Richardson&rsquo;s New Map of the State of Texas prepared for the Texas Almanac, 1873, #96873, General Map Collection, GLO; Brune, Springs of Texas, 58, 204, 284.` },
  { n: 47, html: `Field notes of work done by H. A. Wiley, 28-33.` },
  { n: 48, html: `Ibid., 33-34.` },
  { n: 49, html: `Ibid., 34-37; Hank Smith to DeWitt C. [D. C.] Giddings, Post Route map across Llano Estacado, 1880, DeGolyer Library, Southern Methodist University, Austin, TX; Vivian H. Whitlock, Cowboy Life on the Llano Estacado (Norman: University of Oklahoma Press, 1970), 10.` },
  { n: 50, html: `Field notes of work done by H. A. Wiley, 37; Denison Daily News, July 21, 1880; J.T. Munson to Roberts, July 20, 1880, Box 2019/115-2, Folder 4, Records of the Capitol Building Commission, TSLA.` },
  { n: 51, html: `Capitol Lands field notebook compiled by J.T. Munson, 299.` },
  { n: 52, html: `Ibid., 380; Field notes of work done by H. A. Wiley, 15; Capitol Lands in Oldham and Deaf Smith Counties [1880], #91482, General Map Collection, GLO.` },
  { n: 53, html: `Capitol Lands field notebook compiled by J.T. Munson, 759; Report of the Capitol Building Commissioners to the Governor of Texas (Austin: E.W. Swindells, 1883), 8, 60.` },
  { n: 54, html: `Capitol Lands field notebook compiled by J.T. Munson, 3-9; Report of the Capitol Building Commissioners, 20-21, 31, 176-186.` },
  { n: 55, html: `Ibid., 179; Mabry, Some Memories, 5, 8-10; Ralph H. Brock, &ldquo;&lsquo;Perhaps the Most Incorrect of Any Land Line in the United States&rsquo;: Establishing the Texas-New Mexico Boundary Along the 103rd Meridian,&rdquo; Southwestern Historical Quarterly 109 (Apr. 2006), 461.` },
  { n: 56, html: `William S. Mabry to Taylor, Babcock and Co., Jan. 16, 1885, in Dallam County Sketch File 1, #11277, General Map Collection, GLO.` },
  { n: 57, html: `Oldham County Sketch File 10, #33243, General Map Collection, GLO.` },
  { n: 58, html: `Ibid.; Mabry to Walsh [1886], in Oldham County Sketch File 10, #33243, General Map Collection, GLO.` },
  { n: 59, html: `Capitol Lands field notebook compiled by J.T. Munson, 654.` },
  { n: 60, html: `Bailey County Sketch File 1, 1882, #10880, General Map Collection, GLO.` },
  { n: 61, html: `Findlay v. State of Texas, 1921, 238 S.W. 956 (Tex. Civ. App. 1922); Findlay v. State of Texas, 1923, 113 Tex. 30 (Tex. 1923), 250 S.W. 651.` },
  { n: 62, html: `T. O. Wallis, &ldquo;Stake, earth mound, and four pits&rdquo; (MS, n.d.), Haley Memorial Library and J. Evetts Haley History Center, Midland, TX.` },
  { n: 63, html: `&ldquo;Surveyed State Capitol Lands,&rdquo; Frontier Times 2 (Aug. 1925), 14; Galveston Daily News, July 24, 1880.` },
];

export const note = (n: number): Note | undefined => NOTES.find((x) => x.n === n);