// src/data/collections/thomas-family.ts
//
// PROVISIONAL, same caveat as the Swann file: these are separated only
// because they carry no c.1.n.n number. If they came out of the same box,
// merge the two files.
//
// None of these three carries a control number, so none is given one. The
// slug is the identity; a number can be added later without changing a URL,
// a cross-reference or anything else.

import type { Collection } from './types';

export const COLLECTION: Collection = {
  slug: 'allison-family',
  title: 'Allison Family Photographs',
  custody: 'Various origins.',
  scope:
    'Photographs of the Allison family. Photographs date to Redmon and Betty Allison, but the bulk revolves around Harold and Jean Allison. The collection includes photographs of associated families, including the McKinstry, Ingle, and Swann families.',
  lines: ['Allison', 'McKinstry', 'Ingle', 'Swann'],
  places: ['Texas', 'New Mexico'],
  defaults: {
    rights: { status: 'public-domain' },
  },
  series: [

  ],

  items: [
    /* ---------------------------------------------------------------- */
    {
      slug: 'allison-harold-jean-1945',
      title: '[Harold and Jean Allison with niece and nephew Sherry and Winston]',
      titleSource: 'supplied',
      
      // The soft graphite modelling of the face against flat wash in the coat
      // is characteristic of a CRAYON ENLARGEMENT - a photographic enlargement
      // worked over by hand, sold door to door from about 1880 to 1910. But it
      // could also be a drawing made after a photograph, and the difference
      // matters: one is a photograph and one is not. Determine it from the
      // original, not from a scan.
      format: 'snapshot',
      controlNumber: 'a.1.27.1',
      date: {
        display: '1945',
        basis: ['Verso identifies the date'],
        confidence: 'certain',
      },
      recto: {
        file: 'allison-harold-jean-1945-recto.jpg',
      },
      verso: {
        file: 'allison-harold-jean-1945-verso.jpg',
      },
      description:
        'This photograph depicts Harold and Jean Allison with their niece Sherry Allison and their nephew Winston Allison. Harold is wearing his military uniform and Jean is wearing her lavender dress.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'Lt. Harold and Jean Allison \n soon after marriage. \n Lavender suit Jean is \n wearing is the one \n Jimmy and Winston helped \n choose. \n Children: Sherry and Winston.',
        },
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 32.4, y: 24.3, w: 15.4, h: 12.7 },
        },
        {
          person: 'allison-veta-jean-mckinstry',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 56.4, y: 29.6, w: 11.1, h: 9.6 },
          },
          {
          person: 'allison-winston-irvin',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 50.4, y: 46.8, w: 10.5, h: 9.6 },
          },
          {
          person: 'bainbridge-sherry-lynn-allison',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 30.4, y: 52.5, w: 10.7, h: 9.3 },
          },
      ],
    },
    {
      slug: 'allison-jean-and-ollie-grizzle-1',
      title: '[Jean Allison and Ollie Grizzle]',
      titleSource: 'supplied',
      
      // The soft graphite modelling of the face against flat wash in the coat
      // is characteristic of a CRAYON ENLARGEMENT - a photographic enlargement
      // worked over by hand, sold door to door from about 1880 to 1910. But it
      // could also be a drawing made after a photograph, and the difference
      // matters: one is a photograph and one is not. Determine it from the
      // original, not from a scan.
      format: 'snapshot',
      controlNumber: 'a.1.27.2',
      place: 'New Mexico',
      date: {
        display: '1944',
        basis: ['Verso identifies the date'],
        confidence: 'certain',
      },
      recto: {
        file: 'allison-jean-and-ollie-grizzle-1-recto.jpg',
      },
      verso: {
        file: 'allison-jean-and-ollie-grizzle-1-verso.jpg',
      },
      description:
        'This photograph depicts Jean Allison and Ollie Grizzle standing next to a water tower.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: '1944 \n Jean McKinstry Allison \n Ollize Grizzle (Harold\'s \n mom).',
        },
      ],
      depicts: [
        {
          person: 'allison-veta-jean-mckinstry',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 35.4, y: 42.9, w: 10.2, h: 7.1 },
          },
        {
          person: 'grizzle-ollie-blanche-ingle-allison',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 54.9, y: 40.4, w: 9.8, h: 9.1 },
          },
      ],
    },
    {
      slug: 'allison-harold-discharged-1945',
      title: '[Harold Allison shortly after being discharged from military in 1945]',
      titleSource: 'supplied',
      format: 'snapshot',
      controlNumber: 'b.1.20.1',
      place: 'Dexter, New Mexico',
      date: {
        display: '1945',
        basis: ['Verso identifies the date'],
        confidence: 'certain',
      },
      recto: {
        file: 'allison-harold-discharged-1945-recto.jpg',
      },
      verso: {
        file: 'allison-harold-discharged-1945-verso.jpg',
      },
      description:
        'This photograph depicts Harold Allison standing next to a car in his military uniform shortly after being discharged from the military in 1945 following the conclusion of World War II.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: '1945 \n Harold Lamar Allison \n Dexter, N. Mex \n Discharged',
        },
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 23.1, y: 32.2, w: 10.7, h: 10.1 },
          },
      ],
    },
    {
      slug: 'allison-redmon-family',
      title: '[Redmon and Betty Allison family, circa 1917-1918]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Bear Springs, Texas',
      date: {
        display: '[1917]',
        basis: ['Estimated based on ages available on photograph. Harold Allison appears to be less than one year old here, which places this photograph firmly in 1917.'],
        confidence: 'probable',
      },
      recto: { file: 'allison-redmon-family-recto.jpg' },
      verso: { file: 'allison-redmon-family-verso.jpg' },
      description:
        'This photograph depicts the family of Redmon and Betty Allison around the year 1917. A taped on note on the verso lists each person. This photograph is framed and in the possession of this website\'s creator.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'Back Row L-R: Mom; Daddy holding ME; Willie Dingler; Uncle Bud Dingler holding Novella; Uncle Ed; \n Aunt Annie; Uncle Carroll holding Joe Winston; Aunt Edna; Aunt Wardlow; Aunt Ella; Uncle Hilliard holding Jack \n\n Bottom Row L-R: Gerald; Ovel; Marlin; Aunt Stella holding Allison Dingler; Betty Dingler (by GP Allison); Grandpa (Red); Little Carroll Redmon; Grandma Red; Uncle Irvin (William); Mary Alice; Verda; Velma; Seth.',
          hand: 'Harold Allison',
        },
      ],
      depicts: [
        {
          person: 'grizzle-ollie-blanche-ingle-allison',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 11.6, y: 35.1, w: 4.6, h: 7.6 },
        },
        {
          person: 'allison-oscar-simmon',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 22.9, y: 32.3, w: 4.9, h: 6.6 },
        },
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 20, y: 40, w: 3.1, h: 4.7 },
        },
        {
          person: 'dingler-willie-elgin',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 27.4, y: 39.6, w: 4.1, h: 6 },
        },
        {
          person: 'dingler-willie-oliver',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 30.6, y: 33.3, w: 4.5, h: 6.5 },
        },
        {
          person: 'lawless-rossa-novella-dingler',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 36.2, y: 35, w: 3.5, h: 5.7 },
        },
        {
          person: 'allison-david-edwin',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 41.7, y: 32.2, w: 4.2, h: 6.5 },
        },
        {
          person: 'allison-annie-wheeler',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 48.1, y: 33.8, w: 4.1, h: 7.2 },
        },
        {
          person: 'allison-joseph-carroll',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 54.3, y: 32.9, w: 4, h: 6.6 },
        },
        {
          person: 'allison-joe-winston',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 58.7, y: 35.5, w: 3.9, h: 5.9 },
        },
        {
          person: 'allison-sarah-edna-adkins',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 63.4, y: 34.7, w: 4.4, h: 6.2 },
        },
        {
          person: 'allison-amanda-wardlow',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 68.9, y: 35.9, w: 4.2, h: 5.8 },
        },
        {
          person: 'gilbert-ella-georgia-allison',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 76, y: 32.4, w: 4.9, h: 7.3 },
        },
        {
          person: 'gilbert-hilliard-reason',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 84.3, y: 30.8, w: 5.3, h: 7 },
        },
        {
          person: 'gilbert-jack-clifford',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 90.7, y: 38.9, w: 4.1, h: 4.9 },
        },
        {
          person: 'allison-gerald-parker',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 15.6, y: 50.5, w: 5.2, h: 7.1 },
        },
        {
          person: 'dingler-ovel-estell',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 22, y: 62.1, w: 4.6, h: 7.2 },
        },
        {
          person: 'dingler-marlin-oliver',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 28.3, y: 58.3, w: 4.2, h: 7.4 },
        },
        {
          person: 'dingler-sarah-estella-allison',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 34.7, y: 46.6, w: 5.2, h: 7.1 },
        },
        {
          person: 'dingler-isaac-allison',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 34.5, y: 54.6, w: 4.2, h: 6.5 },
        },
        {
          person: 'locke-betty-amanda-dingler',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 39.6, y: 57.8, w: 4.5, h: 7.4 },
        },
        {
          person: 'allison-redmon',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 44.8, y: 44.3, w: 5.5, h: 8.7 },
        },
        {
          person: 'allison-carroll-redmon',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 50.7, y: 51.9, w: 4.8, h: 7.4 },
        },
        {
          person: 'allison-mary-elizabeth-stirman',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 54.2, y: 48.2, w: 4.4, h: 7.2 },
        },
        {
          person: 'allison-william-irvin',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 62.4, y: 44.1, w: 4.9, h: 7.4 },
        },
        {
          person: 'swan-mary-alice-allison',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 68.5, y: 44.1, w: 4.9, h: 7.2 },
        },
        {
          person: 'gooch-verda-lilla-gilbert',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 73.7, y: 42.4, w: 4.6, h: 6.9 },
        },
        {
          person: 'trimble-velma-mary-gilbert',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 80.6, y: 38.6, w: 4.5, h: 7.3 },
        },
        {
          person: 'gilbert-seth-parker',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 89.4, y: 50.7, w: 4.7, h: 7.8 },
        },
      ],
    },
    
    {
      slug: 'allison-oscar-teacher',
      title: '[Oscar Allison at a teacher meeting at Hagerman in 1910]',
      titleSource: 'supplied',
      format: 'real photo postcard',
      place: 'Hagerman, New Mexico',
      controlNumber: 'J.1.14',
      date: {
        display: '[1910-1914]',
        earliest: 1910,
        latest: 1914,
        basis: ['The verso assigns a date of 1910. Nothing here objects to this necessarily, but two of the teachers, Eula and Hannah Grizzle, would have been fairly young in 1910. Eula Grizzle would have been 19, and Hannah Grizzle would have been 17. A 1910 is not impossible, but I am assigning a probable date range of 1910 through 1914.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-oscar-teacher-recto.jpg',
      },
      verso: {
        file: 'allison-oscar-teacher-verso.jpg',
      },
      description:
        'This photograph depicts Oscar Allison at teacher meeting in 1910 at Hagerman. Oscar is standing fifth from the left. Several others are identifed on the verso.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'Teachers meeting about 1910 at Hagerman. \n 1st Mr. Ellis \n standing 2nd from left Hannah Grizzle, \n 5th from left Oscar Allison. \n Seated from left: \n 1. Eula Grizzle \n 2. Myrtle Stark \n 3. Nina Cullen \n 5. Eddie Stirman \n (Daddy\'s cousin) \n 4 schools represented \n 1. Ingleville, Daddy \n Blanche Cullen \n 2. White Flat \n Myrtle Stark \n Mr. Ellis.',
        },
      ],
      depicts: [
        {
          person: 'allison-oscar-simmon',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 64.1, y: 9, w: 6.9, h: 13.5 },
          },
          {
          as: 'Mr Ellis',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 12.4, y: 11, w: 6.1, h: 13.2 },
          },
          {
          as: 'Hannah Grizzle',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 25.4, y: 13.7, w: 7, h: 13.4 },
          },
          {
          as: 'Eula Grizzle',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 12.7, y: 29.9, w: 7.8, h: 13.2 },
          },
          {
          as: 'Myrtle Stark',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 26.2, y: 33.1, w: 6.6, h: 11.9 },
          },
          {
          as: 'Nina Cullen',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 38.9, y: 31.6, w: 6.9, h: 12.7 },
          },
          {
          as: 'Eddie Stirman',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 65.5, y: 32.4, w: 7.1, h: 14.5 },
          },
      ],
    },
    {
      slug: 'allison-harold-jean-loveta-mckinstry-camellia-room',
      title: '[Harold and Jean Allison with Loveta McKinstry at the Camellia Room in Savannah, Georgia]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Savannah, Georgia',
      controlNumber: 'f.1.4',
      date: {
        display: '[1944-1945]',
        basis: ['This photograph was likely taken between 1944 and 1945 while Jean moved across the country with Harold during his military training.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-jean-loveta-mckinstry-camellia-room-recto.jpg',
      },
      verso: {
        file: 'allison-harold-jean-loveta-mckinstry-camellia-room-verso.jpg',
      },
      description:
        'This photograph depicts Jean McKinstry Allison, Loveta McKinstry, and Harold Allison while at the Camellia Room at Hotel Savannah in Savannah, Georgia. This photograph was likely taken during the period that Jean traveled with Harold during his military training. This photograph is housed in a small folder that shows that it was received from Hotel Savannah.',
      inscriptions: [
    
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 71.1, y: 25.8, w: 16.2, h: 33.9 },
        },
        {
          person: 'allison-veta-jean-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 11.3, y: 28.2, w: 18.6, h: 41 },
        },
        {
          person: 'mckinstry-loveta-swann',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 36.6, y: 25.8, w: 15.2, h: 34.3 },
        },
      ],
    },
    {
      slug: 'allison-harold-oscar-kenneth-precure',
      title: '[Kenneth Precure, Oscar Allison, and Harold Allison with mustaches]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Savannah, Georgia',
      controlNumber: 'f.1.10',
      date: {
        display: '[1960-1965]',
        basis: ['There is no date on this photograph, but an estimated date of 1960 to 1965 is likely.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-oscar-kenneth-precure-recto.jpg',
      },
      verso: {
        file: 'allison-harold-oscar-kenneth-precure-verso.jpg',
      },
      description:
        'This photograph depicts brothers Harold and Oscar Allison with good friend Kenneth Precure. It appears this professional portrait was taken to highlight and showcase each person\'s mustache.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'Kenneth Precure \n Oscar Allison \n Harold Allison'
        }
      ],
      depicts: [
        {
          person: 'precure-kenneth',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 4.2, y: 6.2, w: 29.7, h: 56.4 },
        },
        {
          person: 'allison-oscar-ingle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 33.6, y: 17.3, w: 27.3, h: 49.5 },
        },
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 63.9, y: 13.1, w: 31.6, h: 51.7 },
        },
      ],
    },
    {
      slug: 'allison-oscar-ingle-1',
      title: '[Oscar Allison sitting at a table]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'e.1.1',
      date: {
        display: '[1941-1943]',
        basis: ['There is no date on this photograph, but an estimated date of 1941 to 1943 is likely. This is from before Oscar\'s deployment to Europe and subsequent time as a prisoner of war.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-oscar-ingle-1-recto.jpg',
      },
      description:
        'This photograph depicts Oscar Ingle Allison sitting at a table. There is a map or advertisement on the wall in the background that is partially visible. This sheet has a business from Roswell, New Mexico on it. This photograph predates Oscar\'s deployment to Europe, and it is likely from 1941 through 1943.',
      inscriptions: [
        
      ],
      depicts: [
        {
          person: 'allison-oscar-ingle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 24.9, y: 23.1, w: 29.8, h: 30.5 },
        },
      ],
    },
    {
      slug: 'allison-oscar-ingle-ollie-grizzle',
      title: '[Oscar Allison hugging his mother, Ollie Grizzle]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'e.1.2',
      date: {
        display: '[1945-1946]',
        earliest: 1945,
        latest: 1946,
        basis: ['Although not certain, this appears t be taken after Oscar returned from the prisoner of war camp.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-oscar-ingle-ollie-grizzle-recto.jpg',
      },
      description:
        'This is a photograph of Oscar Ingle Allison hugging his mother, Ollie Grizzle. This may have been taken shortly after Oscar returned from being a prisoner of war in Europe during World War II.',
      inscriptions: [
        
      ],
      depicts: [
        {
          person: 'allison-oscar-ingle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 50.5, y: 29.4, w: 8, h: 7.9 },
        },
        {
          person: 'grizzle-ollie-blanche-ingle-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 42.1, y: 31.5, w: 7.9, h: 7.3 },
        },
      ],
    },
    {
      slug: 'grizzle-wiley-car',
      title: '[Wiley Grizzle working on a Buick car]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'e.1.3',
      date: {
        display: '[1943]',
        earliest: 1943,
        latest: 1943,
        basis: ['This photograph appears to be from the same morning Oscar left for deployment in 1943'],
        confidence: 'probable',
      },
      recto: {
        file: 'grizzle-wiley-car-recto.jpg',
      },
      description:
        'This photograph depicts Wiley Grizzle working on a Buick car.',
      inscriptions: [
        {
          location: 'recto',
          medium: 'ink',
          text: 'Daddy working on the Buick. Kitty had been helping him. I\'ll send you a better one when I get some more made. I sent it to Jr.'
        }
      ],
      depicts: [
        {
          person: 'grizzle-wiley',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 44.5, y: 7.8, w: 4.7, h: 7.9 },
        },
      ],
    },
    {
      slug: 'allison-oscar-ingle-unknown-girl',
      title: '[Oscar Ingle Allison and unknown girl]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'e.1.4',
      date: {
        display: '[1943]',
        earliest: 1943,
        latest: 1943,
        basis: ['This photograph appears to be from the same morning Oscar left for deployment in 1943'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-oscar-ingle-mary-grizzle-recto.jpg',
      },
      description:
        'This photograph depicts Oscar Allison and an unknown girl standing next to a car.',
      inscriptions: [
        {
          location: 'recto',
          medium: 'ink',
          text: 'The morning he left.'
        }
      ],
      depicts: [
        {
          person: 'allison-oscar-ingle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 30.8, y: 20.7, w: 14.9, h: 15.3 },
        },
        
      ],
    },
    {
      slug: 'allison-harold-ollie-mae-grizzle-mildred-mckinstry',
      title: '[Harold Allison, Ollie Mae Grizzle, and Mildred McKinstry in San Antonio]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'San Antonio, Texas',
      controlNumber: 'e.1.5',
      date: {
        display: '[1945]',
        earliest: 1945,
        latest: 1945,
        basis: ['This photograph appears to be from the period when Harold was in San Antonio in 1945.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-ollie-mae-grizzle-mildred-mckinstry-recto.jpg',
      },
      description:
        'This photograph depicts Harold Allison, Ollie Mae Grizzle, and Mildred McKinstry walking along a street in San Antonio.',
      inscriptions: [
        
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 22.3, y: 47.5, w: 5.7, h: 4.3 },
        },
        {
          person: 'didlake-ollie-mae-grizzle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 36.7, y: 46.4, w: 6.2, h: 4.3 },
        },
        {
          person: 'osborn-mildred-adeline-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 49.7, y: 46.8, w: 6.1, h: 4.2 },
        },
      ],
    },
    {
      slug: 'allison-harold-walking',
      title: '[Harold Allison walking along a street]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'San Antonio, Texas',
      controlNumber: 'e.1.6',
      date: {
        display: '[1945]',
        earliest: 1945,
        latest: 1945,
        basis: ['This photograph appears to be from the period when Harold was in San Antonio in 1945. Similar to another photo in this series.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-walking-recto.jpg',
      },
      description:
        'This photograph depicts Harold Allison walking along a street.',
      inscriptions: [
        
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 52.2, y: 7.9, w: 17.8, h: 14.4 },
        },
      ],
    },
    {
      slug: 'allison-oscar-simmon-portrait',
      title: '[Portrait of Oscar Simmon Allison]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Texas',
      controlNumber: 'f.1.15',
      date: {
        display: '[1902-1908]',
        earliest: 1902,
        latest: 1908,
        basis: ['This photograph is undated. It was likely taken after Oscar entered school to become a teacher. His age is estimated to be between 18 and 26.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-oscar-simmon-portrait-recto.jpg',
      },
      verso: {
        file: 'allison-oscar-simmon-portrait-verso.jpg',
      },
      description:
        'This is a formal portrait of Oscar Simmon Allison. This was likely taken during Oscar\'s time in school to become a teacher. It appears to be produced in a typical yearbook style.',
      inscriptions: [
        
      ],
      depicts: [
        {
          person: 'allison-oscar-simmon',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 25.5, y: 15, w: 54.3, h: 48.5 },
        },
      ],
    },
    {
      slug: 'allison-joseph-carroll-ned-hogan-1',
      title: '[Formal portrait of Joseph Carroll and Sarah Edna Allison with Ned and Mary Melvin Hogan]',
      titleSource: 'supplied',
      format: 'real photo postcard',
      place: 'Dickens County, Texas',
      controlNumber: 'f.1.16',
      date: {
        display: '[1911-1912]',
        earliest: 1911,
        latest: 1912,
        basis: ['This photograph depicts Joseph Carroll Allison likely during his time in Dickens County. Ned Hogan was a lifelong resident of the county. Ned married his wife, Mary, in 1911.' ],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-joseph-carroll-ned-hogan-1-recto.jpg',
      },
      verso: {
        file: 'allison-joseph-carroll-ned-hogan-1-verso.jpg',
      },
      description:
        'This is a formal portrait of Joseph Carroll Allison and his wife Sarah. They are joined by friend Ned Hogan and his wife Mary Melvin Pattonn Hogan. The photographs from this set are misidentified on the versos. They were sent to Harold Allison represented as photos of his father, Oscar, but it was determined this was not the case. They were then reidentified as Oscar\'s brother William Irvin Allison, but that was also found to be incorrect. After searching newspapers associated with Joseph Carroll\'s time in Dickens County as a teacher, Ned Hogan was identified as a friend he traveled with. His findagrave.com entry displays a picture of him that matches the likeness in these photographs. Despite Ned\'s appearance as an Allison, he is not, which provided quite the journey in identifying this photograph!',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'Carrol + wife \n Irvin (Oscar crossed out) + wife (Ollie crossed out) \n Allison '
        }
      ],
      depicts: [
        {
          person: 'allison-joseph-carroll',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 41, y: 6.9, w: 14.3, h: 11.2 },
        },
        {
          person: 'allison-sarah-edna-adkins',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 20.2, y: 12.5, w: 17.4, h: 14.2 },
        },
        {
          as: 'Ned Hogan',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 43.7, y: 21.9, w: 15.7, h: 13.5 },
        },
        {
          as: 'Mary Melvin Patton Hogan',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 63.8, y: 12.9, w: 16.9, h: 14.8 },
        },
      ],
    },
    {
      slug: 'allison-joseph-carroll-ned-hogan-2',
      title: '[Formal portrait of Joseph Carroll and Sarah Edna Allison with Ned and Mary Melvin Hogan]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Dickens County, Texas',
      controlNumber: 'f.1.17',
      date: {
        display: '[1911-1912]',
        earliest: 1911,
        latest: 1912,
        basis: ['This photograph depicts Joseph Carroll Allison likely during his time in Dickens County. Ned Hogan was a lifelong resident of the county. Ned married his wife, Mary, in 1911.' ],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-joseph-carroll-ned-hogan-2-recto.jpg',
      },
      verso: {
        file: 'allison-joseph-carroll-ned-hogan-2-verso.jpg',
      },
      description:
        'This is a formal portrait of Joseph Carroll Allison and his wife Sarah. They are joined by friend Ned Hogan and his wife Mary Melvin Pattonn Hogan. The photographs from this set are misidentified on the versos. They were sent to Harold Allison represented as photos of his father, Oscar, but it was determined this was not the case. They were then reidentified as Oscar\'s brother William Irvin Allison, but that was also found to be incorrect. After searching newspapers associated with Joseph Carroll\'s time in Dickens County as a teacher, Ned Hogan was identified as a friend he traveled with. His findagrave.com entry displays a picture of him that matches the likeness in these photographs. Despite Ned\'s appearance as an Allison, he is not, which provided quite the journey in identifying this photograph!',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'Carrol + wife \n Irvin (Oscar crossed out) + wife (Ollie crossed out) \n Allison '
        }
      ],
      depicts: [
        {
          person: 'allison-joseph-carroll',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 54, y: 24.9, w: 14.2, h: 10.2 },
        },
        {
          person: 'allison-sarah-edna-adkins',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 34.9, y: 22.7, w: 14.8, h: 10 },
        },
        {
          as: 'Ned Hogan',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 24.9, y: 38.2, w: 16.5, h: 12.9 },
        },
        {
          as: 'Mary Melvin Patton Hogan',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 55.1, y: 40.4, w: 15.5, h: 12.7 },
        },
      ],
    },
    {
      slug: 'allison-joseph-carroll-ned-hogan-3',
      title: '[Formal portrait of Joseph Carroll and Sarah Edna Allison with Ned and Mary Melvin Hogan]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Dickens County, Texas',
      controlNumber: 'f.1.18',
      date: {
        display: '[1911-1912]',
        earliest: 1911,
        latest: 1912,
        basis: ['This photograph depicts Joseph Carroll Allison likely during his time in Dickens County. Ned Hogan was a lifelong resident of the county. Ned married his wife, Mary, in 1911.' ],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-joseph-carroll-ned-hogan-3-recto.jpg',
      },
      verso: {
        file: 'allison-joseph-carroll-ned-hogan-3-verso.jpg',
      },
      description:
        'This is a formal portrait of Joseph Carroll Allison and his wife Sarah. They are joined by friend Ned Hogan and his wife Mary Melvin Pattonn Hogan. The photographs from this set are misidentified on the versos. They were sent to Harold Allison represented as photos of his father, Oscar, but it was determined this was not the case. They were then reidentified as Oscar\'s brother William Irvin Allison, but that was also found to be incorrect. After searching newspapers associated with Joseph Carroll\'s time in Dickens County as a teacher, Ned Hogan was identified as a friend he traveled with. His findagrave.com entry displays a picture of him that matches the likeness in these photographs. Despite Ned\'s appearance as an Allison, he is not, which provided quite the journey in identifying this photograph!',
      inscriptions: [
        
      ],
      depicts: [
        {
          person: 'allison-joseph-carroll',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 35.4, y: 19.8, w: 14.2, h: 10.1 },
        },
        {
          person: 'allison-sarah-edna-adkins',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 40.8, y: 36.6, w: 13.7, h: 10.3 },
        },
        {
          as: 'Ned Hogan',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 61.2, y: 19.2, w: 14.9, h: 10.4 },
        },
        {
          as: 'Mary Melvin Patton Hogan',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 57, y: 32.5, w: 15.1, h: 12.6 },
        },
      ],
    },
    {
      slug: 'allison-oscar-standing-on-plane',
      title: '[Oscar Allison standing on the wing of a BT-13A Valiant at Shaw Army Air Field]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Shaw Army Air Field',
      controlNumber: 'e.1.7',
      date: {
        display: '[1942-1943]',
        earliest: 1942,
        latest: 1943,
        basis: ['This photograph was taken between January 1942 and April 1943. Oscar was stationed at Shaw Army Air Field between those dates.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-oscar-standing-on-plane-recto.jpg',
      },
      description:
        'This photograph depicts Oscar Allison standing on the wing of an BT-13A Valiant aircraft during World War II. Oscar worked as a mechanic at Shaw Army Air Field between January 1942 and April 1943.',
      inscriptions: [
        
      ],
      depicts: [
        {
          person: 'allison-oscar-ingle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 56.8, y: 28.3, w: 3.4, h: 6 },
        },
      ],
    },
    {
      slug: 'allison-oscar-and-ollie-grizzle',
      title: '[Oscar Allison standing next to a car with his mother, Ollie Grizzle]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'e.1.8',
      date: {
        display: '[1943]',
        earliest: 1943,
        latest: 1943,
        basis: ['This photograph appears to be from before Oscar was captured and his time as a prisoner of war'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-oscar-and-ollie-grizzle-recto.jpg',
      },
      description:
        'This photograph depicts Oscar Allison standing with his mother, Ollie, next to a car. This photograph appears to be from before Oscar\'s time as a prisoner of war. A distorted reflection of the photographer can be seen on the car.',
      inscriptions: [
        
      ],
      depicts: [
        {
          person: 'allison-oscar-ingle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 35, y: 19, w: 11.1, h: 17.5 },
        },
        {
          person: 'grizzle-ollie-blanche-ingle-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 52.6, y: 20.1, w: 10.6, h: 17.5 },
        },
      ],
    },
    {
      slug: 'allison-harold-jean-car',
      title: '[Harold and Jean Allison standing next to a car]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'e.1.9',
      date: {
        display: '[1944]',
        earliest: 1944,
        latest: 1944,
        basis: ['This photograph is likely just after Harold and Jean got married in 1944.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-jean-car-recto.jpg',
      },
      description:
        'This photograph depicts Harold and Jean Allison standing next to a car likely at the home of Wiley and Ollie Grizzle. It appears that this photograph was taken shortly after Jean and Harold got married and left New Mexico for a period while Harold was on active duty.',
      inscriptions: [
        
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 50, y: 22.9, w: 19.4, h: 14.9 },
        },
        {
          person: 'allison-veta-jean-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 32.4, y: 26, w: 15.6, h: 15.3 },
        },
      ],
    },
    {
      slug: 'allison-harold-jean-snapshot',
      title: '[Harold and Jean Allison informal portrait]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'e.1.10',
      date: {
        display: '[1944]',
        earliest: 1944,
        latest: 1944,
        basis: ['This photograph is likely just after Harold and Jean got married in 1944.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-jean-snapshot-recto.jpg',
      },
      description:
        'This photograph depicts Harold and Jean Allison in an informal portrait. Jean and Harold are each identified. This photograph was likely produced around the time they were married in 1944.',
      inscriptions: [
        
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 49.4, y: 21.6, w: 36.9, h: 31.3 },
        },
        {
          person: 'allison-veta-jean-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 23.4, y: 36.8, w: 33.8, h: 33.2 },
        },
      ],
    },
    {
      slug: 'allison-harold-san-antonio-1',
      title: '[Harold Allison standing next to a swimming pool]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'San Antonio, Teas',
      controlNumber: 'e.1.11',
      date: {
        display: '[1945]',
        earliest: 1945,
        latest: 1945,
        basis: ['This photograph was likely taken during the time Harold and Jean spent in San Antonio.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-san-antonio-1-recto.jpg',
      },
      description:
        'This photograph depicts Harold Allison standing next to a swimming pool. This photograph matches others labeled as being taken in San Antonio.',
      inscriptions: [
        
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 44.4, y: 37.1, w: 8.6, h: 6.6 },
        },
        
      ],
    },
    {
      slug: 'allison-oscar-wrestling-calf',
      title: '[Oscar Allison wrestling a Hereford calf]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'e.1.12',
      date: {
        display: '[1940-1942]',
        earliest: 1940,
        latest: 1942,
        basis: ['This photograph was likely taken prior to Oscar\'s time in the military or before he was deployed.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-oscar-wrestling-calf-recto.jpg',
      },
      description:
        'This photograph depicts Oscar Allison wrestling a Hereford calf in a fenced enclosure.',
      inscriptions: [
        
      ],
      depicts: [
        {
          person: 'allison-oscar-ingle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 27.5, y: 53.6, w: 9.7, h: 9.3 },
        },
        
      ],
    },
    {
      slug: 'allison-jean-mary-andreas-mrs-redfield',
      title: '[Mrs. Redfield, Jean Allison, and Mary Andreas sitting in the Allison home]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'e.1.13',
      date: {
        display: '[1953-1954]',
        earliest: 1953,
        latest: 1954,
        basis: ['This photograph was likely taken between 1953 and 1954 based on the ages of those known in the photograph.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-jean-mary-andreas-mrs-redfield-recto.jpg',
      },
      description:
        'This photograph depicts Mrs. Redfield, Jean Allison, and Mary Andreas. The identity of Mrs. Redfield is assumed based on an 8mm film that is in the collection. The box identifies a pair in the film as "Sidney & Mrs. Redfield." It is presumed that this woman is Mrs. Redfield. Sidney Redfield was a well-known artist, and this woman could be his mother Georgia Redfield. She is buried in Roswell.',
      inscriptions: [
        
      ],
      depicts: [
        {
          person: 'allison-veta-jean-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 41.9, y: 17.3, w: 7.4, h: 14.5 },
        },
        {
          person: 'andreas-mary-lorene-grizzle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 63.6, y: 16.8, w: 6.5, h: 13.1 },
        },
        {
          as: 'Mrs. Redfield',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 16.6, y: 24.7, w: 8.5, h: 15.8 },
        },
      ],
    },
    {
      slug: 'allison-oscar-mia-newspaper',
      title: '[Sgt. Allison of Dexter Reported Missing In Action]',
      titleSource: 'supplied',
      format: 'newspaper',
      place: 'Roswell, New Mexico',
      controlNumber: 'e.1.14',
      date: {
        display: '1944',
        earliest: 1944,
        latest: 1944,
        basis: ['The date of this newspaper is April 14, 1944.'],
        confidence: 'certain',
      },
      recto: {
        file: 'allison-oscar-mia-newspaper.jpg',
      },
      description:
        'This April 14, 1944 article from the Roswell Daily Record notes that Oscar Allison was reported missing in action.',
      inscriptions: [
        
      ],
      mentions: [
        { person: 'allison-oscar-ingle', basis: 'mentioned in article', confidence: 'certain',}
        //   note: 'As "W. M. Swann", presiding.' },
        // { as: 'J. H. Bledsoe', page: 'p5', confidence: 'certain',
        //   note: 'Elected secretary.' },
      ],
      depicts: [
       
      ],
    },
    {
      slug: 'allison-harold-jean-wedding-newspaper',
      title: '[McKinstry-Allison Wedding Solemnized Sunday Evening]',
      titleSource: 'supplied',
      format: 'newspaper',
      place: 'Hagerman, New Mexico',
      controlNumber: 'e.1.16',
      date: {
        display: '1944',
        earliest: 1944,
        latest: 1944,
        basis: ['The Allison wedding was in 1944.'],
        confidence: 'certain',
      },
      recto: {
        file: 'allison-harold-jean-wedding-newspaper.jpg',
      },
      description:
        'This newspaper article highlights the wedding of Harold and Jean Allison on March 26th, 1944.',
      inscriptions: [
        
      ],
      mentions: [
        { person: 'allison-harold-lamar', basis: 'mentioned in article', confidence: 'certain',},
        { person: 'allison-veta-jean-mckinstry', basis: 'mentioned in article', confidence: 'certain',}
      ],
      depicts: [
       
      ],
    },
    {
      slug: 'allison-grizzle-military-newspaper',
      title: '[Three Roswell Boys Serve Their Country]',
      titleSource: 'supplied',
      format: 'newspaper',
      place: 'Roswell, New Mexico',
      controlNumber: 'e.1.17',
      date: {
        display: '1944',
        earliest: 1944,
        latest: 1944,
        basis: ['The date of April 24, 1944 is written on the newspaper'],
        confidence: 'certain',
      },
      recto: {
        file: 'allison-grizzle-military-newspaper.jpg',
      },
      description:
        'This newspaper article highlights the military service of Harold Allison, Oscar Allison, and Wiley Grizzle, Jr.',
      inscriptions: [
        
      ],
      mentions: [
        { person: 'allison-harold-lamar', basis: 'mentioned in article', confidence: 'certain',},
        { person: 'allison-oscar-ingle', basis: 'mentioned in article', confidence: 'certain',},
        { person: 'grizzle-wiley-jr', basis: 'mentioned in article', confidence: 'certain',}
      ],
      depicts: [
       
      ],
    },
    {
      slug: 'hewatt-prisoner-newspaper',
      title: '[Lt. A.E. Hewatt Arrives Home From German Prison Camp]',
      titleSource: 'supplied',
      format: 'newspaper',
      place: 'Roswell, New Mexico',
      controlNumber: 'e.1.19',
      date: {
        display: '1945',
        earliest: 1945,
        latest: 1945,
        basis: ['The date of May 25, 1945 is written on the newspaper'],
        confidence: 'certain',
      },
      recto: {
        file: 'hewatt-prisoner-newspaper.jpg',
      },
      description:
        'This newspaper details the return of Aubrey Hewatt home from a German prison camp in 1945.',
      inscriptions: [
        
      ],
      mentions: [
        { person: 'hewatt-aubrey-edward', basis: 'mentioned in article', confidence: 'certain',},
        { person: 'allison-sammy-nan-mckinstry', basis: 'mentioned in article', confidence: 'certain',},
        
      ],
      depicts: [
       
      ],
    },
    {
      slug: 'hewatt-aubrey-sammy-kids',
      title: '[Aubrey and Sammy Hewatt with kids Nan, Susan, and Mack]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Roswell, New Mexico',
      controlNumber: 'e.1.20',
      date: {
        display: '[1945]',
        earliest: 1945,
        latest: 1945,
        basis: ['This photograph was likely taken about the time Aubrey Hewatt returned from being a prisoner of war in May 1945.'],
        confidence: 'probable',
      },
      recto: {
        file: 'hewatt-aubrey-sammy-kids.jpg',
      },
      description:
        'This photograph depicts Aubrey and Sammy Hewatt standing near a car with their three children, Nan, Susan, and Mack.',
      inscriptions: [
        
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'hewatt-aubrey-edward',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 25.3, y: 9.3, w: 15.8, h: 12.1 },
        },
        {
          person: 'allison-sammy-nan-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 46.6, y: 12.6, w: 14, h: 12.3 },
        },
        {
          person: 'johnson-nan-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 67, y: 37.8, w: 14.7, h: 13.3 },
        },
        {
          as: 'Susan Allison Black',
          living: true,
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 36, y: 46.6, w: 12.5, h: 11.4 },
        },
        {
          as: 'Mack Allison',
          living: true,
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 16.6, y: 21.9, w: 15.1, h: 11.7 },
        },
      ],
    },
    {
      slug: 'allison-james-wiley-birthday-1959',
      title: '[Jim Allison birthday, 1959]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'e.1.22',
      date: {
        display: '[1959]',
        earliest: 1959,
        latest: 1959,
        basis: ['Jim Allison appears to be 2 years old here'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-james-wiley-birthday-1959.jpg',
      },
      description:
        'This photograph depicts James (Jim) Wiley Allison on his second birthday in 1959.',
      inscriptions: [
        
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-james-wiley',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 56.9, y: 38.3, w: 9.7, h: 9.1 },
        },
        
      ],
    },
    {
      slug: 'allison-harold-oscar-pleasent-valley',
      title: '[Harold and Oscar Allison standing with two men at Pleasent Valley sign]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'e.1.23',
      date: {
        display: '[1955]',
        earliest: 1955,
        latest: 1955,
        basis: ['A date of 1955 is printed on the photograph'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-oscar-pleasent-valley.jpg',
      },
      description:
        'This photograph depicts Harold and Oscar Allison standing with two other men next to a sign that says "Pleasent Valley." A date of December 1955 is printed on the right side. The other two men are unidentified.',
      inscriptions: [
        
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 19.1, y: 43.3, w: 10.3, h: 12.1 },
        },
        {
          person: 'allison-oscar-ingle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 66.3, y: 41.6, w: 8.8, h: 11.3 },
        },
      ],
    },
    {
      slug: 'allison-harold-jim-grizzle',
      title: '[Harold Allison and Jim Grizzle hugging]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Texas',
      controlNumber: 'e.1.28',
      date: {
        display: '[1980-1985]',
        earliest: 1980,
        latest: 1985,
        basis: ['There is no date on this photograph, but it is possible it is from 1980 to 1985.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-jim-grizzle.jpg',
      },
      description:
        'This photograph depicts Harold Allison and Jim Grizzle hugging. George Didlake and Verona Grizzle can be seen in the background.',
      inscriptions: [
        
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 27, y: 15.5, w: 19.3, h: 25.4 },
        },
        {
          person: 'grizzle-james',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 51.1, y: 10.6, w: 21.5, h: 30 },
        },
        {
          person: 'didlake-george-howard',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 42.5, y: 13.2, w: 10.9, h: 16.1 },
        },
        {
          person: 'grizzle-verona-jo-warner',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 85.3, y: 25.1, w: 13.4, h: 20.1 },
        },
      ],
    },
    {
      slug: 'allison-harold-ollie-grizzle',
      title: '[Harold Allison and his mother, Ollie Grizzle]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Texas',
      controlNumber: 'e.1.33',
      date: {
        display: '[1944]',
        earliest: 1944,
        latest: 1944,
        basis: ['There is no date on this photograph, but it is probable that it came from shortly after Harold and Jean were married in 1944..'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-ollie-grizzle.jpg',
      },
      description:
        'This photograph depicts Harold Allison and his mother, Ollie Grizzle, standing outside a building.',
      inscriptions: [
        
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 49.5, y: 16.7, w: 24, h: 19 },
        },
        {
          person: 'grizzle-ollie-blanche-ingle-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 25.1, y: 20, w: 23.4, h: 19.9 },
        },
  
      ],
    },
    {
      slug: 'allison-oscar-portrait',
      title: '[Portrait of Oscar Allison, 1941]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'e.1.34',
      date: {
        display: '[1941]',
        earliest: 1941,
        latest: 1941,
        basis: ['There is no date on this photograph, but it was likely taken around the time Oscar enlisted in the military in 1941.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-oscar-portrait.jpg',
      },
      description:
        'This is a portrait of Oscar Allison that was likely taken around the time Oscar enlisted in the military.',
      inscriptions: [
        
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-oscar-ingle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 29.7, y: 17.9, w: 47.1, h: 39.9 },
        },
        
      ],
    },
    {
      slug: 'grizzle-wiley-working-on-car',
      title: '[Photograph of Wiley Grizzle working on a car]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'e.1.35',
      date: {
        display: '[1941-1943]',
        earliest: 1941,
        latest: 1943,
        basis: ['There is no date on this photograph, but it can be presumed that the photograph was taken between 1941 and 1943.'],
        confidence: 'probable',
      },
      recto: {
        file: 'grizzle-wiley-working-on-car.jpg',
      },
      description:
        'This is a photograph of Wiley Grizzle working on a car. His face is not visible.',
      inscriptions: [
        {
          location: 'recto',
          medium: 'ink',
          text: 'See "Mechanic Kitty" on the fender helping Daddy?'
        }
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'grizzle-wiley',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 20.4, y: 35.7, w: 9.1, h: 17.4 },
        },
        
      ],
    },
    {
      slug: 'allison-home-construction',
      title: '[Home of Harold and Jean Allison]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'e.1.36',
      date: {
        display: '[1952-1953]',
        earliest: 1952,
        latest: 1953,
        basis: ['This photograph is undated, but it was likely taken near the end of construction of the new Allison home in 1952 or 1953.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-home-construction.jpg',
      },
      description:
        'This photograph shows the home of Harold and Jean Allison either at the end of construction or just prior to the Allisons moving in. This view was taken from what became the backyard facing south and southwest.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        
      ],
    },
    {
      slug: 'allison-harold-training',
      title: '[Harold Allison B-17 training with others]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'unknown',
      controlNumber: 'e.1.41',
      date: {
        display: '[1943-1945]',
        earliest: 1943,
        latest: 1945,
        basis: ['A 1943 to 1945 date is probable and coincides with Harold\'s military training.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-training.jpg',
      },
      description:
        'This photograph depicts Harold Allison training with three others to evacuate a B-17. This was likely taken during Harold\'s time training to fly a B-17.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 38.8, y: 41, w: 7.3, h: 9.7 },
        },
      ],
    },
    {
      slug: 'allison-oscar-with-other-military-men',
      title: '[Oscar Allison standing with military friends Joe and Al]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Roswell, New Mexico',
      controlNumber: 'e.1.42',
      date: {
        display: '[1943]',
        earliest: 1943,
        latest: 1943,
        basis: ['This photograph was likely taken during the time Oscar was training and prior to his deployment. Oscar visited Roswell in 1943 prior to deploying, and this is likely during that trip.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-oscar-with-other-military-men.jpg',
      },
      description:
        'This photograph depicts Oscar Allison standing with two other men identified as Joe and Al. The water tower in the background is labeled "Roswell, N.M.", so this must be before Oscar deployed to Europe.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-oscar-ingle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 68.7, y: 38.8, w: 9.7, h: 16.3 },
        },
      ],
    },
    {
      slug: 'allison-jack-letterman-jacket-1',
      title: '[Jack Allison standing in front of his house in his letterman jacket]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'e.1.43',
      date: {
        display: '[1970-1971]',
        earliest: 1970,
        latest: 1971,
        basis: ['This was likely taken during Jack\'s senior year in 1970-1971.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-jack-letterman-jacket-1.jpg',
      },
      description:
        'This photograph depicts Jack standing in front of his Lamb County home wearing his Muleshoe High School letterman jacket.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-jack-william',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 53, y: 13.1, w: 21.1, h: 25.2 },
        },
      ],
    },
    {
      slug: 'allison-jack-letterman-jacket-2',
      title: '[Jack Allison standing in front of his house in his letterman jacket]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'e.1.44',
      date: {
        display: '[1970-1971]',
        earliest: 1970,
        latest: 1971,
        basis: ['This was likely taken during Jack\'s senior year in 1970-1971.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-jack-letterman-jacket-2.jpg',
      },
      description:
        'This photograph depicts Jack standing in front of his Lamb County home wearing his Muleshoe High School letterman jacket. A black labrador dog can be seen.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-jack-william',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 48.2, y: 7.3, w: 19.2, h: 21.1 },
        },
      ],
    },
    {
      slug: 'allison-jack-letterman-jacket-3',
      title: '[Jack Allison standing in front of his house in his letterman jacket]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'e.1.47',
      date: {
        display: '[1970-1971]',
        earliest: 1970,
        latest: 1971,
        basis: ['This was likely taken during Jack\'s senior year in 1970-1971.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-jack-letterman-jacket-3.jpg',
      },
      description:
        'This photograph depicts Jack standing in front of his Lamb County home wearing his Muleshoe High School letterman jacket.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-jack-william',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 37.4, y: 15.8, w: 20.9, h: 24.8 },
        },
      ],
    },
    {
      slug: 'allison-jack-football-1',
      title: '[Jack Allison football portrait, 1969]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'e.1.45',
      date: {
        display: '[1969]',
        earliest: 1969,
        latest: 1969,
        basis: ['This was likely taken during Jack\'s junior year football season in 1969.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-jack-football-1.jpg',
      },
      description:
        'This photograph depicts Jack Allison in his football uniform from the 1969 Muleshoe Mules season. He is wearing the number 86 here.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-jack-william',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 43.7, y: 15.3, w: 18.7, h: 27.5 },
        },
      ],
    },
    {
      slug: 'allison-jack-football-2',
      title: '[Jack Allison football portrait, 1968]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'e.1.46',
      date: {
        display: '[1968]',
        earliest: 1968,
        latest: 1968,
        basis: ['This was likely taken during Jack\'s sophomore year football season in 1968.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-jack-football-2.jpg',
      },
      description:
        'This photograph depicts Jack Allison in his football uniform from the 1968 Muleshoe Mules season. He is wearing the number 84 here.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-jack-william',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 39.1, y: 20.6, w: 17.8, h: 26 },
        },
      ],
    },
    {
      slug: 'allison-jim-nancy-carolyn-1979',
      title: '[Jim, Nancy, and Carolyn Allison at the wedding of Fred and Martha Allison]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Texas',
      controlNumber: 'e.1.25',
      date: {
        display: '[1979]',
        earliest: 1979,
        latest: 1979,
        basis: ['This may be from the 1979 wedding of Fred and Martha Allison'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-jim-nancy-carolyn-1979.jpg',
      },
      description:
        'This photograph depicts Jim, Nancy, and Carolyn Allison at the 1979 wedding of Fred and Martha Allison.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-james-wiley',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 9.1, y: 22, w: 18.9, h: 26.9 },
        },
        {
          person: 'allison-nancy-ann-webster',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 42.3, y: 31.7, w: 17.6, h: 24.7 },
        },
        {
          person: 'allison-carolyn',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 58.5, y: 24.2, w: 12.7, h: 22.5 },
        },
        {
          person: 'osborn-stephen-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 74.6, y: 15.1, w: 11.8, h: 17 },
        },
        {
          person: 'allison-fred-harold',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 1.4, y: 24.6, w: 7.8, h: 16.8 },
        },
        {
          person: 'mckinstry-loveta-swann',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 24.2, y: 25.3, w: 9.3, h: 15.8 },
        },
      ],
    },
    {
      slug: 'allison-jim-nancy-carolyn-kathy',
      title: '[Jim, Nancy, Carolyn, Kathy, and Samantha Allison at an unspecified event]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Texas',
      controlNumber: 'e.1.26',
      date: {
        display: '[1982]',
        earliest: 1982,
        latest: 1982,
        basis: ['1982 is an estimated date'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-jim-nancy-carolyn-kathy.jpg',
      },
      description:
        'This photograph depicts Jim, Nancy, Carolyn, and Kathy Allison at an unspecified event.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-james-wiley',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 27.5, y: 35.6, w: 10.5, h: 17.5 },
        },
        {
          person: 'allison-nancy-ann-webster',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 40.5, y: 42.2, w: 10.8, h: 17.2 },
        },
        {
          person: 'allison-carolyn',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 14.2, y: 36.7, w: 10.8, h: 16.7 },
        },
        {
          person: 'allison-kathy-jean-kelley',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 61.7, y: 37.3, w: 12.7, h: 18.5 },
        },
        {
          person: 'weinheimer-samantha-jean-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 54.6, y: 38.7, w: 11.6, h: 18.8 },
        },
        
      ],
    },
    {
      slug: 'allison-harold-unknown-man',
      title: '[Harold Allison talking to an unknown man]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Texas',
      controlNumber: 'e.1.27',
      date: {
        display: '[1979]',
        earliest: 1979,
        latest: 1979,
        basis: ['1979 is an estimated date'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-unknown-man.jpg',
      },
      description:
        'This photograph depicts Harold Allison talking to an unknown man. Verona Grizzle and Jean Allison are in the background.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 53.8, y: 37.3, w: 17.8, h: 23.1 },
        },
        {
          person: 'allison-veta-jean-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 1.7, y: 43.8, w: 7.7, h: 11.7 },
        },
        {
          person: 'grizzle-verona-jo-warner',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 71.8, y: 45.7, w: 8.9, h: 14.5 },
        },
      ],
    },
    {
      slug: 'allison-harold-jean-nancy-wyndi',
      title: '[Harold, Jean, Nancy, and Wyndi Allison sitting in an unknown backyard]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Texas',
      controlNumber: 'e.1.29',
      date: {
        display: '[1986-1987]',
        earliest: 1986,
        latest: 1987,
        basis: ['Wyndi appears to be between one and two years old here, which places this photograph in 1986 or 1987.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-jean-nancy-wyndi.jpg',
      },
      description:
        'This photograph depicts Harold, Jean, Nancy, and Wyndi Allison. They are sitting in the fenced backyard of an unknown house.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 13.3, y: 38.8, w: 10.6, h: 14 },
        },
        {
          person: 'allison-veta-jean-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 62.3, y: 39.4, w: 10.6, h: 14.9 },
        },
        {
          person: 'allison-nancy-ann-webster',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 66.4, y: 67.9, w: 14.8, h: 19.2 },
        },
        {
          person: 'ludwikowski-wyndolyn-michelle-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 52.5, y: 45.6, w: 9.5, h: 15.3 },
        },
      ],
    },
    {
      slug: 'allison-grizzle-group-1',
      title: '[Group of Allison and Grizzle men]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Texas',
      controlNumber: 'e.1.30',
      date: {
        display: '[1990]',
        earliest: 1990,
        latest: 1990,
        basis: ['Austin appears to be less than one year old here, which places this photograph in 1990.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-grizzle-group-1.jpg',
      },
      description:
        'This photograph depicts a group of Allison and Grizzle men. This includes F.A. Andreas, George Didlake, Austin Allison, Jim Allison, Harold Allison, Jim Grizzle, Winston Allison, and Sam Allison.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 36.1, y: 38.7, w: 8.4, h: 13.6 },
        },
        {
          person: 'andreas-floyd-adolf',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 20, y: 7.9, w: 9.8, h: 16.6 },
        },
        {
          person: 'didlake-george-howard',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 64.3, y: 22.8, w: 7.7, h: 11.3 },
        },
        {
          person: 'grizzle-james',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 51.6, y: 35, w: 9.5, h: 14 },
        },
        {
          person: 'allison-winston-irvin',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 71.3, y: 30.6, w: 9.1, h: 14.5 },
        },
        {
          person: 'allison-sam-oscar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 71.3, y: 46.3, w: 10.7, h: 15.1 },
        },
        {
          person: 'allison-james-wiley',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 24, y: 46.5, w: 9.5, h: 14.7 },
        },
        {
          person: 'allison-austin-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 18.2, y: 60.6, w: 8.8, h: 13 },
        },
      ],
    },
    {
      slug: 'allison-carolyn-1955-outside-house',
      title: '[Carolyn Allison standing outside her house, circa 1955]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'h.1.24.4',
      date: {
        display: '[1955]',
        earliest: 1955,
        latest: 1955,
        basis: ['The photo is dated 1955, but this could be the print date. Carolyn does appear to be about 7 years old, which makes 1955 probable'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-carolyn-1955-outside-house-recto.jpg',
      },
      description:
        'This photograph depicts Carolyn Allison standing outside of her house in Lamb County between Muleshoe and Earth.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-carolyn',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 50.2, y: 38.7, w: 8.4, h: 11.4 },
        },
        
      ],
    },
    {
      slug: 'allison-fred-jack-outside-house',
      title: '[Fred and Jack Allison standing outside their house, circa 1955]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'h.1.23.3',
      date: {
        display: '[1955]',
        earliest: 1955,
        latest: 1955,
        basis: ['The photo is dated 1955, but this could be the print date. Fred appears to be 5 years old here.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-fred-jack-outside-house-recto.jpg',
      },
      description:
        'This photograph depicts Fred and Jack Allison standing outside of their house in Lamb County between Muleshoe and Earth.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-fred-harold',
          confidence: 'certain',
          basis:
            'Known identity',
                    region: { face: 'recto', x: 49.6, y: 29.6, w: 13.4, h: 18.1 },
        },
        {
          person: 'allison-jack-william',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 32.2, y: 45.7, w: 13.4, h: 16.5 },
        },
      ],
    },
    {
      slug: 'allison-fred-school-picture-1',
      title: '[Fred Allison, circa 1958-1960]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Muleshoe, Texas',
      controlNumber: 'h.1.24.3',
      date: {
        display: '[1958-1960]',
        earliest: 1958,
        latest: 1960,
        basis: ['Fred appears to be 8 to 10 years old here'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-fred-school-picture-1-recto.jpg',
      },
      description:
        'This is a school portrait of Fred Allison from between 1958 and 1960.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-fred-harold',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 25, y: 13.9, w: 55.2, h: 50.4 },
        },
        
      ],
    },
    {
      slug: 'allison-jack-jim-eddie-mitch-john',
      title: '[Jack and Jim Allison with Eddie and Mitch Black]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'h.1.23.2',
      date: {
        display: '[1973]',
        earliest: 1973,
        latest: 1973,
        basis: ['This photograph is dated 1973 on the verso of another print. That photograph says this is the "last of Jack" before he died in June 1973.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-jack-jim-eddie-mitch-john-recto.jpg',
      },
      description:
        'This photograph depicts Jack and Jim Allison and Eddie and Mitch Black. Jack is holding John Skogland, III.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-jack-william',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 44.6, y: 22.1, w: 13.1, h: 15.6 },
        },
        {
          person: 'allison-james-wiley',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 69.7, y: 36, w: 15, h: 17.4 },
        },
      ],
    },
    {
      slug: 'allison-jim-school-picture-1',
      title: '[Jim Allison, circa 1967-1968]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Muleshoe, Texas',
      controlNumber: 'h.1.24.1',
      date: {
        display: '[1967-1968]',
        earliest: 1967,
        latest: 1968,
        basis: ['Jim appears to be 10 or 11 here.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-jim-school-picture-1-recto.jpg',
      },
      description:
        'This is a school portrait of Jim Allison from between 1967 and 1968.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-james-wiley',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 31.1, y: 14.3, w: 50.6, h: 45.5 },
        },
        
      ],
    },
    {
      slug: 'allison-sam-jack-jemima',
      title: '[Sam and Jack Allison with black labrador Jemima]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'h.1.21.4',
      date: {
        display: '[1970-1971]',
        earliest: 1970,
        latest: 1971,
        basis: ['Jack appears to be around his senior year of high school, which places this photograph in 1970 or 1971.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-sam-jack-jemima-recto.jpg',
      },
      description:
        'This photograph depicts Sam and Jack Allison sitting on the ground eating foot at the home of Harold and Jean Allison. Black labrador Jemima is next to Jack.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-jack-william',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 39.9, y: 56.4, w: 11, h: 11.2 },
        },
        {
          person: 'allison-sam-oscar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 54.3, y: 62.4, w: 13.2, h: 12.8 },
        },
      ],
    },
    {
      slug: 'grizzle-ollie-blanche-funeral-1',
      title: '[Family photograph at the funeral of Ollie Grizzle]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Fort Sumner, New Mexico',
      controlNumber: 'h.1.19.1',
      date: {
        display: '1976',
        earliest: 1976,
        latest: 1976,
        basis: ['This funeral was in 1976'],
        confidence: 'certain',
      },
      recto: {
        file: 'grizzle-ollie-blanche-funeral-1-recto.jpg',
      },
      description:
        'This photograph depicts several members of the Allison and Grizzle family at the funeral of Ollie Blanche Grizzle in December 1976. The man on the left is family friend Sidney Redfield.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      related: [
          { slug: 'grizzle-ollie-blanche-funeral-2', relation: ''},
          { slug: 'grizzle-ollie-blanche-funeral-3', relation: ''},
          { slug: 'grizzle-ollie-blanche-funeral-4', relation: ''},
      ],
      depicts: [
        {
          as: 'Sidney Redfield',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 29.6, y: 34.4, w: 8.1, h: 13.4 },
        },
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 37.4, y: 34.5, w: 6.7, h: 12.6 },
        },
        {
          person: 'didlake-ollie-mae-grizzle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 47.9, y: 33.8, w: 7.5, h: 13.4 },
        },
        {
          person: 'didlake-george-howard',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 54, y: 28, w: 6.6, h: 9.8 },
        },
        {
          person: 'allison-lanora-ethel-wells',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 55.2, y: 35.9, w: 7.2, h: 12.7 },
        },
        {
          person: 'allison-james-wiley',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 64.4, y: 31.6, w: 8.3, h: 13.9 },
        },
        {
          person: 'allison-fred-harold',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 72.5, y: 31.6, w: 7.4, h: 12.6 },
        },
        {
          person: 'skogland-veta-sue-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 77.5, y: 37.5, w: 8, h: 15 },
        },
        {
          person: 'osborn-mildred-adeline-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 83.1, y: 33.6, w: 6.3, h: 13.5 },
        },
        {
          person: 'osborn-kenneth',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 87, y: 29.6, w: 9, h: 17.8 },
        },
      ],
    },
    {
      slug: 'grizzle-ollie-blanche-funeral-2',
      title: '[Casket of Ollie Blanche Grizzle at her 1976 funeral]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Fort Sumner, New Mexico',
      controlNumber: 'h.1.19.4',
      date: {
        display: '1976',
        earliest: 1976,
        latest: 1976,
        basis: ['This funeral was in 1976'],
        confidence: 'certain',
      },
      recto: {
        file: 'grizzle-ollie-blanche-funeral-2-recto.jpg',
      },
      description:
        'This photograph depicts the casket of Ollie Blanche Ingle Allison Grizzle at her December 1976 funeral.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      related: [
          { slug: 'grizzle-ollie-blanche-funeral-1', relation: ''},
          { slug: 'grizzle-ollie-blanche-funeral-3', relation: ''},
          { slug: 'grizzle-ollie-blanche-funeral-4', relation: ''},
      ],
      depicts: [
        
      ],
    },
    {
      slug: 'grizzle-ollie-blanche-funeral-3',
      title: '[Family photograph at the funeral of Ollie Grizzle]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Fort Sumner, New Mexico',
      controlNumber: 'h.1.20.1',
      date: {
        display: '1976',
        earliest: 1976,
        latest: 1976,
        basis: ['This funeral was in 1976'],
        confidence: 'certain',
      },
      recto: {
        file: 'grizzle-ollie-blanche-funeral-3-recto.jpg',
      },
      description:
        'This photograph depicts several members of the Allison and Grizzle family at the funeral of Ollie Blanche Grizzle in December 1976. The man on the left is family friend Sidney Redfield. Each of these individuals are grandchildren of Ollie Grizzle.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      related: [
          { slug: 'grizzle-ollie-blanche-funeral-1', relation: ''},
          { slug: 'grizzle-ollie-blanche-funeral-2', relation: ''},
          { slug: 'grizzle-ollie-blanche-funeral-4', relation: ''},
      ],
      depicts: [
        {
          person: 'allison-fred-harold',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 43, y: 32.9, w: 7.2, h: 12.4 },
        },
        {
          person: 'allison-james-wiley',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 52.6, y: 36.5, w: 5.5, h: 7.9 },
        },
        {
          person: 'skogland-veta-sue-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 53.9, y: 41.2, w: 5.3, h: 9.8 },
        },
        {
          as: 'Georga Didlake',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 64.1, y: 34.3, w: 6.8, h: 11.6 },
        },
        {
          person: 'allison-robert-carroll',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 77.2, y: 32.7, w: 6.2, h: 9.7 },
        },
        {
          person: 'allison-carolyn',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 79.8, y: 40.5, w: 5.7, h: 10 },
        },
        {
          person: 'allison-sam-oscar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 88.7, y: 36, w: 6.9, h: 11.4 },
        },
        
      ],
    },
    {
      slug: 'grizzle-ollie-blanche-funeral-4',
      title: '[Family photograph at the funeral of Ollie Grizzle]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Fort Sumner, New Mexico',
      controlNumber: 'h.1.20.3',
      date: {
        display: '1976',
        earliest: 1976,
        latest: 1976,
        basis: ['This funeral was in 1976'],
        confidence: 'certain',
      },
      recto: {
        file: 'grizzle-ollie-blanche-funeral-4-recto.jpg',
      },
      description:
        'This photograph depicts several members of the Allison and Grizzle family at the funeral of Ollie Blanche Grizzle in December 1976. The man on the left is family friend Sidney Redfield.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      related: [
          { slug: 'grizzle-ollie-blanche-funeral-1', relation: ''},
          { slug: 'grizzle-ollie-blanche-funeral-2', relation: ''},
          { slug: 'grizzle-ollie-blanche-funeral-3', relation: ''},
      ],
      depicts: [
        {
          as: 'Sidney Redfield',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 19.2, y: 41.8, w: 5.7, h: 9.3 },
        },
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 31.2, y: 41.4, w: 5.7, h: 7.6 },
        },
        {
          person: 'didlake-ollie-mae-grizzle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 51.7, y: 41.2, w: 5.5, h: 10.1 },
        },
        {
          person: 'didlake-george-howard',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 47.5, y: 35.6, w: 5, h: 9.4 },
        },
        {
          person: 'allison-lanora-ethel-wells',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 35.3, y: 42.5, w: 6, h: 9.5 },
        },
        {
          person: 'allison-james-wiley',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 66.8, y: 39.4, w: 6.9, h: 10 },
        },
        {
          person: 'allison-veta-jean-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 44, y: 43, w: 5.3, h: 9.4 },
        },
        {
          person: 'skogland-veta-sue-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 60.3, y: 43.8, w: 6.2, h: 8.8 },
        },
        
      ],
    },
    {
      slug: 'allison-veta-1955-outside-house',
      title: '[Veta Allison standing outside her house, circa 1955]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'h.1.24.2',
      date: {
        display: '[1955]',
        earliest: 1955,
        latest: 1955,
        basis: ['The photo is dated 1955, but this could be the print date. Veta does appear to be about 9 years old, which makes 1955 probable'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-veta-1955-outside-house-recto.jpg',
      },
      description:
        'This photograph depicts Veta Allison standing outside of her house in Lamb County between Muleshoe and Earth.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'skogland-veta-sue-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 47.5, y: 41.5, w: 10.3, h: 12.5 },
        },
        
      ],
    },
    {
      slug: 'grizzle-ollie-susan-mary',
      title: '[Ollie Grizzle standing with Susan Black and Mary Andreas]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'h.1.20.4',
      date: {
        display: '[1970-1971]',
        earliest: 1970,
        latest: 1971,
        basis: ['No date is available for this photograph, but it appears it may be from 1970 or 1971.'],
        confidence: 'probable',
      },
      recto: {
        file: 'grizzle-ollie-susan-mary-recto.jpg',
      },
      description:
        'This photograph depicts Ollie Grizzle standing with Susan Black and Mary Andreas at the home of Harold and Jean Allison.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'grizzle-ollie-blanche-ingle-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 21.1, y: 40.6, w: 12.3, h: 14.2 },
        },
        {
          person: 'black-susan-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 69.3, y: 36.2, w: 12, h: 13.5 },
        },
        {
          person: 'andreas-mary-lorene-grizzle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 29.8, y: 39.4, w: 11.8, h: 13.1 },
        },
      ],
    },
    {
      slug: 'allison-harold-jean-family-1955',
      title: '[Harold and Jean Allison family, circa 1955]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'h.1.23.4',
      date: {
        display: '[1955-1956]',
        earliest: 1955,
        latest: 1956,
        basis: ['This photograph is undated, but it is likely from 1955 or 1956. Jack appears to be 2 or 3 years old here.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-jean-family-1955-recto.jpg',
      },
      description:
        'This photograph depicts Harold, Jean, Veta, Carolyn, Fred, and Jack Allison standing outside their home in Lamb County between Muleshoe and Earth.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 39.7, y: 18.1, w: 10.9, h: 13.1 },
        },
        {
          person: 'allison-veta-jean-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 64.8, y: 22.6, w: 10.4, h: 13.3 },
        },
        {
          person: 'skogland-veta-sue-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 25.4, y: 37.1, w: 12, h: 14.7 },
        },
        {
          person: 'allison-carolyn',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 44.1, y: 40.6, w: 9.4, h: 12.5 },
        },
        {
          person: 'allison-fred-harold',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 59.8, y: 46.9, w: 10.7, h: 13.5 },
        },
        {
          person: 'allison-jack-william',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 29.8, y: 19.6, w: 9.7, h: 12.6 },
        },
      ],
    },
    {
      slug: 'allison-gerald-harold-oscar-1921',
      title: '[Gerald, Harold, and Oscar Allison, circa 1921]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'h.1.25.2',
      date: {
        display: '[1921]',
        earliest: 1921,
        latest: 1921,
        basis: ['The verso identifies a likely date of 1921.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-gerald-oscar-1921-recto.jpg',
      },
      verso: {
        file: 'allison-harold-gerald-oscar-1921-recto.jpg',
      },
      description:
        'This photograph depicts Gerald, Harold, and Oscar Allison standing in a line side-by-side.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'allison-gerald-parker',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 22.2, y: 23.7, w: 11, h: 10.1 },
        },
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 38.5, y: 36.8, w: 8.8, h: 8.4 },
        },
        {
          person: 'allison-oscar-ingle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 52.1, y: 42.9, w: 10.1, h: 8.5 },
        },
        
      ],
    },
    {
      slug: 'grizzle-ollie-sister-gladys',
      title: '[Ollie Grizzle and her sister Mary Gladys Ingle Patterson]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'h.1.22.4',
      date: {
        display: '[1960]',
        earliest: 1960,
        latest: 1960,
        basis: ['A date of 1960 is printed on the edge of the photo. This may be a print date, but a 1960 date seems probable.'],
        confidence: 'probable',
      },
      recto: {
        file: 'grizzle-ollie-sister-gladys-recto.jpg',
      },
      
      description:
        'This photograph depicts Ollie Blanche Ingle Grizzle and her sister Mary Glady Ingle Patterson.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'grizzle-ollie-blanche-ingle-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 48.8, y: 33, w: 7.4, h: 12.6 },
        },
        {
          person: 'patterson-mary-gladys-ingle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 35.6, y: 34, w: 8, h: 15.3 },
        },
        
        
      ],
    },
    {
      slug: 'grizzle-ollie-blanche-funeral-program',
      title: '[Funeral program of Ollie Blanche Grizzle]',
      titleSource: 'supplied',
      format: 'document',
      place: 'New Mexico',
      controlNumber: 'h.1.2',
      date: {
        display: '1976',
        earliest: 1976,
        latest: 1976,
        basis: ['Ollie Blanche Grizzle died in 1976.'],
        confidence: 'certain',
      },
      recto: {
        file: 'grizzle-ollie-blanche-funeral-program-recto.jpg',
      },
      verso: {
        file: 'grizzle-ollie-blanche-funeral-program-verso.jpg',
      },
      description:
        'This is the funeral program for Ollie Blanche Grizzle from 1976.',
      inscriptions: [
        
      ],
      mentions: [ 
        { person: 'grizzle-ollie-blanche-ingle-allison', basis: 'mentioned in article', confidence: 'certain',}
      ],
      depicts: [         
      ],
    },
    {
      slug: 'allison-harold-war-savings-bond',
      title: '[1944 War Savings Bond purchased by Harold Allison for Oscar Allison]',
      titleSource: 'supplied',
      format: 'document',
      place: 'New Mexico',
      controlNumber: 'h.1.7',
      date: {
        display: '1944',
        earliest: 1944,
        latest: 1944,
        basis: ['This document has a 1944 date.'],
        confidence: 'certain',
      },
      recto: {
        file: 'allison-harold-war-savings-bond-recto.jpg',
      },
      
      description:
        'This is a War Saving Bond purchased by Harold Allison in April 1944. It is possible that Harold purchased this shortly after Oscar became a prisoner of war just a month prior.',
      inscriptions: [
        
      ],
      mentions: [ 
        { person: 'allison-harold-lamar', basis: 'mentioned in article', confidence: 'certain',},
        { person: 'allison-oscar-ingle', basis: 'mentioned in article', confidence: 'certain',}
      ],
      depicts: [         
      ],
    },
    {
      slug: 'allison-mckinstry-wedding-announcement',
      title: '[Harold Allison and Jean McKinstry wedding announcement]',
      titleSource: 'supplied',
      format: 'document',
      place: 'New Mexico',
      controlNumber: 'h.1.9',
      date: {
        display: '1944',
        earliest: 1944,
        latest: 1944,
        basis: ['This document has a 1944 date.'],
        confidence: 'certain',
      },
      recto: {
        file: 'allison-mckinstry-wedding-announcement-recto.jpg',
      },
      
      description:
        'This is the wedding announcement of Harold Allison and Jean McKinstry',
      inscriptions: [
        
      ],
      mentions: [ 
        { person: 'allison-harold-lamar', basis: 'mentioned in article', confidence: 'certain',},
        { person: 'allison-veta-jean-mckinstry', basis: 'mentioned in article', confidence: 'certain',}
      ],
      depicts: [         
      ],
    },
    {
      slug: 'grizzle-wiley-funeral-newspaper',
      title: 'Funeral rites for Wiley Grizzle to Be Held Here Sunday',
      titleSource: 'supplied',
      format: 'document',
      place: 'New Mexico',
      controlNumber: 'h.1.10',
      date: {
        display: '1949',
        earliest: 1949,
        latest: 1949,
        basis: ['There is no date on this newspaper clipping, but it is likely from 1949 when the reburial service occurred. The newspaper says "Mr. and Mrs. Wiley Grizzle, now in Muleshoe, Tex.", which suggests a 1949 date. A 1946 date is possible, too. A similar article appeared in the June 9th, 1949 issue of the Muleshoe Journal.'],
        confidence: 'probable',
      },
      recto: {
        file: 'grizzle-wiley-funeral-newspaper-recto.jpg',
      },
      
      description:
        'This is a newspaper clipping likely from the Roswell Daily Record detailing the funeral service for Wiley Grizzle, Jr.',
      inscriptions: [
        
      ],
      mentions: [ 
        { person: 'grizzle-wiley-jr', basis: 'mentioned in article', confidence: 'certain',},
      ],
      depicts: [         
      ],
    },
    {
      slug: 'grizzle-wiley-letter-1945-january',
      title: '[Letter from Wiley Grizzle, Jr. to Ollie Grizzle, January 1945]',
      titleSource: 'supplied',
      format: 'document',
      place: 'England',
      controlNumber: 'h.1.11',
      date: {
        display: '1945',
        earliest: 1945,
        latest: 1945,
        basis: ['The envelope is postmarked January 1945.'],
        confidence: 'probable',
      },
      recto: {
        file: 'grizzle-wiley-letter-1945-january.jpg',
      },
      
      description:
        'This is a letter written from Wiley Grizzle, Jr. to his mother, Ollie Grizzle. The envelope is postmarked with a January 1945 date. The letter is a photostatic copy.',
      inscriptions: [
        
      ],
      mentions: [ 
        { person: 'grizzle-wiley-jr', basis: 'mentioned in article', confidence: 'certain',},
        { person: 'grizzle-ollie-blanche-ingle-allison', basis: 'mentioned in article', confidence: 'certain',},
      ],
      depicts: [         
      ],
    },
    {
      slug: 'grizzle-wiley-portrait-1',
      title: '[Portrait of Wiley Grizzle, Jr.]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'h.1.12.2',
      date: {
        display: '[1944]',
        earliest: 1944,
        latest: 1944,
        basis: ['This photograph is likely from Wiley Jr.\'s time at Garden City Army Air Field in 1944.'],
        confidence: 'probable',
      },
      recto: {
        file: 'grizzle-wiley-portrait-1.jpg',
      },
      
      description:
        'This portrait depicts Wiley Grizzle, Jr. in an airman uniform. This was likely taken during Wiley\'s time in Garden City during training.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'grizzle-wiley-jr',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 31.1, y: 9.8, w: 43.6, h: 44.2 },
        },
      ],
    },
    {
      slug: 'raydon-airplanes',
      title: '[P-51s over Raydon]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Raydon, England',
      controlNumber: 'h.1.13.1',
      date: {
        display: '[1944-1945]',
        earliest: 1944,
        latest: 1945,
        basis: ['This photograph is undated, but likely taken between 1944 and 1945.'],
        confidence: 'probable',
      },
      recto: {
        file: 'raydon-airplanes.jpg',
      },
      
      description:
        'This is a souvenir photograph of P-51 Mustangs over Raydon Air Base in England.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        
      ],
    },
    {
      slug: 'grizzle-wiley-funeral-program',
      title: '[Wiley Grizzle, Jr. funeral program]',
      titleSource: 'supplied',
      format: 'document',
      place: 'England',
      controlNumber: 'h.1.13.2',
      date: {
        display: '[1946-1949]',
        earliest: 1946,
        latest: 1949,
        basis: ['The date of this funeral program is unclear, but it is likely from either a 1946 funeral or the 1949 reburial of Junior\'s remains.'],
        confidence: 'probable',
      },
      recto: {
        file: 'grizzle-wiley-funeral-program-recto.jpg',
      },
      verso: {
        file: 'grizzle-wiley-funeral-program-verso.jpg',
      },
      description:
        'This is a funeral program for Wiley Grizzle, Jr. The date of the program is unknown, but it is likely from either 1946 or 1949.',
      inscriptions: [
        
      ],
      mentions: [ 
        { person: 'grizzle-wiley-jr', basis: 'mentioned in article', confidence: 'certain',},
        
      ],
      depicts: [         
      ],
    },
    {
      slug: 'grizzle-wiley-killed-in-action-newspaper',
      title: 'Lt. Wiley Grizzle Listed as Killed In European Action',
      titleSource: 'supplied',
      format: 'document',
      place: 'New Mexico',
      controlNumber: 'h.1.14.2',
      date: {
        display: '1946',
        earliest: 1946,
        latest: 1946,
        basis: ['This newspaper clipping is undated, but it is likely from March 1946 when the Grizzles were notified that Junior had been killed rather than missing in action.'],
        confidence: 'probable',
      },
      recto: {
        file: 'grizzle-wiley-killed-in-action-newspaper-recto.jpg',
      },
      verso: {
        file: 'grizzle-wiley-killed-in-action-newspaper-verso.jpg',
      },
      description:
        'This is a newspaper from the Roswell Daily Record showing that Wiley Grizzle, Jr. had been killed in action. He had previously been reported as missing in action.',
      inscriptions: [
        
      ],
      mentions: [ 
        { person: 'grizzle-wiley-jr', basis: 'mentioned in article', confidence: 'certain',},
      ],
      depicts: [         
      ],
    },
    {
      slug: 'grizzle-wiley-otu-class',
      title: 'O.T.U. Class of Dec. and Jan.',
      titleSource: 'inscribed',
      format: 'snapshot',
      place: 'Raydon, England',
      controlNumber: 'h.1.14.3',
      date: {
        display: '[1944-1945]',
        earliest: 1944,
        latest: 1945,
        basis: ['This photograph is undated, but likely taken between 1944 and 1945. Wiley Grizzle, Jr. went through this program in December 1944 and January 1945.'],
        confidence: 'probable',
      },
      recto: {
        file: 'grizzle-wiley-otu-class-recto.jpg',
      },
      verso: {
        file: 'grizzle-wiley-otu-class-verso.jpg',
      },
      description:
        'This photograph depicts the Operational Training Unit (OTU) Class of Decemeber 1944 and January 1945 at Raydon Air Base in England. Wiley Grizzle, Jr. is on the bottom row third from the left. Others are identified on the verso.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'grizzle-wiley-jr',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 58.4, y: 59.5, w: 6.9, h: 10.2 },
        },
      ],
    },
    {
      slug: 'grizzle-wiley-grave-1',
      title: '[Grave of Wiley Grizzle, Jr. at Roswell, New Mexico cemetery]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Roswell, New Mexico',
      controlNumber: 'h.1.14.4',
      date: {
        display: '[1949]',
        earliest: 1949,
        latest: 1949,
        basis: ['This photograph is undated, but it appears to be from the reburial service that occurred in 1949.'],
        confidence: 'probable',
      },
      recto: {
        file: 'grizzle-wiley-grave-1-recto.jpg',
      },
      verso: {
        file: 'grizzle-wiley-grave-1-verso.jpg',
      },
      description:
        'This photograph depicts the grave of Wiley Grizzle Jr. It was likely taken at the reburial service that occurred on June 5, 1949 at Roswell, New Mexico.',
      inscriptions: [        
      ],
      mentions: [ 
      ],
      depicts: [
      ],
      related: [
        { slug: 'grizzle-wiley-grave-2', relation: 'Another view' }
      ]
    },
    {
      slug: 'grizzle-wiley-grave-2',
      title: '[Grave of Wiley Grizzle, Jr. at Roswell, New Mexico cemetery]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Roswell, New Mexico',
      controlNumber: 'h.1.15.4',
      date: {
        display: '[1949]',
        earliest: 1949,
        latest: 1949,
        basis: ['This photograph is undated, but it appears to be from the reburial service that occurred in 1949.'],
        confidence: 'probable',
      },
      recto: {
        file: 'grizzle-wiley-grave-2-recto.jpg',
      },
      verso: {
        file: 'grizzle-wiley-grave-2-verso.jpg',
      },
      description:
        'This photograph depicts the grave of Wiley Grizzle Jr. It was likely taken at the reburial service that occurred on June 5, 1949 at Roswell, New Mexico.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        
      ],
      related: [
        { slug: 'grizzle-wiley-grave-1', relation: 'Another view' }
      ]
    },
    {
      slug: 'grizzle-wiley-card',
      title: '[Wiley Grizzle, Jr. Lieutenant Air Corps card]',
      titleSource: 'supplied',
      format: 'document',
      place: 'New Mexico',
      controlNumber: 'h.1.15.2',
      date: {
        display: '[1944-1945]',
        earliest: 1944,
        latest: 1945,
        basis: ['This card is undated, but it is probable that it dates from 1944 or 1945.'],
        confidence: 'probable',
      },
      recto: {
        file: 'grizzle-wiley-card-recto.jpg',
      },
      verso: {
        file: 'grizzle-wiley-card-verso.jpg',
      },
      description:
        'This is a business card of Wiley Grizzle, Jr., Lieutenant Air Corps, Army of the United States.',
      inscriptions: [
        
      ],
      mentions: [ 
        { person: 'grizzle-wiley-jr', basis: 'mentioned in article', confidence: 'certain',},
      ],
      depicts: [         
      ],
    },
    {
      slug: 'grizzle-wiley-aafas-card',
      title: '[2nd Lt. Wiley Grizzle Army Air Forces Aid Society card]',
      titleSource: 'supplied',
      format: 'document',
      place: 'New Mexico',
      controlNumber: 'h.1.15.3',
      date: {
        display: '1944',
        earliest: 1944,
        latest: 1944,
        basis: ['This card is dated 1 May 1944.'],
        confidence: 'certain',
      },
      recto: {
        file: 'grizzle-wiley-aafas-card-recto.jpg',
      },
      verso: {
        file: 'grizzle-wiley-aafas-card-verso.jpg',
      },
      description:
        'This is a membership card for the Army Air Forces Aid Society that belonged to 2nd Lt. Wiley Grizzle. The card dates to May 1st, 1944. This card was in the personal effects of Wiley Grizzle, Jr.',
      inscriptions: [
        
      ],
      mentions: [ 
        { person: 'grizzle-wiley-jr', basis: 'mentioned in article', confidence: 'certain',},
      ],
      depicts: [         
      ],
    },
    {
      slug: 'grizzle-wiley-portrait-2',
      title: '[Portrait of Wiley Grizzle, Jr.]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'h.1.17.2',
      date: {
        display: '[1944-1945]',
        earliest: 1944,
        latest: 1945,
        basis: ['This photograph is undated. It is likely from Junior\'s time in England, but that cannot be corroborated.'],
        confidence: 'probable',
      },
      recto: {
        file: 'grizzle-wiley-portrait-2-recto.jpg',
      },
      
      description:
        'This portrait depicts Wiley Grizzle, Jr. in civilian clothing. The photograph is undated, but Junior is sporting a mustache that is similar to the one he wore in his OTU class photograph.',
      inscriptions: [
        
      ],
      mentions: [ 

      ],
      depicts: [
        {
          person: 'grizzle-wiley-jr',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 24, y: 15.4, w: 52.7, h: 65.4 },
        },
      ],
    },
    {
      slug: 'grizzle-ollie-blanche-obituary',
      title: 'Grizzle Rites Held Tuesday',
      titleSource: 'inscribed',
      format: 'document',
      place: 'New Mexico',
      controlNumber: 'h.1.18.1',
      date: {
        display: '1976',
        earliest: 1976,
        latest: 1976,
        basis: ['The newspaper is dated December 16, 1976'],
        confidence: 'certain',
      },
      recto: {
        file: 'grizzle-ollie-blanche-obituary-recto.jpg',
      },
      verso: {
        file: 'grizzle-ollie-blanche-obituary-verso.jpg',
      },
      description:
        'This is the obituary of Ollie Blanche Ingle Allison Grizzle. It appeared in the December 16, 1976 issue of the De Baca County News',
      inscriptions: [
        
      ],
      mentions: [ 
        { person: 'grizzle-ollie-blanche-ingle-allison', basis: 'mentioned in article', confidence: 'certain',},
      ],
      depicts: [         
      ],
    },
    {
      slug: 'grizzle-wiley-sammy-jim-allison',
      title: '[Wiley Grizzle, Sammy Allison, Jim Allison, and Eddie Black]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'h.1.19.2',
      date: {
        display: '[1970-1971]',
        earliest: 1970,
        latest: 1971,
        basis: ['This photograph is undated, but it appears to be from 1970 or 1971. Jim appears to be 13 or 14 years old here.'],
        confidence: 'probable',
      },
      recto: {
        file: 'grizzle-wiley-sammy-jim-allison-recto.jpg',
      },
      description:
        'This photograph depicts Wiley Grizzle, Sammy Allison, Jim Allison, and Eddie Black at an event at the home of Harold and Jean Allison.',
      inscriptions: [
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'grizzle-wiley',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 43.7, y: 44.9, w: 16.5, h: 21.2 },
        },
        {
          person: 'allison-sammy-nan-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 29.6, y: 22.7, w: 14.2, h: 19.3 },
        },
        {
          person: 'allison-james-wiley',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 63.2, y: 33.5, w: 12.2, h: 14.7 },
        },
      ],
    },
    {
      slug: 'grizzle-ollie-harold-allison-2',
      title: '[Harold Allison and his mother Ollie Grizzle]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'h.1.19.3',
      date: {
        display: '[1970-1971]',
        earliest: 1970,
        latest: 1971,
        basis: ['This photograph is undated, but it appears to be from 1970 or 1971. Other photos from this event suggest such a date.'],
        confidence: 'probable',
      },
      recto: {
        file: 'grizzle-ollie-harold-allison-2-recto.jpg',
      },
      description:
        'This photograph depicts Harold Allison standing next to his mother Ollie Grizzle. The photograph was taken at the home of Harold and Jean Allison. Both are holding cups.',
      inscriptions: [
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 28, y: 33.8, w: 22.4, h: 18 },
        },
        {
          person: 'grizzle-ollie-blanche-ingle-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 59.5, y: 36, w: 20.3, h: 19.3 },
        },
      ],
    },
    {
      slug: 'unknown-house',
      title: '[Unknown house, possibly the early home of the Allisons or Grizzles]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'h.1.20.2',
      date: {
        display: '[1970-1980]',
        earliest: 1970,
        latest: 1980,
        basis: ['This photograph is undated, but it appears to be of the same era as the photographs from Ollie Grizzle\'s funeral.'],
        confidence: 'probable',
      },
      recto: {
        file: 'unknown-house.jpg',
      },
      description:
        'This photograph depicts an unknown rural house. It is presumed that this may be one of the houses that the Allisons or Grizzles occupied in New Mexico, since this photograph was with items from the Grizzle/Allison family.',
      inscriptions: [
      ],
      mentions: [ 
      ],
      depicts: [
      ],
    },
    {
      slug: 'grizzle-ollie-garden',
      title: '[Ollie Grizzle standing next to flowers in a garden]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Fort Sumner, New Mexico',
      controlNumber: 'h.1.21.1',
      date: {
        display: '[1960-1970]',
        earliest: 1960,
        latest: 1970,
        basis: ['This photograph is undated, but it is likely from between 1960 and 1970 based on the age of Ollie here.'],
        confidence: 'probable',
      },
      recto: {
        file: 'grizzle-ollie-garden-recto.jpg',
      },
      description:
        'This photograph depicts Ollie Grizzle standing next to flowers in a garden. It is presumed that this photograph is from her home in Fort Sumner, New Mexico. Her obituary states that she was an avid gardener.',
      inscriptions: [
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'grizzle-ollie-blanche-ingle-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 41.3, y: 21.9, w: 18.6, h: 22.9 },
        },
      ],
    },
    {
      slug: 'allison-oscar-ollie-gerald',
      title: '[Oscar, Ollie, and Gerald Allison near a horse-driven buggy]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Texas',
      controlNumber: 'h.1.21.2',
      date: {
        display: '[1915-1917]',
        earliest: 1915,
        latest: 1917,
        basis: ['This photograph is undated, but a 1915 to 1917 date is probable based on the age of Gerald here.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-oscar-ollie-gerald.jpg',
      },
      description:
        'This photograph depicts Oscar, Ollie, and Gerald Allison near a horse-driven buggy. Oscar and Ollie are standing behind the buggy while a young Gerald sits in the driver\'s seat. The location of this photograph cannot be determined, but it is presumed that this may have been taken in Eastland County while they visited family there. The trees suggest that this was not in New Mexico.',
      inscriptions: [
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-oscar-simmon',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 19.3, y: 41.4, w: 4.2, h: 7 },
        },
        {
          person: 'grizzle-ollie-blanche-ingle-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 27.7, y: 45.5, w: 4.3, h: 6.1 },
        },
        {
          person: 'allison-gerald-parker',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 34.3, y: 46, w: 3.3, h: 5.4 },
        },
      ],
    },
    {
      slug: 'allison-grizzle-picnic-1',
      title: '[Allison - Grizzle picnic in New Mexico]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'h.1.21.3',
      date: {
        display: '[1952-1953]',
        earliest: 1952,
        latest: 1953,
        basis: ['This photograph is undated, but it appears that Fred is two or three years old here. That places the photograph in 1952 or 1953.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-grizzle-picnic-1.jpg',
      },
      description:
        'This photograph depicts a Allison-Grizzle family picnic. Several newspapers throughout the years mention that the Allisons from Texas would visit the Grizzles in New Mexico for such picnics.',
      inscriptions: [
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 15.3, y: 31.1, w: 7, h: 8.8 },
        },
        {
          person: 'allison-oscar-ingle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 24.9, y: 33.6, w: 6.8, h: 8.6 },
        },
        {
          person: 'grizzle-ollie-blanche-ingle-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 52.8, y: 33.1, w: 6.4, h: 7.6 },
        },
        {
          person: 'didlake-ollie-mae-grizzle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 42.8, y: 46.3, w: 5.2, h: 5.7 },
        },
        {
          person: 'allison-carolyn',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 76, y: 51.4, w: 5.2, h: 6.3 },
        },
        {
          person: 'allison-fred-harold',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 87.6, y: 52.6, w: 4.2, h: 5.1 },
        },
      ],
    },
    {
      slug: 'allison-gerald-harold-young',
      title: '[Gerald and Harold Allison, circa 1919-1920]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'h.1.22.1',
      date: {
        display: '[1919-1920]',
        earliest: 1919,
        latest: 1920,
        basis: ['Harold appears to be two or three years old here, which places this photograph in 1919 or 1920.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-gerald-harold-young.jpg',
      },
      description:
        'This photograph depicts Gerald and Harold Allison standing next to a tree or bush or some kind. Each of them is holding a hat.',
      inscriptions: [
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 49.3, y: 47.7, w: 10.7, h: 15.9 },
        },
        {
          person: 'allison-gerald-parker',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 33.4, y: 29.3, w: 10.3, h: 16.1 },
        },
      ],
    },
    {
      slug: 'allison-harold-oscar-young',
      title: '[Harold and Oscar Allison, circa 1921]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'h.1.22.2',
      date: {
        display: '[1921]',
        earliest: 1921,
        latest: 1921,
        basis: ['Another photograph from this set has a 1921 date on the verso.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-oscar-young.jpg',
      },
      description:
        'This photograph depicts Harold and Oscar Allison in beanie hats likely during cold weather.',
      inscriptions: [
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 33.9, y: 42.9, w: 11.5, h: 12.7 },
        },
        {
          person: 'allison-oscar-ingle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 57.4, y: 50.9, w: 9.5, h: 9.9 },
        },
      ],
    },
    {
      slug: 'allison-harold-oscar-fred-barn',
      title: '[Harold, Oscar, and Fred Allison at the barn]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'I.1.7.4',
      date: {
        display: '[1954]',
        earliest: 1954,
        latest: 1954,
        basis: ['The verso lists the date as 1954. Nothing objects to this.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-oscar-fred-barn-recto.jpg',
      },
      verso: {
        file: 'allison-harold-oscar-fred-barn-verso.jpg',
      },
      description:
        'This photograph depicts Harold, Oscar, and Fred Allison at the barn in Lamb County between Muleshoe and Earth. Harold is leaning against a vehicle.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'Oscar and Harold Allison\n on whose farm show was held. \n\nFred\'s picture\n\nHLA 1954.'
        }
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 56.9, y: 38.3, w: 11, h: 15 },
        },
        {
          person: 'allison-oscar-ingle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 17.6, y: 35.6, w: 11.5, h: 18.5 },
        },
        {
          person: 'allison-fred-harold',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 37.9, y: 72, w: 7.9, h: 11.6 },
        },
      ],
    },
    {
      slug: 'allison-carolyn-sam-dolls',
      title: '[Carolyn and Sam Allison with dolls near a car]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'I.1.8.1',
      date: {
        display: '[1951-1952]',
        earliest: 1951,
        latest: 1952,
        basis: ['The verso lists Carolyn\'s age as 3, so a 1951 or 1952 date is likely.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-carolyn-sam-dolls-recto.jpg',
      },
      verso: {
        file: 'allison-carolyn-sam-dolls-verso.jpg',
      },
      description:
        'This photograph depicts Carolyn and Sam Allison standing near a car both holding dolls.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'Carolyn Allison\nSam Allison\nAge 3'
        }
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-carolyn',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 29.5, y: 28.2, w: 17.5, h: 13.5 },
        },
        {
          person: 'allison-sam-oscar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 51.6, y: 34, w: 17.8, h: 12.5 },
        },
      ],
    },
    {
      slug: 'allison-jean-veta-carolyn-fred-jim-portrait',
      title: '[Jean Allison with her surviving children]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'I.1.18.1',
      date: {
        display: '[1996-1997]',
        earliest: 1996,
        latest: 1997,
        basis: ['This photograph was taken shortly before Jean moved into Muleshoe in 1998. A 1996 or 1997 date is probable.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-jean-veta-carolyn-fred-jim-portrait-recto.jpg',
      },
      verso: {
        file: 'allison-jean-veta-carolyn-fred-jim-portrait-recto.jpg',
      },
      description:
        'This photograph depicts Jean Allison with her children, Veta, Carolyn, Fred, and Jim. This photograph was taken at Jean\'s home between Muleshoe and Earth.',
      inscriptions: [
        
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-veta-jean-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 45.2, y: 36.9, w: 7.3, h: 13.2 },
        },
        {
          person: 'skogland-veta-sue-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 68, y: 38, w: 6.8, h: 11.9 },
        },
        {
          person: 'allison-carolyn',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 13.5, y: 23.3, w: 8.2, h: 13.8 },
        },
        {
          person: 'allison-fred-harold',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 34.3, y: 9.7, w: 7.8, h: 14.7 },
        },
        {
          person: 'allison-james-wiley',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 64.3, y: 12.7, w: 7.5, h: 13.6 },
        },
      ],
    },
    {
      slug: 'allison-harold-jean-san-antonio-bush',
      title: '[Harold and Jean Allison standing next to a bush in San Antonio, Texas]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'San Antonio, Texas',
      controlNumber: 'I.1.6.3',
      date: {
        display: '[1945]',
        earliest: 1945,
        latest: 1945,
        basis: ['This appears to be after the marriage of Jean and Harold and during their time in San Antonio. A stamp on the verso indicates a 1945 date.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-jean-san-antonio-bush-recto.jpg',
      },
      verso: {
        file: 'allison-harold-jean-san-antonio-bush-verso.jpg',
      },
      description:
        'This photograph depicts Harold and Jean Allison standing next to a bush in San Antonio, Texas.',
      inscriptions: [
        
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 49.7, y: 36, w: 8.9, h: 6.6 },
        },
        {
          person: 'allison-veta-jean-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 38.1, y: 39.4, w: 7.5, h: 6.3 },
        },
      ],
    },
    {
      slug: 'allison-jack-calf-barn',
      title: '[Jack Allison with a show calf at the barn on the farm]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'I.1.7.1',
      date: {
        display: '[1968-1969]',
        earliest: 1968,
        latest: 1969,
        basis: ['Jack appears to be 15 or 16 years old here, which corresponds to dates between 1968 and 1969.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-jack-calf-barn-recto.jpg',
      },
      verso: {
        file: 'allison-jack-calf-barn-verso.jpg',
      },
      description:
        'This photograph depicts Jack Allison standing next to the barn with his show calf.',
      inscriptions: [
        
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-jack-william',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 56.4, y: 33.7, w: 6.5, h: 11 },
        },
        
      ],
    },
    {
      slug: 'allison-gerald-oscar-sammy',
      title: '[Gerald, Oscar, and Sammy Allison at the home of Gerald Allison]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'I.1.9.1',
      date: {
        display: '[1959]',
        earliest: 1959,
        latest: 1959,
        basis: ['A stamp on the verso suggests a date in 1959. Nothing objects to that, but that date could be a print date and not the date of the photograph.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-gerald-oscar-sammy-recto.jpg',
      },
      verso: {
        file: 'allison-gerald-oscar-sammy-verso.jpg',
      },
      description:
        'This photograph depicts Gerald, Oscar, and Sammy Allison standing in the home of Gerald and Ethel Allison. A photograph of one of Gerald\'s children can be seen in the background. An inscription on the verso lists one of the men as Harold Allison, but it is Gerald.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'back\nOscar + Harold Allison'
        }
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-gerald-parker',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 63.9, y: 26.9, w: 9.8, h: 10.8 },
        },
        {
          person: 'allison-oscar-ingle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 49, y: 31.7, w: 8.8, h: 11.5 },
        },
        {
          person: 'allison-sammy-nan-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 38.8, y: 26.6, w: 9.3, h: 13.4 },
        },
      ],
    },
    {
      slug: 'allison-oscar-nan-at-table',
      title: '[Oscar and Nan Allison]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'I.1.9.2',
      date: {
        display: '[1956-1958]',
        earliest: 1956,
        latest: 1958,
        basis: ['This photograph is undated, but Nan appears to be 16 to 18 years old here. This places the photograph between 1956 and 1958.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-oscar-nan-at-table-recto.jpg',
      },
      verso: {
        file: 'allison-oscar-nan-at-table-verso.jpg',
      },
      description:
        'This photograph depicts Oscar and Nan Allison sitting at a table. Nan is hugging Oscar around the neck.',
      inscriptions: [
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-oscar-ingle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 35.6, y: 15.7, w: 10.7, h: 13.9 },
        },
        {
          person: 'johnson-nan-allison',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 42.5, y: 12.9, w: 10.6, h: 12.1 },
        },
      ],
    },
    {
      slug: 'allison-carolyn-ironing',
      title: '[Carolyn Allison ironing clothes]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'I.1.10.1',
      date: {
        display: '[1959]',
        earliest: 1959,
        latest: 1959,
        basis: ['A print date of 1959 is in the left margin of this photograph. Nothing objects to this, but it could be a print date and not the date the photograph was taken.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-carolyn-ironing-recto.jpg',
      },
      verso: {
        file: 'allison-carolyn-ironing-verso.jpg',
      },
      description:
        'This photograph depicts Carolyn Allison ironing clothes.',
      inscriptions: [
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-carolyn',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 26, y: 26.3, w: 11.7, h: 10.8 },
        },
      ],
    },
    {
      slug: 'allison-carolyn-sewing',
      title: '[Carolyn Allison sewing clothes]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'I.1.10.2',
      date: {
        display: '[1959]',
        earliest: 1959,
        latest: 1959,
        basis: ['A print date of 1959 is in the bottom margin of this photograph. Nothing objects to this, but it could be a print date and not the date the photograph was taken.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-carolyn-sewing-recto.jpg',
      },
      verso: {
        file: 'allison-carolyn-sewing-verso.jpg',
      },
      description:
        'This photograph depicts Carolyn Allison sewing clothes on a sewing machine. An unknown woman can be partially seen on the right side of the photograph.',
      inscriptions: [
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-carolyn',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 30.7, y: 16.5, w: 10, h: 17.5 },
        },
      ],
    },
    {
      slug: 'allison-carolyn-bedroom-doll',
      title: '[Carolyn Allison on her bed with a doll]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'I.1.14.1',
      date: {
        display: '[1958-1959]',
        earliest: 1958,
        latest: 1959,
        basis: ['There is no date on this photograph, but Carolyn appears to be 10 or 11 in this image, which places it between 1958 and 1959.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-carolyn-bedroom-doll-recto.jpg',
      },
      verso: {
        file: 'allison-carolyn-bedroom-doll-verso.jpg',
      },
      description:
        'This photograph depicts Carolyn Allison sitting on her bed playing with a doll. An ornate lamp sits in the background.',
      inscriptions: [
      ],
      mentions: [ 
      ],
      related: [
        { 
          slug: 'allison-carolyn-brushing-hair',
          relation: 'taken at the same time'
        }
      ],
      depicts: [
        {
          person: 'allison-carolyn',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 65.3, y: 49.9, w: 9.8, h: 8.7 },
        },
      ],
    },
    {
      slug: 'allison-carolyn-brushing-hair',
      title: '[Carolyn Allison brushing her hair in the mirror]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'I.1.14.2',
      date: {
        display: '[1958-1959]',
        earliest: 1958,
        latest: 1959,
        basis: ['There is no date on this photograph, but Carolyn appears to be 10 or 11 in this image, which places it between 1958 and 1959.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-carolyn-brushing-hair-recto.jpg',
      },
      verso: {
        file: 'allison-carolyn-brushing-hair-verso.jpg',
      },
      description:
        'This photograph depicts Carolyn Allison brushing her hair in the mirror. An ornate lamp sits on the desk next to her, and several dolls sit atop the desk.',
      inscriptions: [
      ],
      mentions: [ 
      ],
      related: [
        { 
          slug: 'allison-carolyn-bedroom-doll',
          relation: 'taken at the same time'
        }
      ],
      depicts: [
        {
          person: 'allison-carolyn',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 35.4, y: 50.7, w: 5.5, h: 10.1 },
        },
      ],
    },
    {
      slug: 'allison-harold-leather-jacket',
      title: '[Harold Allison wearing a leather jacket]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'I.1.10.3',
      date: {
        display: '[1975-1980]',
        earliest: 1975,
        latest: 1980,
        basis: ['There is no date on this photograph, but this looks to be from between the years of 1975 and 1980.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-leather-jacket-recto.jpg',
      },
      verso: {
        file: 'allison-harold-leather-jacket-verso.jpg',
      },
      description:
        'This photograph depicts Harold Allison wearing a leather jacket while standing in the entry way of his home in Pleasant Valley, Texas.',
      inscriptions: [
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 39.5, y: 14.3, w: 21.2, h: 20.6 },
        },
      ],
    },
    {
      slug: 'allison-harold-oscar-gerald-georga',
      title: '[Oscar, Gerald, Georga Didlake, and Harold Allison]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Lamb County, Texas',
      controlNumber: 'I.1.10.4',
      date: {
        display: '[1970-1971]',
        earliest: 1970,
        latest: 1971,
        basis: ['There is no date on this photograph, but this looks to be from between the years of 1970 and 1971.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-oscar-gerald-georga-recto.jpg',
      },
      verso: {
        file: 'allison-harold-oscar-gerald-georga-verso.jpg',
      },
      description:
        'This photograph depicts Oscar, Gerald, and Harold Allison standing with their niece Georga Didlake. The child on the bottom left is Greg Pool, Nan\'s son.',
      inscriptions: [
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-gerald-parker',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 43.3, y: 39.4, w: 8.6, h: 10.1 },
        },
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 69.9, y: 38.9, w: 9.1, h: 11.7 },
        },
        {
          person: 'allison-oscar-ingle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 22.1, y: 41.8, w: 9.8, h: 11.3 },
        },
        {
          person: 'collins-georga-didlake',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 56.5, y: 38.4, w: 9.1, h: 12 },
        },
        {
          person: 'pool-gregory-brent',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 11.2, y: 69, w: 9.5, h: 12.6 },
        },
      ],
    },
    {
      slug: 'allison-jean-harold-portrait-wedding',
      title: '[Harold and Jean Allison wedding portrait]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'I.1.12.2',
      date: {
        display: '[1944]',
        earliest: 1944,
        latest: 1944,
        basis: ['There is no date on this photograph, but it appears to be from near their wedding date.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-jean-harold-portrait-wedding-recto.jpg',
      },
      verso: {
        file: 'allison-jean-harold-portrait-wedding-verso.jpg',
      },
      description:
        'This photograph depicts Harold and Jean Allison either shortly before their wedding or shortly after. Harold is in his military uniform.',
      inscriptions: [
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 47.6, y: 19.7, w: 38.6, h: 28.5 },
        },
        {
          person: 'allison-veta-jean-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 8.3, y: 26.2, w: 31.7, h: 30.8 },
        },
      ],
    },
    {
      slug: 'allison-sammy-jean-2007',
      title: '[Sammy and Jean Allison at Sammy\'s going away party in 2007]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Muleshoe, Texas',
      controlNumber: 'I.1.13.2',
      date: {
        display: '[2007]',
        earliest: 2007,
        latest: 2007,
        basis: ['Sammy moved from Muleshoe to Amarillo in 2007.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-sammy-jean-2007-recto.jpg',
      },
      verso: {
        file: 'allison-sammy-jean-2007-verso.jpg',
      },
      description:
        'This photograph depicts Sammy and Jean Allison in 2007 at the going away party thrown for Sammy.',
      inscriptions: [
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-veta-jean-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 47.4, y: 22.8, w: 9.2, h: 17.4 },
        },
        {
          person: 'allison-sammy-nan-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 57.8, y: 22, w: 8.7, h: 16.4 },
        },
      ],
    },
    {
      slug: 'allison-harold-cherry-coupe',
      title: '[Harold Allison standing in the door of a car]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'New Mexico',
      controlNumber: 'I.1.18.3',
      date: {
        display: '[1944]',
        earliest: 1944,
        latest: 1944,
        basis: ['A date of 1944 is on the verso. Nothing objects to this.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-cherry-coupe-recto.jpg',
      },
      verso: {
        file: 'allison-harold-cherry-coupe-verso.jpg',
      },
      description:
        'This photograph depicts Harold Allison standing in the door of his "cherry coupe" car.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: '1944\nLt. Harold L. Allison\nwith cherry coupe'
        }
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 36, y: 30.2, w: 19.8, h: 17.7 },
        },
      ],
    },
    {
      slug: 'allison-harold-jean-pilot-bob',
      title: '[Harold and Jean Allison sitting next to the pilot of Harold\'s crew and his wife]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'San Antonio, Texas',
      controlNumber: 'I.1.18.4',
      date: {
        display: '[1945]',
        earliest: 1945,
        latest: 1945,
        basis: ['A date of 1945 is on the verso. Nothing objects to this.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-jean-pilot-bob-recto.jpg',
      },
      verso: {
        file: 'allison-harold-jean-pilot-bob-verso.jpg',
      },
      description:
        'This photograph depicts Harold and Jean Allison sitting next to the pilot of Harold\'s crew, Bob, and his wife.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'Lt. Harold (co-pilot) + Jean Allison with\nBob + wife (pilot)'
        }
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 34.3, y: 35.2, w: 5.7, h: 10.4 },
        },
        {
          person: 'allison-veta-jean-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 43.4, y: 36.5, w: 5.6, h: 10.6 },
        },
      ],
    },
    {
      slug: 'allison-harold-officers-club',
      title: '[Harold Allison sitting on a bench]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'San Antonio, Texas',
      controlNumber: 'I.1.19.1',
      date: {
        display: '[1945]',
        earliest: 1945,
        latest: 1945,
        basis: ['A date of 1945 is on the verso. Nothing objects to this.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-officers-club-recto.jpg',
      },
      verso: {
        file: 'allison-harold-officers-club-verso.jpg',
      },
      description:
        'This photograph depicts Harold Allison sitting on a bench in front of the Officer\'s Club in San Antonio.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'We didn\'t know\nthe little boy.\nTaken in front of\nOfficer\'s Club.\n Lt. Harold Allison\n1945'
        }
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 30.1, y: 43.3, w: 10.7, h: 7.9 },
        },
      ],
    },
    {
      slug: 'grizzle-ollie-mae-mildred-mckinstry-visiting',
      title: '[Ollie Mae Grizzle and Mildred McKinstry visiting Harold and Jean Allison in San Antonio]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'San Antonio, Texas',
      controlNumber: 'I.1.19.2',
      date: {
        display: '[1945]',
        earliest: 1945,
        latest: 1945,
        basis: ['A date of 1945 is on the verso. Nothing objects to this.'],
        confidence: 'probable',
      },
      recto: {
        file: 'grizzle-ollie-mae-mildred-mckinstry-visiting-recto.jpg',
      },
      verso: {
        file: 'grizzle-ollie-mae-mildred-mckinstry-visiting-verso.jpg',
      },
      description:
        'This photograph depicts Ollie Mae Grizzle and Mildred McKinstry sitting in the grass while on a visit to San Antonio to see Harold and Jean Allison.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'San Antonio, 1945\nSan Antonio\nOllie Mae Grizzle\n+\nMildred McKinstry\nwhile visiting\nJean + Harold.'
        }
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'osborn-mildred-adeline-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 50.8, y: 51.4, w: 8, h: 7.9 },
        },
        {
          person: 'didlake-ollie-mae-grizzle',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 36.8, y: 49.8, w: 8.4, h: 9.6 },
        },
      ],
    },
    {
      slug: 'pilot-harold-crew-wife-son',
      title: '[Bob + wife + son, pilot on Harold\'s first crew]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'San Antonio, Texas',
      controlNumber: 'I.1.19.3',
      date: {
        display: '[1945]',
        earliest: 1945,
        latest: 1945,
        basis: ['A date of 1945 is on the verso. Nothing objects to this.'],
        confidence: 'probable',
      },
      recto: {
        file: 'pilot-harold-crew-wife-son-recto.jpg',
      },
      verso: {
        file: 'pilot-harold-crew-wife-son-verso.jpg',
      },
      description:
        'This photograph depicts the pilot on Harold\'s first crew. His name was Bob. He is seen here with his wife and son.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'Bob + wife + son.\nPilot on Harold\'s\nfirst crew.'
        }
      ],
      mentions: [ 
      ],
      depicts: [
        
      ],
    },
    {
      slug: 'allison-harold-jean-after-marriage',
      title: '[Harold and Jean Allison soon after marriage, 1944]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'San Antonio, Texas',
      controlNumber: 'I.1.19.4',
      date: {
        display: '[1944]',
        earliest: 1944,
        latest: 1944,
        basis: ['A date of 1944 is on the verso. Nothing objects to this.'],
        confidence: 'probable',
      },
      recto: {
        file: 'allison-harold-jean-after-marriage-recto.jpg',
      },
      verso: {
        file: 'allison-harold-jean-after-marriage-verso.jpg',
      },
      description:
        'This photograph depicts Harold and Jean Allison soon after their marriage in 1944. This photograph may have been taken the day after their wedding as they left New Mexico.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: '1944\nLt. Harold + Jean Allison\nsoon after marriage'
        }
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 41.7, y: 23.9, w: 4.9, h: 8.7 },
        },
        {
          person: 'allison-veta-jean-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 37.8, y: 26.3, w: 4.5, h: 8.1 },
        },
      ],
    },
    {
      slug: 'allison-harold-jean-johniii-graduation',
      title: '[Harold and Jean Allison in San Antonio for John III graduation]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'San Antonio, Texas',
      controlNumber: 'I.1.20.1',
      date: {
        display: '[1989]',
        earliest: 1989,
        latest: 1989,
        basis: ['A date of 1989 is on the verso. Nothing objects to this.'],
        confidence: 'certain',
      },
      recto: {
        file: 'allison-harold-jean-johniii-graduation-recto.jpg',
      },
      verso: {
        file: 'allison-harold-jean-johniii-graduation-verso.jpg',
      },
      description:
        'This photograph depicts Harold and Jean Allison sitting in the back of a car in San Antonio while visiting to see John III\'s graduation.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'Harold + Jean\nIn S.A. for John III graduation ceremonies\nA.M., Saturday, June 3, 1989.'
        }
      ],
      mentions: [ 
      ],
      depicts: [
        {
          person: 'allison-harold-lamar',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 24.4, y: 22.8, w: 21.7, h: 42 },
        },
        {
          person: 'allison-veta-jean-mckinstry',
          confidence: 'certain',
          basis:
            'Known identity',
          region: { face: 'recto', x: 53.5, y: 14.7, w: 22.2, h: 45.8 },
        },
      ],
    },
  ]
}