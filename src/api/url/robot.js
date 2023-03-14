import axios from "../http";

function getMsg(text) {
  return axios.get("http://www.liulongbin.top:3006/api/robot", {
    params: {
      spoken: text,
    },
  });
}

export default {
  getMsg,
};
