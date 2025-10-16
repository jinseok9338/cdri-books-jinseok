import ky from "ky";
import { getENV } from "./utils";
const BASE_URL = "https://dapi.kakao.com/v3";
const KAKAO_API_KEY = getENV("VITE_KAKAO_API_KEY");

const API = ky.create({
  prefixUrl: BASE_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const authorization = `KakaoAK ${KAKAO_API_KEY}`;
        request.headers.set("Authorization", authorization);
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (import.meta.env.DEV && response.ok) {
          const responseData = await response.json();
          console.log(JSON.stringify(responseData, null, 2));
        }
      },
    ],
  },
});

export default API;
