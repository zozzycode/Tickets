const prodUrl = "/zozzy/100talons";
const localhostUrl = "";

const url = process.env.NODE_ENV === "production" ? prodUrl : localhostUrl;

export const HOME = `${url}/`;
export const ADD_NEW = `${url}/NewTalon`;
export const SINGLE = `${url}/single/`;
