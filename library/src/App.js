import React, { Component } from 'react'
import Search from './Components/Search'
import AddBook from './Components/AddBook'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isbookAddClicked : false
    }
  }
  render() {
    return (
      <div className='container border'>
        <div className='text-center mt-5 mb-3'>
          <h1 className='mx-auto'>Library</h1>
          <button className='mx-auto btn btn-outline-primary' onClick={() => this.setState({isbookAddClicked: !this.state.isbookAddClicked})}>{this.state.isbookAddClicked ? 'Search Book':'Add a book'}</button>
        </div>
        {this.state.isbookAddClicked ?
          <AddBook />
          :<Search />
        }
      </div>
    )
  }
}
