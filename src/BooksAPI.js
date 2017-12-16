
const api = "https://reactnd-books-api.udacity.com"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)

export const getAll = (data) =>
  fetch('https://reactnd-books-api.udacity.com/books', { headers: { 'Authorization': 'whatever-you-want'}})
    .then(res => res.json())
    .then(data => console.log(data))

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const search = (query, maxResults) =>
   fetch('https://reactnd-books-api.udacity.com/search', {
    method: 'POST',
    headers: {
       'Accept': 'application/json',
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query:'History', maxResults:10 })
  }).then(res => res.json())
    .then(data => console.log(data))



/*
const search = {
  query: 'string',
  maxResults: number
}    
fetch('https://reactnd-books-api.udacity.com/search', {
    method: 'POST',
    headers: {
       'Accept': 'application/json',
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query:'History', maxResults:10 })
  }).then(res => res.json())
    .then(data => console.log(data)) */


      /*fetch('https://reactnd-books-api.udacity.com/books/nggnmAEACAAJ', { headers:  { 'Authorization': 'whatever-you-want'} })
    .then(res => res.json())
    .then(data => console.log(data))*/


     /*const shelf = {a: 1, b: 2}
     fetch('https://reactnd-books-api.udacity.com/books/5', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())
  .then(data => console.log(data))*/