import { REQUEST_STATUS } from "../../utils/constants"

export const selectData = (state) => state.news.data
export const selectLoading = (state) => state.news.request.status === REQUEST_STATUS.LOADING
export const selectError = (state) => state.news.request.error