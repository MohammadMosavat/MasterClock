import Cookies from "js-cookie";

export const hasApiKey = () => Boolean(Cookies.get("clockify_api_key"));
export const clearApiKey = () => Cookies.remove("clockify_api_key");
export const getApiKey = () => Cookies.get("clockify_api_key");
