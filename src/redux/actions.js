import { database } from "../database/config";

export function startAddingTalon(talon) {
  return dispatch => {
    return database
      .ref("talons")
      .update({ [talon.id]: talon })
      .then(() => {
        dispatch(addTalon(talon));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function startLoadingTalons() {
  return dispatch => {
    return database
      .ref("talons")
      .once("value")
      .then(snapshot => {
        let talons = [];
        snapshot.forEach(childSnapshot => {
          talons.push(childSnapshot.val());
        });
        dispatch(loadTalons(talons));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function removeTalon(index) {
  return {
    type: "REMOVE_TALON",
    index
  };
}

export function addTalon(talon) {
  return {
    type: "ADD_TALON",
    talon
  };
}

export function loadTalons(talons) {
  return {
    type: "LOAD_TALONS",
    talons
  };
}
