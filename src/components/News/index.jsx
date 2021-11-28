import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
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
  };

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
        {(!isLoading && !error) && data.map((value) => (<div key={value.id}>{value.fullName.en}</div>))}
        {!isLoading && <Button variant="outline-primary" onClick={requestData} className="mt-3">обновить</Button>}
      </div>
    </div>
  )
}

export default News
