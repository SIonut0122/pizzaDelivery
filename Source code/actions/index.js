import { SET_SIGNIN_CONTAINER,SET_CART_CONTAINER,
         SET_PROCEED_ADDRDEL,SET_SIGNEDIN_USER,
         SET_GOOGLEUSER_INFO,SET_VIEWPRODUCT_DETAILS,
         SET_PRODUCT_DETAILS, ADD_TO_CART, TOTAL_CART_SUM,
         SAUCE_TO_CART, SET_DEF_DISPLAYNAME }  from "../constants/action-types";


export function setSigninContainer(payload) {
  return { type: SET_SIGNIN_CONTAINER, payload };
}
export function setCartContainer(payload) {
  return { type: SET_CART_CONTAINER, payload };
}
export function setProductDetails(payload) {
  return { type: SET_PRODUCT_DETAILS, payload };
}
export function setAddToCart(payload) {
  return { type: ADD_TO_CART, payload };
}
export function setSaucesCart(payload) {
  return { type: SAUCE_TO_CART, payload };
}
export function setCartTotalSum(payload) {
  return { type: TOTAL_CART_SUM, payload };
}
export function setOpenProductDetails(payload) {
  return { type: SET_VIEWPRODUCT_DETAILS, payload };
}
export function setProceedWithDelAddress(payload) {
  return { type: SET_PROCEED_ADDRDEL, payload };
}
export function setSignedInUser(payload) {
  return { type: SET_SIGNEDIN_USER, payload };
}
export function setGoogleUserInfo(payload) {
  return { type: SET_GOOGLEUSER_INFO, payload };
}
export function setDefDisplayname(payload) {
  return { type: SET_DEF_DISPLAYNAME, payload };
}



