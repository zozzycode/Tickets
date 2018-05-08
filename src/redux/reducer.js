import extTalons from "../data/extTalons";
import { combineReducers } from "redux";

function comments(state = {}, action) {
  switch (action.type) {
    case "ADD_COMMENT":
      if (!state[action.postId]) {
        return { ...state, [action.postId]: [action.comment] };
      } else {
        return {
          ...state,
          [action.postId]: [...state[action.postId], action.comment]
        };
      }

    case "LOAD_COMMENTS":
      return action.comments;

    default:
      return state;
  }
}

function talons(state = [], action) {
  console.log(state);
  switch (action.type) {
    case "REMOVE_TALON":
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    case "ADD_TALON":
      return [...state, action.talon];
    case "LOAD_TALONS":
      return action.talons;
    default:
      return state;
  }
}

const rootReducer = combineReducers({ talons, comments });

export default rootReducer;
