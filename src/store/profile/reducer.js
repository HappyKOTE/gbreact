import { TOGGLE_CHECKBOX } from "./actions"

const initialState = {
  checkbox: false,
  name: 'простой чекбокс'
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CHECKBOX:
      return {
        ...state,
        checkbox: !state.checkbox
      }
    default:
      return state
  }
}