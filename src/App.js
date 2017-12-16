import React from 'react'
import './App.css'
import BookShelf from './BookShelf';
class BooksApp extends React.Component {
  constructor() {
    super();
    this.searchBooks = this.searchBooks.bind(this);
  }
  state = {
    booksLists: [],
    value:"none",
    bookShelfList : {
      "Currently Reading":[
        {
          "Title":"To Kill a Mockingbird",
          "Image":"http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
          "Authors":"Harper Lee"
        },
        {
          "Title":"Ender's Game",
          "Image":"http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
          "Authors":"Orson Scott Card"
        }
      ],
      "Want to Read":[
        {
          "Title":"1776",
          "Image":"http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
          "Authors":"David McCullough"
        },
        {
          "Title":"Harry Potter and the Sorcerer's Stone",
          "Image":"http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
          "Authors":"J.K. Rowling"
        }
      ],
      "Read":[
      {
        "Title":"The Hobbit",
        "Image":"http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
        "Authors":"J.R.R. Tolkien"
      },
      {
        "Title":"Oh, the Places You'll Go!",
        "Image":"http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
        "Authors":"Seuss"
      },
      {
        "Title":"The Adventures of Tom Sawyer",
        "Image":"http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
        "Authors":"Mark Twain"
      }
    ]
  },
   
    showSearchPage: false
  }
  searchBooks(e) {
    var query = e.target.value;
    fetch('https://reactnd-books-api.udacity.com/search', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    }).then(res => res.json())
      .then(
      data =>
        this.setState({ booksLists: data })
      )
  }
  change(book,e){
		let value = e.target.value;
		let shelfList = this.state.bookShelfList;
    let newBook = {};
    newBook.Title = book.title;
    newBook.Image = book.imageLinks.thumbnail;
    newBook.Authors = book.authors[0];
		if(value === 'none')
			return;
		if(shelfList[value]){
			shelfList[value].push(newBook);
		}
		this.setState({bookShelfList:shelfList,showSearchPage:false});
	}
  render() {
    const { booksLists } = this.state;
    const books = booksLists.books && booksLists.books.error !== 'empty query'
      ? booksLists.books.map(book => <ol className="books-grid" key={book.id}>
        <li>
          <div className='book'>
            <div className="book-top">
              <div className='book-cover'>
                <img className='"book-cover' src={book.imageLinks.smallThumbnail} alt="not available" /></div>
              <div className="book-shelf-changer">
                <select onChange={this.change.bind(this,book)} value={this.state.value}>
                  <option value="none" disabled>Move to...</option>
                  <option value="Currently Reading">Currently Reading</option>
                  <option value="Want to Read">Want to Read</option>
                  <option value="Read">Read</option>
                  <option value="none">none</option>
                </select>
              </div>
            </div>
            <div className="book-title"> {book.title}</div>
            <div className="book-authors">{book.authors}</div>
          </div>
        </li>
      </ol>) : null;
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"
                  value={this.state.books} onChange={this.searchBooks}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
            {booksLists.books && booksLists.books.error ? <p className='text'>No results</p> : books}
          </div>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                <BookShelf
                  bookShelfList={this.state.bookShelfList}
                />
                </div>
              </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
