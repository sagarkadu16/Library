import React, { Component } from 'react'
import style from './addbook.module.css'
import axios from 'axios'


export default class AddBook extends Component {
    constructor(props){
        super(props)
        this.state ={
            bookname:'',
            publisher:'',
            author:'',
            category:'',
            finalBookname:'',
            finalPublisher:'',
            finalAuthor:[],
            finalCategory:[],
            helpText:'',
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    handleAddBook = () =>{
        this.setState({
            finalBookname:this.state.bookname
        })
    }

    handleAddPublisher = () =>{
        this.setState({
            finalPublisher:this.state.publisher
        })
    }

    handleAddAuthor = () =>{
        this.setState({
            finalAuthor:[...this.state.finalAuthor,this.state.author]
        })
    }

    handleAddCategory = () =>{
        this.setState({
            finalCategory:[...this.state.finalCategory,this.state.category]
        })
    }

    removeSpecificName = name =>{
        this.setState({
            finalAuthor:this.state.finalAuthor.filter(a => a !== name)
        })
    }

    removeSpecificCategory = cat =>{
        this.setState({
            finalCategory:this.state.finalCategory.filter(c => c !== cat)
        })
    }

    //============================================
    //function to check whether all data is filled properly then proceed else return 
    checkdata = () =>{
        console.log('coming in checkdata')
        if(!this.state.finalBookname){
            this.setState({
                helpText:'Please add valid book',
            })
            return false
        }else if(!this.state.finalPublisher){
            this.setState({
                helpText:'Please add valid publisher',
            })
            return false
        }else if(this.state.finalAuthor.length === 0){
            this.setState({
                helpText:'Please add atleast one author',
            })
            return false
        }else if(this.state.finalCategory.length === 0){
            this.setState({
                helpText:'Please add atleast one category',
            })
            return false
        }else{
            return true
        }
    }


    //========= api-calls ==========================================
    handleSubmit = () =>{
        //add book firstly
        console.log('handleSubmit clicked')
        if (this.checkdata()){
            axios.post('http://127.0.0.1:5000/book',{
            bookname:this.state.finalBookname
        })
        .then(res => 
            res.data.status ? (
                    axios.put('http://127.0.0.1:5000/publisher',{
                    publisher:this.state.finalPublisher,
                    bookid: res.data.bookid
                })
                .then(res => axios.post('http://127.0.0.1:5000/author',{
                    bookid:res.data.bookid,
                    author:this.state.finalAuthor
                }))
                .then(res => axios.post('http://127.0.0.1:5000/categories',{
                    bookid:res.data.bookid,
                    category:this.state.finalCategory,
                }))
                .then(res =>
                    this.setState({
                        helpText:res.data.message,
                        bookname:'',
                        author:'',
                        publisher:'',
                        category:''
                    }))
            ):(
                this.setState({helpText:'Book Already Present in Library'})
            ))
        }
    }


    render() {
        return (
            <div>
                <div className='w-75 mx-auto p-2'>
                    <h3>Add New Book:</h3>
                    <div className='row my-1'>
                        <div className="col-md-3 col-12">
                            <label htmlFor="bookname">Book Name</label>
                        </div>
                        <div className='col-md-6 col-12'>
                            <input style={{width:'400px'}} type="text" value={this.state.bookname} onChange={this.handleChange} className="form-control" id="bookname" aria-describedby="emailHelp" />
                        </div>
                        <div className='col-md-3 col-12'>
                            <button className='mx-1 btn btn-outline-danger' onClick={() => this.handleAddBook()}>Add</button>
                        </div>
                    </div>
                    <div className='row my-1'>
                        <div className="col-md-3 col-12">
                            <label htmlFor="publisher">Book Publisher</label>
                        </div>
                        <div className='col-md-6 col-12'>
                            <input style={{width:'400px'}} value={this.state.publisher} type="text" onChange={this.handleChange} className="form-control" id="publisher" aria-describedby="emailHelp" />
                        </div>
                        <div className='col-md-3 col-12'>
                            <button className='mx-1 btn btn-outline-danger' onClick={() => this.handleAddPublisher()}>Add</button>
                        </div>      
                    </div> 
                    <div className='my-4 bg-light border p-2 w-75'>
                        <small >You can add multiple authors and categories</small>   
                    </div>
                    <div className='row my-1'>
                        <div className="col-md-3 col-12">
                            <label htmlFor="author">Book Author</label>
                        </div>
                        <div className='col-md-6 col-12'>
                            <input style={{width:'400px'}} value={this.state.author} type="text" onChange={this.handleChange} className="form-control" id="author" aria-describedby="emailHelp" />
                        </div>
                        <div className='col-md-3 col-12'>
                            <button className='mx-1 btn btn-outline-danger' onClick={() => this.handleAddAuthor()}>Add</button>
                        </div> 
                    </div>
                    <div className='row my-1'>
                        <div className="col-md-3 col-12">
                            <label htmlFor="category">Book Category</label>
                        </div>
                        <div className='col-md-6 col-12'>
                            <input style={{width:'400px'}} value={this.state.category} type="text" onChange={this.handleChange} className="form-control" id="category" aria-describedby="emailHelp" />
                        </div>
                        <div className='col-md-3 col-12'>
                            <button className='mx-1 btn btn-outline-danger' onClick={() => this.handleAddCategory()}>Add</button>
                        </div>  
                    </div>             
                    <div className='mt-3 text-center'>
                         <button type="submit" className="btn btn-outline-primary" onClick={() => this.handleSubmit()}>Confirm To Add Book</button>
                        <div className='mt-2'>{this.state.helpText}</div>
                    </div>
                </div>
                <div className='my-5 border'> 
                <div className='p-2 text-center w-100 bg-light'>
                    click to remove item
                </div>
                <table className={`${style.tableborder} mx-auto`} >
                    <thead>
                        <tr>
                            <th className='px-5 py-3'>BookName</th>
                            <th className='px-5 py-3'>Publisher</th>
                            <th className='px-5 py-3'>Author</th>
                            <th className='px-5 py-3'>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-wrap'>
                            <td className='px-3 py-3'>{this.state.finalBookname}</td>
                            <td className='px-3 py-3'>{this.state.finalPublisher}</td>
                            <td className='px-3 py-3 text-wrap'>
                                {this.state.finalAuthor.map((name) => 
                                    <span key={name} className={style.cursor} onClick={() => this.removeSpecificName(name)}>{name},</span>
                                    )}
                            </td>
                            <td className='px-3 py-3'>
                                {this.state.finalCategory.map((cat) => 
                                        <span key={cat} className={style.cursor} onClick={() => this.removeSpecificCategory(cat)}>{cat},</span>
                                        )}
                            </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
