import React, { Component } from 'react';

export default class SearchAutoComplete extends Component {
  render() {
    return (
      <div id='myInputautocomplete-list' className='autocomplete-items'>
        <div>
          <strong>A</strong>fghanistan
          <input type='hidden' value='Afghanistan' />
        </div>
        <div>
          <strong>A</strong>lbania
          <input type='hidden' value='Albania' />
        </div>
      </div>
    );
  }
}
