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
  slug: 'ingle-family',
  title: 'Ingle Family Photographs',
  custody: 'Various origins.',
  scope:
    'Photographs of the Ingle family. This is a smaller collection, because I do not have many photos of this side of the family. Some of these photographs have been obtained by relatives on the Ingle side.',
  lines: ['Allison', 'Ingle', 'Coleman'],
  places: ['Texas', 'New Mexico'],
  defaults: {
    rights: { status: 'public-domain' },
  },
  series: [

  ],

  items: [
    /* ---------------------------------------------------------------- */
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