import React from 'react';

export default class Editor extends React.Component {
  static propTypes = {
    productType: React.PropTypes.string
  };

  static data = {
    type: 'BRA',
    parts: [
      {
        name: 'CUP',
        description: 'cup',
        id: '',
        options: [
          {
            id: '1',
            name: 'pink',
            price: '3'
          },
          {
            id: '21',
            name: 'red',
            price: '5'
          },
          {
            id: '3',
            name: 'black',
            price: '4'
          }
        ],
        image: '',
        meta: {}
      }
    ],
    SKU: '',
    size: ''
  };

  render = () => {
    return (
      <div>
        TEST1234
      </div>
    );
  }
}
