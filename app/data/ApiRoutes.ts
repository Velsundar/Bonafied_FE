import { API_BASE_URL } from "../config";

export const API_ROUTES = Object.freeze({
  AUTH: {
    SIGN_IN: `/entrance/login`,
    CREATE: `/api/user/create`,
    GET_USER: "/user/get-one-user",
  },
  ADMIN:{
    BONAFIED:{
        GETALL: "/bonafied"
    },
  }
});
export const getApiRoute = (pathName: string) => {
    return `${API_BASE_URL}${pathName}`;
  };  
