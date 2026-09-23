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
  ]
}