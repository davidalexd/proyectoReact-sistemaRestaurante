

import {URL} from "../../api/apiDB"
let ws = new WebSocket(`ws:${URL.SOCKET}/chat`);
export {ws};