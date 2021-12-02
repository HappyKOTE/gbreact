import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { selectData, selectLoading, selectError } from "../../store/news/selectors"
import { needData } from "../../store/news/actions"

function News() {
  const dispatch = useDispatch()
  const data = useSelector(selectData)
  const isLoading = useSelector(selectLoading)
  const error = useSelector(selectError)

  const requestData = async () => {
    dispatch(needData())
  }

  useEffect(() => {
    requestData()
  },
  // eslint-disable-next-line
  [])

  return (
    <div className="h-100 overflow-hidden d-flex flex-column">
      <h1 className="p-3">новости</h1>
      <div className="h-100 overflow-auto p-3 pt-0">
        {isLoading && <div><div className="spinner-grow spinner-grow-sm" role="status"></div> загрузка данных</div>}
        {(!!error && !isLoading) && <div><i className="bi bi-exclamation-triangle text-danger"></i> ошибка загрузки данных. {error}</div>}
        {(!isLoading && !error) &&
          <Table responsive>
            <thead>
              <tr>
                <th>laureate</th>
                <th>year</th>
                <th>category</th>
                <th>motivation</th>
              </tr>
            </thead>
            <tbody>
              {data.map((value) => (
              <tr key={value.id}>
                <td>{value.fullName.en}</td>
                <td>{value.nobelPrizes[0].awardYear}</td>
                <td>{value.nobelPrizes[0].category.en}</td>
                <td>{value.nobelPrizes[0].motivation.en}</td>
              </tr>))}
            </tbody>
          </Table>
        }
        {!isLoading && <Button variant="outline-primary" onClick={requestData} className="mt-3">обновить</Button>}
      </div>
    </div>
  )
}

export default News
