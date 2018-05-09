const prodUrl = "/zozzy/100tickets";
const localhostUrl = "";

const url = process.env.NODE_ENV === "production" ? prodUrl : localhostUrl;

export const HOME = `${url}/`;
export const ADD_NEW = `${url}/generate`;
export const SINGLE = `${url}/single/`;
