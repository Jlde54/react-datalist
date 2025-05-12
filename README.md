# React DataList

A reusable and customizable React data table component with search, sort, and pagination.

Available on npm : https://www.npmjs.com/package/react-datalist-jld

## Prerequisites

- Node.js **>= 16.0.0** ([Download here](https://nodejs.org/))
- npm (ou yarn)
- React **>= 18.0.0** and ReactDOM
- A modern code editor like **[Visual Studio Code](https://code.visualstudio.com/)**
- A modern web browser (Chrome, Firefox, …)

## Features

- Real-time search across all fields
- Clickable sortable column headers (ascending/descending)
- Pagination with configurable entries per page
- Modular SCSS styles using BEM naming
- Prop validation using [prop-types]

## Installation
```
npm install react-datalist-jld
```
 This package requires react, react-dom and prop-types to be already installed as peer dependencies.

## Usage


- In the component calling the array :
import DataList from 'react-datalist-jld'
```
const data = [
  { firstName: 'Alice', lastName: Smith, birthDate: '2005-01-01', city: 'New-York' },
  { firstName: 'Bob', lastName: Scott, birthDate: '2001-06-23', city: 'Washington' }
]

const columns = [
  { title: 'First Name', property: 'firstName' },
  { title: 'Last Name', property: 'lastName' },
  { title: 'Date of Birth', property: 'birthDate' },
  { title: 'City', property: 'city' }
]

function App() {
  return (
    <DataList
      data={data}
      columns={columns}
      title="Employee List"
      noDataText="No results found."
      entriesOptions={[5, 10, 50, 100]}
    />
  )
}
```
- In the main.jsx or index.js :
import 'react-datalist-jld/react-datalist-jld.css'

## Props

|Prop              |Type                            |Required    |Description
|:-----------------|:-------------------------------|:-----------|:----------
|data              |arrayOf(object)                 |yes         |The data to display in the table  
|columns           |arrayOf({ title, property })    |yes         |Configuration for columns (title shown and object property key)  
|title             |string                          |no          |Title displayed above the table  
|noDataText        |string                          |no          |Text displayed when no results match the search  
|entriesOptions    |arrayOf(number)                 |no          |Options for entries per page selection (e.g., [5, 10, 25])  

Prop Validation : This component uses prop-types to validate all props during development.

## Style

- Uses SCSS Modules (DataList.module.scss)
- Follows BEM-style naming (.dataList__title, .dataList__table, etc.)
- Fully responsive with scroll support on small screens
- You can override or extend styles by copying the SCSS file or using your own

## Development

To install dependencies and run the project locally :  
- npm install  
- npm run dev  

To build the library :  
- npm run build

## License

MIT © JLD