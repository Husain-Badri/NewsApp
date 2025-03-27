import React, { Component } from 'react'
import './../loader.css';

export class Spinner extends Component {
  render() {
    return (
      <div className="row">
        <div className='col-md-12'>
          <div class="loader"></div>
        </div>
      </div>
    )
  }
}

export default Spinner
