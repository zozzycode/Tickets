// import extTickets from "../data/extTickets";
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

function tickets(state = [], action) {
  // console.log(state);
  switch (action.type) {
    case "REMOVE_TICKET":
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    case "ADD_TICKET":
      return [...state, action.ticket];
    case "LOAD_TICKETS":
      return action.tickets;
    default:
      return state;
  }
}

const rootReducer = combineReducers({ tickets, comments });

export default rootReducer;
