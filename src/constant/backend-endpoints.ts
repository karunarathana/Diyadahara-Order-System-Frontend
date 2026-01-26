// let BACKEND_ENDPOINT = "https://orders-manage-production.up.railway.app/";
let BACKEND_ENDPOINT = "http://localhost:8080/";
let API_ROOT_ENDPOINT = "api/com-diyadahara";

const API_ENDPOINTS = {
    CREATE_CUSTOMER: BACKEND_ENDPOINT + API_ROOT_ENDPOINT + "/create-customer",
    VIEW_ALL_CUSTOMERS: BACKEND_ENDPOINT + API_ROOT_ENDPOINT + "/view-all-customer",
    VIEW_SINGLE_CUSTOMER: BACKEND_ENDPOINT + API_ROOT_ENDPOINT + "/view-single-customer",
    DELTE_CUSTOMERS: BACKEND_ENDPOINT + API_ROOT_ENDPOINT + "/delete-customer",
    UPDATE_CUSTOMERS: BACKEND_ENDPOINT + API_ROOT_ENDPOINT + "/update-customer",

    VIEW_ALL_CATEGORY: BACKEND_ENDPOINT + API_ROOT_ENDPOINT + "/view-all-category",
    DELTE_CATEGORY: BACKEND_ENDPOINT + API_ROOT_ENDPOINT + "/delete-category-by-id",
    UPDATE_CATEGORY: BACKEND_ENDPOINT + API_ROOT_ENDPOINT + "/update-category-by-id",
    CREATE_CATEGORY: BACKEND_ENDPOINT + API_ROOT_ENDPOINT + "/create-category",
    GET_ALL_PRODUCT_SINGLE_CATEGORY: BACKEND_ENDPOINT + API_ROOT_ENDPOINT + "/get-all-product-by-category",

    CREATE_ORDER: BACKEND_ENDPOINT + API_ROOT_ENDPOINT + "/create-order",
    VIEWS_ORDER_SINGLE_CUSTOMER: BACKEND_ENDPOINT + API_ROOT_ENDPOINT + "/view-order-relevant-customer",

    VIEW_ALL_PRODUCT: BACKEND_ENDPOINT + API_ROOT_ENDPOINT + "/view-all-product",
    CREATE_PRODUCT: BACKEND_ENDPOINT + API_ROOT_ENDPOINT + "/create-product",


    ALL_DASHBOARD_DETIALS: BACKEND_ENDPOINT + API_ROOT_ENDPOINT + "/get-dashboard-details",



}

export default API_ENDPOINTS;