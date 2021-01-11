import React from 'react';
import '../css/Cart.css';
import { connect             }  from "react-redux";
import { setCartContainer,
         setProceedWithDelAddress,setAddToCart,
         setCartTotalSum, setSaucesCart,
         setOpenProductDetails   } from '../actions';
import DeliveryAddress             from './DeliveryAddress';
import { Link }                    from 'react-router-dom'; 



const mapStateToProps = state => {
  return {  
        proceedWithDelAddr : state.proceedWithDelAddr,
        cartProducts       : state.cartProducts,
        cartTotalSum       : state.cartTotalSum,
        cartSauces         : state.cartSauces
        };
};

function mapDispatchToProps(dispatch) {
  return {
            setCartContainer         : bol        => dispatch(setCartContainer(bol)),
            setProceedWithDelAddress : bol        => dispatch(setProceedWithDelAddress(bol)),
            setAddToCart             : prod       => dispatch(setAddToCart(prod)),
            setCartTotalSum          : totalSum   => dispatch(setCartTotalSum(totalSum)),
            setSaucesCart            : saucesCart => dispatch(setSaucesCart(saucesCart)),
            setOpenProductDetails    : bol        => dispatch(setOpenProductDetails(bol))
        };
}



class connectedCart extends React.Component {

    state = {
      cartProducts : this.props.cartProducts,
      sauces       : this.props.cartSauces
      
    }


componentDidMount() {
  // Hide cart icon details 
  document.querySelector('#head_cartdetails_div').style.display = 'none';
 
  // Scroll to top on every mount
  window.scrollTo(0, 0);
  // Hide cart dropmenu when cart comp is mounted
  if(document.querySelector('.hdropdowncart_menu_cont') !== null) {
    document.querySelector('.hdropdowncart_menu_cont').style.display = 'none';
  }
  // Hide product details container when comming from the product details cart button
  this.props.setOpenProductDetails({ openProductDetails: false })
}

componentDidUpdate(prevProps) {
  // Scroll to top if different cart components are mounted
  if(this.props.proceedWithDelAddr !== prevProps.proceedWithDelAddr) {
    window.scrollTo(0, 0);
  }
}

componentWillUnmount() {
  // Display cart icon details
 document.querySelector('#head_cartdetails_div').style.display = 'flex'; 

  // Restore default user avatar and cart icon positons
  if(document.querySelector('.head_cont_halftwo_sect_two') !== null) {
    document.querySelector('.head_cont_halftwo_sect_two').setAttribute('style', 'padding-top:10px;flex-direction: column');
  }
  if(document.querySelector('.hd_profname_txt') !== null) {
    document.querySelector('.hd_profname_txt').style.display = 'none';
  }
}

handleCartCloseBtn() {
  // Close signinup container and enable body scrolling
  this.props.setSigninContainer({ openSigninContainer: false })
  document.querySelector('body').style.overflow = 'visible';
   
}

handleProceedCartBtn() {
  this.props.setProceedWithDelAddress({ proceedWithDelAddr: true })
}


// CART PRODUCT ACTIONS

removeCartProd(cartProd,e,index) {
  let cartProducts = [...this.props.cartProducts];
  
  // Search for indexed cart product and set removeProdLoading to true to display loading effect
  for(let i in cartProducts) {
    if(cartProducts.indexOf(cartProducts[i]) === index) {
      cartProducts[i].removeProdLoading = true;

      this.props.setAddToCart({ cartProducts: cartProducts })
      this.setState({ cartProducts: cartProducts })
      
      setTimeout(() => {
          // Filter only products that are not equal with received index
          let removeUsingUniqueId = cartProducts.filter(product => cartProducts.indexOf(product) !== index);
          this.props.setAddToCart({ cartProducts: removeUsingUniqueId })
          this.setState({ cartProducts: removeUsingUniqueId })
          // Call function to recalculate total cart sum everytime a product is removed
          this.calculateCartTotalSum(removeUsingUniqueId);
      },1000);
    }
  } 
}

calculateCartTotalSum(cartProducts) {
    let prices = [];
    // If cart products is not empty, collect al totalPrices and get the sum
    if(cartProducts.length > 0) {
    cartProducts.map(cartProd => prices.push(parseFloat(cartProd.totalProdPrice)));
    // return total cart products sum
    let getTheCartSum = prices.reduce((a,b) => a + b);
    // Convert cart sum to decimals
    let convertCartSum  = getTheCartSum.toFixed(2);
    this.props.setCartTotalSum({ cartTotalSum: convertCartSum})
  }
}

handleDecrease(e,cartProd) {
let cartProducts = [...this.state.cartProducts];

  for(let i in cartProducts) {
    // If cartProd unique id !== undefined, compare uniqueId from existing cartProd with the new added cartProd
    if(cartProd.uniqueId !== undefined) {
      if(cartProd.uniqueId === cartProducts[i].uniqueId) {
        // Compare existing cart topping array items with the state product
          let addedExtraToppingCart  = cartProducts[i].topping.map(el => el.topping.toLowerCase()).sort();
          let addedExtraToppingCartProd = cartProd.addedExtraTopping.map(el => el.topping.toLowerCase()).sort();
          // Transorm to JSON and compare existing product addedextratoppingcart with new added prod
          if(JSON.stringify(addedExtraToppingCart) == JSON.stringify(addedExtraToppingCartProd)) {
            let removedIngredientsCart  = cartProducts[i].removedIngr.map(el => el.toLowerCase()).sort();
            let removedIngredientsState = cartProd.removedIngr.map(el => el.toLowerCase()).sort();
            // Transorm to JSON and compare existing product removedIngredientsCart with new added prod
            if(JSON.stringify(removedIngredientsCart) == JSON.stringify(removedIngredientsState)) {
              // If prod pieces is lower than 20,increase
              if(cartProducts[i].pieces >= 2) {
                cartProducts[i].pieces--;
                let recalculateCartProdTotalPrice = cartProducts[i].basicProductPrice * cartProducts[i].pieces;
                cartProducts[i].totalProdPrice = recalculateCartProdTotalPrice.toFixed(2);

                // Display loading effect
                cartProducts[i].prodLoading = true;

                this.setState({ cartProducts: cartProducts})
                this.props.setAddToCart({ cartProducts: cartProducts }) 
                this.calculateCartTotalSum(cartProducts);

                // Hide loading effect for all the products after 1 sec
                setTimeout(() => {
                  for(let c=0;c<cartProducts.length;c++) {
                    cartProducts[i].prodLoading = false;
                  }
                  this.setState({ cartProducts: cartProducts})
                  this.props.setAddToCart({ cartProducts: cartProducts }) 
                },1000);
              }
          }
        }
      }
    } else {
      // If cartProd has not an uniqueId, check id
       if(cartProd.id === cartProducts[i].id) {
          // Compare existing cart topping array items with the state product
          let addedExtraToppingCart  = cartProducts[i].topping.map(el => el.topping.toLowerCase()).sort();
          let addedExtraToppingCartProd = cartProd.addedExtraTopping.map(el => el.topping.toLowerCase()).sort();
           // Transorm to JSON and compare existing product addedextratoppingcart with new added prod
           if(JSON.stringify(addedExtraToppingCart) == JSON.stringify(addedExtraToppingCartProd)) {
              let removedIngredientsCart  = cartProducts[i].removedIngr.map(el => el.toLowerCase()).sort();
              let removedIngredientsState = cartProd.removedIngr.map(el => el.toLowerCase()).sort();
              // Transorm to JSON and compare existing product removedIngredientsCart with new added prod
              if(JSON.stringify(removedIngredientsCart) == JSON.stringify(removedIngredientsState)) {
                // If prod pieces is lower than 20,increase
                if(cartProducts[i].pieces >= 2) {
                  cartProducts[i].pieces--;
                  let recalculateCartProdTotalPrice = cartProducts[i].basicProductPrice * cartProducts[i].pieces;
                  cartProducts[i].totalProdPrice = recalculateCartProdTotalPrice.toFixed(2);

                  // Display loading effect
                  cartProducts[i].prodLoading = true;

                  this.setState({ cartProducts: cartProducts})
                  this.props.setAddToCart({ cartProducts: cartProducts })
                  this.calculateCartTotalSum(cartProducts); 

                  // Hide loading effect for all the products after 1 sec
                  setTimeout(() => {
                    for(let c=0;c<cartProducts.length;c++) {
                      cartProducts[i].prodLoading = false;
                    }
                    this.setState({ cartProducts: cartProducts})
                    this.props.setAddToCart({ cartProducts: cartProducts }) 
                  },1000);

                }
              }
          }
       }
    }
  }
}

handleIncrease(e,cartProd) {
  let cartProducts = [...this.state.cartProducts];

  for(let i in cartProducts) {
    // If cartProd unique id !== undefined, compare uniqueId from existing cartProd with the new added cartProd
    if(cartProd.uniqueId !== undefined) {
      if(cartProd.uniqueId === cartProducts[i].uniqueId) {
        // Compare existing cart topping array items with the state product
          let addedExtraToppingCart  = cartProducts[i].topping.map(el => el.topping.toLowerCase()).sort();
          let addedExtraToppingCartProd = cartProd.addedExtraTopping.map(el => el.topping.toLowerCase()).sort();
          // Transorm to JSON and compare existing product addedextratoppingcart with new added prod
          if(JSON.stringify(addedExtraToppingCart) == JSON.stringify(addedExtraToppingCartProd)) {
            let removedIngredientsCart  = cartProducts[i].removedIngr.map(el => el.toLowerCase()).sort();
            let removedIngredientsState = cartProd.removedIngr.map(el => el.toLowerCase()).sort();
            // Transorm to JSON and compare existing product removedIngredientsCart with new added prod
            if(JSON.stringify(removedIngredientsCart) == JSON.stringify(removedIngredientsState)) {
              // If prod pieces is lower than 20,increase
              if(cartProducts[i].pieces < 20) {
                cartProducts[i].pieces++;
                cartProducts[i].incrLoading = true;
                let recalculateCartProdTotalPrice = cartProducts[i].basicProductPrice * cartProducts[i].pieces;
                cartProducts[i].totalProdPrice = recalculateCartProdTotalPrice.toFixed(2);

                // Display loading effect
                cartProducts[i].prodLoading = true;

                this.setState({ cartProducts: cartProducts})
                this.props.setAddToCart({ cartProducts: cartProducts }) 
                this.calculateCartTotalSum(cartProducts);

                // Hide loading effect for all the products after 1 sec
                setTimeout(() => {
                  for(let c=0;c<cartProducts.length;c++) {
                    cartProducts[i].prodLoading = false;
                  }
                  this.setState({ cartProducts: cartProducts})
                  this.props.setAddToCart({ cartProducts: cartProducts }) 
                },1000);
                
              }
          }
        }
      }
    } else {
      // If cartProd has not an uniqueId, check id
       if(cartProd.id === cartProducts[i].id) {
          // Compare existing cart topping array items with the state product
          let addedExtraToppingCart  = cartProducts[i].topping.map(el => el.topping.toLowerCase()).sort();
          let addedExtraToppingCartProd = cartProd.addedExtraTopping.map(el => el.topping.toLowerCase()).sort();
           // Transorm to JSON and compare existing product addedextratoppingcart with new added prod
           if(JSON.stringify(addedExtraToppingCart) == JSON.stringify(addedExtraToppingCartProd)) {
              let removedIngredientsCart  = cartProducts[i].removedIngr.map(el => el.toLowerCase()).sort();
              let removedIngredientsState = cartProd.removedIngr.map(el => el.toLowerCase()).sort();
              // Transorm to JSON and compare existing product removedIngredientsCart with new added prod
              if(JSON.stringify(removedIngredientsCart) == JSON.stringify(removedIngredientsState)) {
                // If prod pieces is lower than 20,increase
                if(cartProducts[i].pieces < 20) {
                  cartProducts[i].pieces++;
                  let recalculateCartProdTotalPrice = cartProducts[i].basicProductPrice * cartProducts[i].pieces;
                  cartProducts[i].totalProdPrice = recalculateCartProdTotalPrice.toFixed(2);

                  // Display loading effect
                  cartProducts[i].prodLoading = true;

                  this.setState({ cartProducts: cartProducts})
                  this.props.setAddToCart({ cartProducts: cartProducts }) 
                  this.calculateCartTotalSum(cartProducts);

                  // Hide loading effect for all the products after 1 sec
                  setTimeout(() => {
                    for(let c=0;c<cartProducts.length;c++) {
                      cartProducts[i].prodLoading = false;
                    }
                    this.setState({ cartProducts: cartProducts})
                    this.props.setAddToCart({ cartProducts: cartProducts }) 
                  },1000);
                }
              }
          }
       }
    }
  }
}



sauceCartIncrDecr(e,ind,item,action) {
  let sauces   = [...this.props.cartSauces];
  let sauceBox = document.querySelectorAll('.citems_addsauce_box');

  // Increase / decrease sauce pieces number
  // Add to cartTotalSum every new sauce price
  for(let i in sauces) {
    if(action === 'increase') {
      if(sauces[i].id === item.id) {
        if(sauces[i].pieces < 21) {
            sauces[i].pieces++;
            this.props.setSaucesCart({ cartSauces: sauces })
            let newCartSum = (Number(this.props.cartTotalSum) + Number(sauces[i].price)).toFixed(2);
            this.props.setCartTotalSum({ cartTotalSum: newCartSum })
        }
      } 
    } else if(action === 'decrease') {
        if(sauces[i].id === item.id) {
          if(sauces[i].pieces > 0) {
              sauces[i].pieces--;
              this.props.setSaucesCart({ cartSauces: sauces })
              let newCartSum = (Number(this.props.cartTotalSum) - Number(sauces[i].price)).toFixed(2);
              this.props.setCartTotalSum({ cartTotalSum: newCartSum })
            }
         }
      }
   }

   
   // Set opacity to 0.8
   sauceBox.forEach((el,index) => {
    if(index === ind) {
      el.setAttribute('style','opacity:0.5;pointer-events:none');
    }
   });

   // Enable opacity
    setTimeout(() => {
      sauceBox.forEach(el => el.removeAttribute('style'));
    },1000);
}






