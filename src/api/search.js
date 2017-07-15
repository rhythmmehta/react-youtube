import * as api from './api';
import config from '../config.js';


export function search(searchString) {
    return api.get(`${config.serverUrl}/youtube/v3/search?type=video&q=${searchString}&maxResults=25&part=snippet&key=AIzaSyD2lukNipDUv3KO75IDcO6QDILuEWX4PsI`);
}
export function changePage(searchString,pageToken) {
    return api.get(`${config.serverUrl}/youtube/v3/search?pageToken=${pageToken}&type=video&q=${searchString}&maxResults=25&part=snippet&key=AIzaSyD2lukNipDUv3KO75IDcO6QDILuEWX4PsI`);
}
