import * as api from './api';
import config from '../config.js';

export function search(searchString) {
    return api.get(`${config.serverUrl}/youtube/v3/search?type=video
                                                &q=${searchString}
                                                &part=snippet
                                                &key=AIzaSyD2lukNipDUv3KO75IDcO6QDILuEWX4PsI`);
}
