import { database } from "../database/config";

export function startAddingTicket(ticket) {
  return dispatch => {
    return database
      .ref("tickets")
      .update({ [ticket.id]: ticket })
      .then(() => {
        dispatch(addTicket(ticket));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function startLoadingTickets() {
  return dispatch => {
    return database
      .ref("tickets")
      .once("value")
      .then(snapshot => {
        let tickets = [];
        snapshot.forEach(childSnapshot => {
          tickets.push(childSnapshot.val());
        });
        dispatch(loadTickets(tickets));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function removeTicket(index) {
  return {
    type: "REMOVE_TICKET",
    index
  };
}

export function addTicket(ticket) {
  return {
    type: "ADD_TICKET",
    ticket
  };
}

export function loadTickets(tickets) {
  return {
    type: "LOAD_TICKETS",
    tickets
  };
}
