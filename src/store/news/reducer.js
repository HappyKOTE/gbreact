import { REQUEST_STATUS } from "../../utils/constants"
import { REQ_LOADING, REQ_ERROR, REQ_SUCCESS } from "./actions"

const initialState = {
  data: [],
  request: {
    status: REQUEST_STATUS.IDLE,
    error: ''
  },
}

export const dataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQ_LOADING:
      return {
        ...state,
        request: {
          ...state.request,
          status: REQUEST_STATUS.LOADING
        }
      }
    case REQ_SUCCESS:
      return {
        ...state,
        data: payload,
        request: {
          error: '',
          status: REQUEST_STATUS.SUCCESS
        }
      }
    case REQ_ERROR:
      return {
        ...state,
        request: {
          error: payload,
          status: REQUEST_STATUS.FAILURE
        }
      }
    default:
      return state
  }
}