  render() { 
    return (
      
            <div>
                <div className='row'>
                 <div className='cart_container'>
                  
                    {!this.props.proceedWithDelAddr ? (
                    <div className='cart_items_wrap'>
                      <span className='cart_items_title'>Cos</span>

                      {/* CART ITEMS LIST */}
                      {this.state.cartProducts.length > 0 ? (
                      <div className='cart_wrapitems_list'>
                        {this.state.cartProducts.map((cartProd,index) =>
                           <React.Fragment>
                           {cartProd.type !== 'sauce' && (
                            <div key={index} className='cart_item_box'>
                                {/* DISPLAY RIBBON OFFER*/}
                                {cartProd.offer && ( <span className='cartitembox_offer' title='1 + 1 gratis !' alt='1 + 1 gratis !'>1 + 1</span> )}
                                {/* LOADING EFFECT WHEN INCREASING PIECES */}
                                
                                {cartProd.prodLoading && (
                                <div className='cartitembox_incrsitem_loadingcont'>
                                  <div className='cart_incrload_cont'><div></div><div></div><div></div><div></div></div>
                                </div>
                                )}
                                {cartProd.removeProdLoading && (
                                <div className='cartitembox_incrsitem_loadingcont'>
                                  <div className='cart_incrload_cont'><div></div><div></div><div></div><div></div></div>
                                </div>
                                )}
                                 
                                <img src={cartProd.img} alt=''/>
                                <div className='cartitembox_wrap_det'>
                                  <div className='cartitembox_wrapdet_info'>
                                    <span className='cartitembox_wrapdet_name'>{cartProd.name}</span>
                                    <span className='cartitembox_wrapdet_descr'>
                                      {cartProd.type === 'pizza' ? cartProd.size : cartProd.type === 'other' || cartProd.type === 'dessert' ? cartProd.gr+' gr' : cartProd.type === 'drink' ? cartProd.l+' l' : ''}
                                      {cartProd.type === 'pizza' && ',blat ' +cartProd.height}
                                      {cartProd.type === 'pizza' && cartProd.addedExtraTopping !== undefined ? ( 
                                        <React.Fragment>
                                          {cartProd.addedExtraTopping.map((extopp,ind) => 
                                             <span style={{color: '#48CA5D',fontSize: '13px'}} key={ind}> +{extopp.topping}</span>
                                          )}
                                        </React.Fragment>
                                      ):('')}
                                    </span>
                                    <div className='cartitembox_wrapextopp'>
                                        {cartProd.removedIngr.map((remIngr,ind) =>
                                          <span className='citbox_wrptopp_removedingrtxt' key={ind}>-{remIngr}{ind !== cartProd.removedIngr.length - 1 && ', '}</span>
                                        )}
                                    </div>
                                    <div className='cartitembox_wrapdet_wrappiece'>
                                        <div className='cartitembox_wrapiece_wrapper'>
                                          <span className='cartitembox_piece_decrease_btn' onClick={(e)=>this.handleDecrease(e,cartProd)}><i style={{opacity: cartProd.pieces === 1 ? '0.3' : '1'}} className='fas fa-minus'></i></span>
                                          <span className='cartitembox_piece_number'>{cartProd.pieces}</span>
                                          <span className='cartitembox_piece_increase_btn' onClick={(e)=>this.handleIncrease(e,cartProd)}><i style={{opacity: cartProd.pieces === 20 ? '0.3' : '1'}} className='fas fa-plus'></i></span>
                                        </div>
                                        <div className='cartitembox_wrapdet_remove_icon' onClick={(e) => this.removeCartProd(cartProd,e,index)} title='Elimina'></div>
                                    </div>
                                  </div>
                                  <div className='cartitembox_wrapdet_action'>
                                    <span className='cartitembox_action_remove'>
                                      <span className='cartitembox_action_remove_icon' onClick={(e) => this.removeCartProd(cartProd,e,index)} title='Elimina'></span>
                                    </span>
                                    <span className='cartitembox_action_price'>
                                      <span>{cartProd.totalProdPrice}lei</span>
                                    </span>
                                  </div>
                                </div>
                            </div>
                            )}
                          </React.Fragment>
                        )}
                      </div>
                      ):(
                      <div className='cartitembox_empty_cart'>
                        <span className='cartitembox_empty_cartone'>Coșul tau este gol.</span>
                        <span className='cartitembox_empty_carttwo'>Rasfoiește meniul și vei ce-ți place :)</span>
                      </div>
                      )}

                      {/* ADD PIZZA SAUCE */}

                      {this.props.cartProducts.length > 0 && (
                      <React.Fragment>
                        <span className='cart_items_title cit_sauce '>Adaugă sosuri</span>
                        <div className='cartitems_addpizza_sauce'>
                          {this.props.cartSauces.map((item,ind) =>
                          <div key={ind} id={item.id} className='citems_addsauce_box'>
                            <span className='citems_addsauce_img citems_addsauceimg_redsauce'><img src={item.img} alt=''/></span>
                            <span className='citems_addsauce_name'>{item.sauceName} {item.sauceType.length > 0 && `- ${item.sauceType}`}</span>
                            
                            {item.pieces > 0 ? (
                            <div className='citems_addsauce_piece'>
                                <span className='citems_piece_decrease_btn' onClick={(e) => this.sauceCartIncrDecr(e,ind,item,'decrease')}><i className='fas fa-minus'></i></span>
                                <span className='citems_piece_number'>{item.pieces}</span>
                                <span className='citems_piece_increase_btn' onClick={(e) => this.sauceCartIncrDecr(e,ind,item,'increase')}><i className='fas fa-plus'></i></span>
                            </div>
                            ):(
                            <div className='citems_addsauce_piece citems_addspiec_empt' onClick={(e) => this.sauceCartIncrDecr(e,ind,item,'increase')}>Adauga</div>
                            )}
                            <span className='citems_addsauce_price'>{item.price} lei</span>
                          </div>
                          )}
                        </div>

                        {/* TOTAL CART SUM */}
                        <div className='cart_totalprice_wrap'>
                          <span>Total:</span>
                          <span>{this.props.cartTotalSum} LEI</span>
                        </div>
                      </React.Fragment>
                      )}



                    {/* TOTAL CART SUM */}
                    <div className='cart_actionbuttons_wrap'>
                      <Link to={'/'} tabindex='0' className='cartaction_btn_back'><i className='fas fa-long-arrow-alt-left'></i>Înapoi</Link>
                      {this.props.cartProducts.length > 0 && ( <span className='cartaction_btn_proceed' onClick={()=>this.handleProceedCartBtn()}>Continua</span> )}
                    </div>


                    </div>
                    ):(
                      <DeliveryAddress />
                    )}
                </div>
              </div>
            </div>
    );
  }
}




const Cart = connect(mapStateToProps,mapDispatchToProps)(connectedCart);
export default Cart;

