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
    'Photographs of the Allison family. Photographs date to Redmon and Betty Allison, but the bulk revolves around Harold and Jean Allison.',
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
        'This photograph depicts the family of Redmon and Betty Allison around the year 1917. A taped on note on the verso lists each person. This photograph is framed and in the possession of Austin Allison.',
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
      slug: 'ingle-ollie-gladys',
      title: '[Portrait of Ollie and Gladys Ingle]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Texas',
      date: {
        display: '[1896]',
        basis: ['Gladys Ingle, the younger child, appears to be around one year of age here. This would place the photograph in 1896 based on her 1895 birth date.'],
        confidence: 'probable',
      },
      recto: {
        file: 'ingle-ollie-gladys-recto.jpg',
      },
      verso: {
        file: 'ingle-ollie-gladys-verso.jpg',
      },
      description:
        'This photograph depicts Ollie and Gladys Ingle in about the year 1896. The location of where this photograph was taken is unknown.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'Ollie Blanche Ingle - standing \n Born Nov. 4, 1892, Weatherford, TX \n Died Dec. 1976, Fort Sumner, N. Mex. \n Buried Dec. 14, South Park Cemetery \n Roswell, N.Mex \n\n Gladys Ingle \n Born Dec. 28, 1895 \n Died 1982 \n\n Daughters of James L. Ingle \n and Minnie Joan Coleman Ingle.',
        },
      ],
      depicts: [
        {
          person: 'grizzle-ollie-blanche-ingle-allison',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 58.8, y: 20.7, w: 21.5, h: 19 },
          },
          {
          as: 'Gladys Ingle',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 8.4, y: 32.7, w: 19.2, h: 15.5 },
          },
      ],
    },
    {
      slug: 'ingle-minnie-ollie-portrait',
      title: '[Portrait of Minnie and Ollie Ingle]',
      titleSource: 'supplied',
      format: 'snapshot',
      place: 'Texas',
      date: {
        display: '[1893]',
        basis: ['Ollie Ingle appears to be one year of age in this photograph, which places it in 1893.'],
        confidence: 'probable',
      },
      recto: {
        file: 'ingle-minnie-ollie-portrait-recto.jpg',
      },
      verso: {
        file: 'ingle-minnie-ollie-portrait-verso.jpg',
      },
      description:
        'This photograph depicts Minnie Joan Coleman Ingle and her daughter Ollie Blanche Ingle.',
      inscriptions: [
        {
          location: 'verso',
          medium: 'ink',
          text: 'Minnie Joan Coleman Ingle \n (Mrs. James L. Ingle) \n and daughter Ollie Blanche Ingle \n Born Nov. 4, 1892 \n Weatherford, TX.',
        },
      ],
      depicts: [
        {
          person: 'ingle-minnie-joan-coleman',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 37.6, y: 15.1, w: 17.3, h: 14.9 },
          },
          {
          person: 'grizzle-ollie-blanche-ingle-allison',
          confidence: 'certain',
          basis:
            'Identified on verso',
          region: { face: 'recto', x: 55.1, y: 24.2, w: 12.7, h: 10.1 },
          },
      ],
    },
  ]
}