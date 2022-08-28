import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
    "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAxMzQsIm5hbWUiOiJ0ZXN0X2RlbW8iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjE2MDc5NjR9.Nlhz1WWN31BkVVkZzixtwxGlamqrTdjLplIzXIskkRk"
  }
});