//const sourceURL="http://localhost:8080";
//const URLSOCKET="//localhost:8080"
const sourceURL="https://restaurantrestapi.herokuapp.com";
const URLSOCKET="//restaurantrestapi.herokuapp.com";
export const URL ={
    SOCKET:URLSOCKET,
    PRODUCT_DB:`${sourceURL}/api/products`,
    ALL_ORDERS:`${sourceURL}/api/order`,
    CLIENT_ORDERS:`${sourceURL}/api/order/users`,
    PAYMENT_STRIPE:`${sourceURL}/api/payments/stripe`,
    USERS_DB:`${sourceURL}/api/users`,
    USERS_ROLES:`${sourceURL}/api/roles/users`,
    PRODUCT_CATEGORY:`${sourceURL}/api/categories`,
    SIGNIN_AUTH:`${sourceURL}/api/auth/signin`,
    SIGNUP_AUTH:`${sourceURL}/api/auth/signup`,
    CHART_CATEGORY:`${sourceURL}/api/categories/chart`,
    USERS_SUMARY:`${sourceURL}/api/users/summary`,
    ORDERS_SUMARY:`${sourceURL}/api/order/summary`,
    ORDERS_DETAILS_SUMARY:`${sourceURL}/api/orderdetails/summary`,
    PASSWORD_CHANGE:`${sourceURL}/api/auth`,
}  


