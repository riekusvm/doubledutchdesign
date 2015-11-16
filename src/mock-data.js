const strapOptions = [
  {
    id: '01',
    name: 'short',
    price: 3
  },
  {
    id: '02',
    name: 'medium',
    price: 5
  },
  {
    id: '03',
    name: 'large',
    price: 6
  }
];

export default [
  {
    type: 'BRA',
    parts: [
      {
        name: 'CUP',
        description: 'black cup',
        id: '01',
        image: 'cup/zwarte cup.png',
        price: 5,
        meta: {}
      },
      {
        name: 'CUP',
        description: 'pink cup',
        id: '02',
        image: 'cup/roze cup.png',
        price: 6,
        meta: {}
      },
      {
        name: 'CUP',
        description: 'no cup',
        id: 'XX',
        image: 'empty.png',
        price: 0,
        meta: {}
      },
      {
        name: 'PRINT',
        description: 'flowers print',
        id: '05',
        image: 'print/cup-met-print.png',
        price: 7,
        meta: {}
      },
      {
        name: 'PRINT',
        description: 'flowers print (inverted)',
        id: '06',
        image: 'print/cup-met-print-2.png',
        price: 7,
        meta: {}
      },
      {
        name: 'PRINT',
        description: 'no print',
        id: 'XX',
        image: 'empty.png',
        price: 0,
        meta: {}
      },
      {
        name: 'DECORATION',
        description: 'mint green bows',
        id: '08',
        image: 'bows/Mintgreen bows.png',
        price: 2,
        meta: {}
      },
      {
        name: 'DECORATION',
        description: 'soft pink bows',
        id: '09',
        image: 'bows/Soft pink bows.png',
        price: 3,
        meta: {}
      },
      {
        name: 'DECORATION',
        description: 'no decoration',
        id: 'XX',
        image: 'empty.png',
        price: 0,
        meta: {}
      },
      {
        name: 'POUCH',
        description: 'pouch',
        id: '0B',
        image: 'empty.png',
        price: 5,
        meta: {}
      },
      {
        name: 'POUCH',
        description: 'no pouch',
        id: 'XX',
        image: 'empty.png',
        price: 0,
        meta: {}
      },
      {
        name: 'STRAP',
        description: 'mint green straps',
        id: '0D',
        image: 'straps/mintgroene bandjes logo.png',
        options: strapOptions,
        meta: {},
        // temporary, until we calculate price from options
        price: 2
      },
      {
        name: 'STRAP',
        description: 'white straps',
        id: '0E',
        image: 'straps/witte bandjes.png',
        options: strapOptions,
        meta: {},
        // temporary, until we calculate price from options
        price: 2
      },
      {
        name: 'STRAP',
        description: 'soft pink straps',
        id: '0F',
        image: 'straps/zachtroze bandjes logo.png',
        options: strapOptions,
        meta: {},
        // temporary, until we calculate price from options
        price: 2
      },
      {
        name: 'STRAP',
        description: 'black straps',
        id: '10',
        image: 'straps/zwarte bandjes logo.png',
        options: strapOptions,
        meta: {},
        // temporary, until we calculate price from options
        price: 2
      },
      {
        name: 'STRAP',
        description: 'no straps',
        id: 'XX',
        image: 'empty.png',
        meta: {},
        // temporary, until we calculate price from options
        price: 0
      }
    ],
    SKU: '',
    size: ''},
  {
    type: 'PANTY'
    /*
MODEL
PRINT
     */
  },
  {
    type: 'BOXER'
    /*
    PRINT
    MODEL
     */
  }
];
