import { apiUrl } from "../../utils/constants"

export const REQ_LOADING = "CHATS::REQ_LOADING"
export const REQ_ERROR = "CHATS::REQ_ERROR"
export const REQ_SUCCESS = "CHATS::REQ_SUCCESS"

export const reqLoading = () => ({
  type: REQ_LOADING
})

export const reqError = (err) => ({
  type: REQ_ERROR,
  payload: err
})

export const reqSuccess = (news) => ({
  type: REQ_SUCCESS,
  payload: news
})

export const needData = () => async (dispatch) => {
  dispatch(reqLoading())
  try {
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error(`Запрос завершился с ошибкой ${response.status}`)
    }
    const result = await response.json()
    console.log(result)
    dispatch(reqSuccess(result.laureates))
  }
  catch (err) {
    console.warn(err)
    dispatch(reqError(err.message))
  }
}