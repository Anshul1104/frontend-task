import axios from "axios";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuc2h1bC5ndXB0YTM2QGdtYWlsLmNvbSIsImdpdGh1YiI6Imh0dHBzOi8vZ2l0aHViLmNvbS9BbnNodWwxMTA0LyIsImlhdCI6MTY1OTQzNjQ4NywiZXhwIjoxNjU5ODY4NDg3fQ.o0PIR3JLS6m83XRH1ffvMeQBwPbVLrc5pUIJrutc9_A`;

export const instance = axios.create({
  baseURL: "https://upayments-studycase-api.herokuapp.com/api/",
  // timeout: 1000,
  headers: { Authorization: "Bearer " + token },
});
