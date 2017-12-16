import React from 'react'
import './App.css';

class BookShelf extends React.Component {
  state = {
    value:"none",
		bookShelfList : this.props.bookShelfList
  }
	change(obj,key,e){
		let value = e.target.value;
		let shelfList = this.state.bookShelfList;
		if(value === 'none')
			return;
		if(key !== value){
			for(let list in shelfList[key]){
				if(shelfList[key][list].Title === obj.Title){
					shelfList[key].splice(list, 1);
	        break;
				}
			}
			if(shelfList[value]){
				shelfList[value].push(obj);
			}
			this.setState({bookShelfList:shelfList});
		}
	}
	createEachBookShelf(bookList,shelf){
		let arr = [];
		for(let book in bookList){
			arr.push(
			<li key={bookList[book].Title}>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+bookList[book].Image+')' }}></div>
						<div className="book-shelf-changer">
							<select onChange={this.change.bind(this,bookList[book],shelf)} value={this.state.value}>
								<option value="none" disabled>Move to...</option>
								<option value="Currently Reading">Currently Reading</option>
								<option value="Want to Read">Want to Read</option>
								<option value="Read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{bookList[book].Title}</div>
					<div className="book-authors">{bookList[book].Authors}</div>
				</div>
			</li>);
		}
		return arr;
	}
	createBookShelf(){
		let arr = [];
		let shelfList = this.state.bookShelfList;
		for(let shelf in shelfList){
			arr.push(<div key={shelf} className="bookshelf">
				<h2 className="bookshelf-title">{shelf}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.createEachBookShelf(shelfList[shelf],shelf)}
					</ol>
				</div>
			</div>);
		}
		return arr;
	}
	render() {
		return (
			<div>
				{this.createBookShelf()}
			</div>
		)
	}
}

export default BookShelf
