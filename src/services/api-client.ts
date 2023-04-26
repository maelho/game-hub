import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "065a1653038042558b1708e972428a26",
  },
});
