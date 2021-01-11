
import { SET_SIGNIN_CONTAINER,SET_CART_CONTAINER,
         SET_PROCEED_ADDRDEL, SET_SIGNEDIN_USER,
         SET_GOOGLEUSER_INFO, SET_VIEWPRODUCT_DETAILS,
         SET_PRODUCT_DETAILS, ADD_TO_CART, TOTAL_CART_SUM,SAUCE_TO_CART,
         SET_DEF_DISPLAYNAME   }   from "./constants/action-types";
 import  sauce                     from './js/sauce';



    const initialState = {
      openSigninContainer   : false,
      openCartContainer     : true,
      cartProducts          : [],
      cartTotalSum          : 0,
      cartSauces            : sauce,
      productDetails        :null,
      openProductDetails    : false,
      proceedWithDelAddr    : false,
      googleUserInfo        : null,
      profileDefDisplayname : ''
  }



    function rootReducer(state = initialState, action) {

    
      switch(action.type) {
        case SET_SIGNIN_CONTAINER: 
           return Object.assign({}, state, {
          openSigninContainer: action.payload.openSigninContainer
        });
        case SET_CART_CONTAINER: 
           return Object.assign({}, state, {
          openCartContainer: action.payload.openCartContainer
        });
        case ADD_TO_CART: 
           return Object.assign({}, state, {
          cartProducts: action.payload.cartProducts
        });
        case SAUCE_TO_CART: 
           return Object.assign({}, state, {
          cartSauces: action.payload.cartSauces
        });   
        case TOTAL_CART_SUM: 
           return Object.assign({}, state, {
          cartTotalSum: action.payload.cartTotalSum
        });   
        case SET_PRODUCT_DETAILS: 
           return Object.assign({}, state, {
          productDetails: action.payload.productDetails
        });   
        case SET_VIEWPRODUCT_DETAILS: 
           return Object.assign({}, state, {
          openProductDetails: action.payload.openProductDetails
        });
        case SET_PROCEED_ADDRDEL: 
           return Object.assign({}, state, {
          proceedWithDelAddr: action.payload.proceedWithDelAddr
        }); 
        case SET_SIGNEDIN_USER: 
           return Object.assign({}, state, {
          signedInUser: action.payload.signedInUser
        }); 
        case SET_GOOGLEUSER_INFO: 
           return Object.assign({}, state, {
          googleUserInfo: action.payload.googleUserInfo
        });
        case SET_DEF_DISPLAYNAME: 
           return Object.assign({}, state, {
          profileDefDisplayname: action.payload.profileDefDisplayname
        });  
      }

      return state;
    }



  export default rootReducer;