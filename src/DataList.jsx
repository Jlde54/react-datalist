import { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import styles from './DataList.module.scss'

/**
 * DataList is a reusable data table component with search, sorting, and pagination.
 *
 * @component
 * @param {Object[]} data - The dataset to display (array of objects).
 * @param {Object[]} columns - Columns to render, each with `title` and `property`.
 * @param {string} [title] - Optional title for the table.
 * @param {string} [noDataText] - Text shown when no results are found.
 * @param {number[]} [entriesOptions] - Page size options (e.g., [5, 10, 25]).
 *
 * @example
 * <DataList
 *   data={[{ name: 'Alice', age: 30 }]}
 *   columns={[{ title: 'Name', property: 'name' }]}
 *   title="Users"
 *   noDataText="Nothing to show"
 *   entriesOptions={[5, 10]}
 * />
 */
function DataList({
  data = [],
  columns = [],
  title = "Data Table",
  noDataText = "No data found.",
  entriesOptions = [],
  }) 
{

  const [search, setSearch] = useState('')
  const [entries, setEntries] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortParam, setSortParam] = useState({ key: null, direction: 'asc' })

  const filteredData = useMemo(() => {
    return data.filter(empl => {
      const values = Object.values(empl).join(' ').toLowerCase()
      return values.includes(search.toLowerCase())
    })
  }, [data, search])

  const sortedData = useMemo(() => {
    let sortableData = [...filteredData]
    if (sortParam.key) {
      sortableData.sort((a, b) => {
        const aValue = a[sortParam.key] || ''
        const bValue = b[sortParam.key] || ''
        if (aValue < bValue) {
          return sortParam.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortParam.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return sortableData
  }, [filteredData, sortParam])
    
  const totalPages = Math.ceil(filteredData.length / entries)
  
  const paginatedData = sortedData.slice(
    (currentPage - 1) * entries,
    currentPage * entries
  )

  const handleEntriesChange = (e) => {
    setEntries(Number(e.target.value))
    setCurrentPage(1)
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
  }

  const requestSort = (key) => {
    let direction = 'asc'
    if (sortParam.key === key && sortParam.direction === 'asc') {
      direction = 'desc'
    }
    setSortParam({ key, direction })
  }

  const startIndex = (currentPage - 1) * entries + 1
  const endIndex = Math.min(startIndex + entries - 1, filteredData.length)

  return (
    <div className={styles.dataList}>
      <h2 className={styles.dataList__title}>{title}</h2>

      <div className={styles.dataList__controls}>
        <label htmlFor="entries">
          Show&nbsp;
          <select id="entries" value={entries} onChange={handleEntriesChange}>
            {entriesOptions.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          &nbsp;entries
        </label>

        <label htmlFor="search">
          Search:&nbsp;
          <input
            type="text"
            id="search" 
            value={search}
            onChange={handleSearchChange}
            className={styles.dataList__searchInput}
          />
        </label>
      </div>

      {filteredData.length === 0 ? (
        <p className={styles.dataList__empty}>{noDataText}</p>
      ) : (
        <>
          <div className={styles.dataList__tableWrapper}>
            <table className={styles.dataList__table}>
              <thead>
                <tr>
                {columns.map(col => (
                    <th 
                      key={col.property}
                      onClick={() => requestSort(col.property)}
                      // className={styles.dataList__th}
                    >
                      <div className={styles.dataList__th}>
                        <div className={styles.dataList__columnTitle}>{col.title}</div>
                        <div className={styles.dataList__sortIcons}>
                          <div
                            className={`${styles.dataList__triangle} ${sortParam.key === col.property && sortParam.direction === 'asc' ? styles.active : ''
                            }`}
                          > ▲
                          </div>
                          <div
                            className={`${styles.dataList__triangle} ${
                            sortParam.key === col.property && sortParam.direction === 'desc' ? styles.active : ''
                            }`}
                          > ▼
                          </div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={index}>
                    {columns.map(col => (
                      <td key={col.property}>
                        {item[col.property] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.dataList__footer}>
            <span>
              Showing {startIndex} to {endIndex} of {filteredData.length} entries
            </span>
            <div className={styles.dataList__pagination}>
              <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
              <span className={styles.dataList__pageNumber}> {currentPage} </span>
              <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

DataList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      property: PropTypes.string.isRequired
    })
  ).isRequired,
  title: PropTypes.string,
  noDataText: PropTypes.string,
  entriesOptions: PropTypes.arrayOf(PropTypes.number)
}

export default DataList