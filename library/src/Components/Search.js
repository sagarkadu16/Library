import React, { Component } from 'react'
import Axios from 'axios'
import './search.module.css'

export default class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            placeholder:'select option',
            query:'',
            bookdata:[],
            helpText:''
        }
    }

    handleChange = e =>{
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleSearchAction = e =>{
        this.setState({
            placeholder : e.target.value
        })
    }

    handleBookDelete = id =>{
        Axios.delete(`http://127.0.0.1:5000/book/${id}`)
        .then(res =>
                this.setState({
                    bookdata:res.data.totalDetails
                })
            )
    }

    findBooks = () =>{
        if(this.state.query){
            let value = this.state.placeholder
            switch(value){
                case 'author':
                        Axios.get(`http://127.0.0.1:5000/search/author/${this.state.query}`)
                        .then(res => 
                                this.setState({
                                    bookdata:res.data.result
                                })
                            )
                        break
                case 'publication':
                        Axios.get(`http://127.0.0.1:5000/search/publisher/${this.state.query}`,{
                            publisher:this.state.query
                        })
                        .then(res =>
                                this.setState({
                                    bookdata:res.data.result
                                })
                            )
                        break
                case 'category':
                        Axios.get(`http://127.0.0.1:5000/search/category/${this.state.query}`,{
                            category:this.state.query
                        })
                        .then(res => 
                                this.setState({
                                    bookdata:res.data.result
                                })
                            )
                        break
                case 'book':
                        Axios.get(`http://127.0.0.1:5000/search/book/${this.state.query}`,{
                            category:this.state.query
                        })
                        .then(res => 
                                this.setState({
                                    bookdata:res.data.result
                                })
                            )
                        break
                default:
                        console.log('Invalid Case')
            }
        }else{
            this.setState({
                helpText:'Please Select Option and Value'
            })
        }
    }


    componentDidMount(){
        Axios.get('http://127.0.0.1:5000/book')
        .then(res =>
                this.setState({
                    bookdata:res.data.totalDetails
                })
            )
    }

    render() {
        // console.log(this.state.query)
        // console.log(this.state.placeholder)
        return (
            <div>
                    <div className="input-group mx-auto" style={{width:'max-content'}}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Search By:</span>
                                <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.state.placeholder}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <option className="dropdown-item" onClick={(e) => this.handleSearchAction(e)} value='book'>Book</option>
                                    <option className="dropdown-item" onClick={(e) => this.handleSearchAction(e)} value='author'>Author</option>
                                    <option className="dropdown-item" onClick={(e) => this.handleSearchAction(e)} value='publication'>Publication</option>
                                    <option className="dropdown-item" onClick={(e) => this.handleSearchAction(e)} value='category'>Category</option>
                                </div>
                            </div>
                            <input type="text" className="form-control" placeholder={this.state.placeholder} value={this.state.query} onChange={this.handleChange} aria-label="content" id='query' aria-describedby="basic-addon1"></input>
                            <button className='mx-1 btn btn-outline-danger' onClick={() => this.findBooks()}>Enter</button>
                        </div>
                    </div>
                    <div className='text-center mt-3'>{this.state.helpText}</div>
                    
                    {this.state.bookdata.length ? 
                        <table className={`my-5 mx-auto`} >
                            <thead>
                                <tr>
                                    <th className='px-2 py-3'>BookId</th>
                                    <th className='px-5 py-3'>BookName</th>
                                    <th className='px-5 py-3'>Publisher</th>
                                    <th className='px-5 py-3'>Author</th>
                                    <th className='px-5 py-3'>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.bookdata.map(book =>
                                    <tr key={book.id} className='text-wrap boxeffect'>
                                
                                        <td className='px-1 py-3 text-center'>{book.id}</td>
                                        <td className='px-3 py-3'>{book.bookname}</td>
                                        <td className='px-3 py-3'>{book.publisher}</td>
                                        <td className='px-3 py-3 text-wrap'>{book.authors}</td>
                                        <td className='px-3 py-3'>{book.category}
                                        <img src='iconfinder_basket_1814090.png' style={{width:'30px'}} onClick={() => this.handleBookDelete(book.id)} alt='delete'></img>
                                        </td>
                                    </tr>)
                                }
                            </tbody>    
                        </table>
                        :<div className='my-5'><h3 className='text-center'>No Records Available For Entered Input</h3></div>
                    }
            </div>
        )
    }
}
