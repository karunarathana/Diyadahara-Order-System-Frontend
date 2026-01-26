let BACKEND_ENDPOINT = "https://orders-manage-production.up.railway.app/";
let API_ROOT_ENDPOINT = "api/com-diyadahara";

const API_ENDPOINTS = {
 CREATE_CUSTOMER: BACKEND_ENDPOINT+API_ROOT_ENDPOINT+ "/create-customer",
 VIEW_ALL_CUSTOMERS: BACKEND_ENDPOINT+API_ROOT_ENDPOINT+ "/view-all-customer",
 DELTE_CUSTOMERS: BACKEND_ENDPOINT+API_ROOT_ENDPOINT+ "/delete-customer",
 UPDATE_CUSTOMERS: BACKEND_ENDPOINT+API_ROOT_ENDPOINT+ "/update-customer",
}

export default API_ENDPOINTS;