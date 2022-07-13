import React from 'react';
import '../css/ProductDetails.css';
import { connect             }  from "react-redux";
import { setSignedInUser,setGoogleUserInfo, setOpenProductDetails,setAddToCart,setCartTotalSum } from '../actions';
import { Link,Redirect }        from 'react-router-dom'; 
import { v4 as uuidv4 }         from 'uuid';


const mapStateToProps = state => {
  return {  
          productDetails : state.productDetails,
          cartProducts   : state.cartProducts,
          cartTotalSum   : state.cartTotalSum
        };
};


function mapDispatchToProps(dispatch) {
  return {
         setOpenProductDetails  : bol      => dispatch(setOpenProductDetails(bol)),
         setAddToCart           : prod     => dispatch(setAddToCart(prod)),
         setCartTotalSum        : totalSum => dispatch(setCartTotalSum(totalSum))
        };
}



class connectedProductDetails extends React.Component {

  state = { 
        product             : this.props.productDetails,
        extraTopping        : [{topping:'Mozzarella',img:'https://raw.githubusercontent.com/SIonut0122/fooddelivery/gh-pages/static/media/pizzadel/mozz.jpg',price:'4.00'},{topping:'Bacon',img:'https://raw.githubusercontent.com/SIonut0122/fooddelivery/gh-pages/static/media/pizzadel/bac.png',price:'4.00'},{topping:'Ciuperci',img:'https://raw.githubusercontent.com/SIonut0122/fooddelivery/gh-pages/static/media/pizzadel/mush.png',price:'4.00'}],
        selectedPizzaSize   : '',
        selectedPizzaHeight : 'normal',
        basicProductPrice   : 0,
        removedIngredients  : [],
        addedExtraTopping   :  [],
        cart                : [],
        displayAddNotif     : false,
        addedNotifHoverIn   : false
  }
 
componentDidMount() {

  document.querySelector('body').style.overflowY = 'hidden';
  // Set size pizza state only if product type === 'pizza'
  if(this.state.product !== undefined && this.state.product.type === 'pizza') {
    // Set default size, price and totalProdPrice state
    this.setState({ selectedPizzaSize: this.state.product.price[0].size, basicProductPrice: this.state.product.price[0].price, totalProdPrice: Number(this.state.product.price[0].price) })
  } else if(this.state.product !== undefined && this.state.product.type === 'other') {
    this.setState({ basicProductPrice: Number(this.state.product.price), totalProdPrice: Number(this.state.product.price) })
  } else if(this.state.product !== undefined && this.state.product.type === 'dessert') {
    this.setState({ basicProductPrice: Number(this.state.product.price), totalProdPrice: Number(this.state.product.price) })
  } else if(this.state.product !== undefined && this.state.product.type === 'drink') {
    this.setState({ basicProductPrice: Number(this.state.product.price), totalProdPrice: Number(this.state.product.price) })
  }

}


componentWillUnmount () {
   document.querySelector('body').style.overflowY = 'visible';
}


componentDidUpdate(prevProps) {
  if(this.props.cartProducts !== prevProps.cartProducts) {
    setTimeout(() => {
      this.calculateCartTotalSum(this.props.cartProducts);
    },1400)
  }
}

sizeSelect(e,prodInfo) {
  let value = prodInfo.type,
      prodImg = document.querySelector('#proddet_image'),
      prodImgSize = 230,
      sizeBtns = document.querySelectorAll('.proddet_sizebtn'),
      sizeHeightBtns = document.querySelectorAll('.proddet_sizeheight_btn'),
      mobileSize = window.innerWidth <= 420 ? true : false;

 
    sizeBtns.forEach(el => el.classList.remove('active_sizebtn'));
    e.target.classList.add('active_sizebtn');

    switch(value) {
      case 'small':
      this.setState({ selectedPizzaSize: '25cm',totalProdPrice: prodInfo.price })
      prodImgSize = mobileSize ? 170 : 230;
      // Set normal size type height if pizza size is set to 'small'
      sizeHeightBtns.forEach(el => el.classList.remove('active_sizebtn'));
      document.querySelector('.proddet_sizeheight_btn_normal').classList.add('active_sizebtn');
      this.setState({ selectedPizzaHeight: 'normal' })
      break;
      case 'medium':
      this.setState({ selectedPizzaSize: '30cm',totalProdPrice: prodInfo.price })
      prodImgSize = mobileSize ? 190 : 270;
      break;
      case 'big':
      this.setState({ selectedPizzaSize: '35cm',totalProdPrice: prodInfo.price })
      prodImgSize = mobileSize ? 220 : 300;
      break;
      default:
      this.setState({ selectedPizzaSize: '25cm',totalProdPrice: prodInfo.price })
      prodImgSize = mobileSize ? 170 : 230;
    }
    // Set new size style for the profile image
    prodImg.setAttribute('style', `width:${prodImgSize}px;height:${prodImgSize}px`);

    // RECALCULATE THE PRODUCT TOTAL SUM
    // Loop through the addedextratopping array if is not empty
    if(this.state.addedExtraTopping.length > 0) {
        let toppingTotalPrice = 0,
            exTopp = this.state.addedExtraTopping,
            actualSizePrice = Number(prodInfo.price);
        // Get the total extratopping sum
        for(let i=0;i<exTopp.length;i++) {
          toppingTotalPrice = Number(toppingTotalPrice) + Number(exTopp[i].price); 
        }
        // Get the sum of the totaltopping sum and the actual basic product sum
        let newTotalProdPrice = actualSizePrice + toppingTotalPrice;
        this.setState({ totalProdPrice: newTotalProdPrice })
      }
}


handleIngredientClick(e,target) {

  // Set or disable line-through style to ingredients items text
  if(target.removable) {
    if(e.target.style.textDecoration === 'line-through') {
      e.target.style.textDecoration = 'none';
      if(e.target.nextElementSibling !== null) {
        e.target.nextElementSibling.lastChild.classList.remove('fa-undo');
        e.target.nextElementSibling.lastChild.classList.add('fa-times');
      }
    } else {
      e.target.style.textDecoration = 'line-through';
      if(e.target.nextElementSibling !== null) {
        e.target.nextElementSibling.lastChild.classList.remove('fa-times');
        e.target.nextElementSibling.lastChild.classList.add('fa-undo');
      }
    }
 
 
    let removedIngredients = [...this.state.removedIngredients];
      // If removed ingredients array length  === 0, push item inside array
      if(!removedIngredients.length > 0) {
        removedIngredients.push(target.ingr);
        this.setState({ removedIngredients: removedIngredients })
      // If removed ingredients array length > 0
      } else {
          // If item is found inside array, search and remove
         if(removedIngredients.includes(target.ingr) ) {
            let ingrIndex = removedIngredients.indexOf(target.ingr);
              removedIngredients.splice(ingrIndex,1);
              this.setState({ removedIngredients: removedIngredients })
         } else {
          // If item was not found, push item inside array
          removedIngredients.push(target.ingr);
          this.setState({ removedIngredients: removedIngredients })
         }
      }
    }
}

handleSizeHeightBtn(e,type) {

  let sizeHeightBtns = document.querySelectorAll('.proddet_sizeheight_btn');
  // Select height type only for medium and big sizes
  if(this.state.selectedPizzaSize === '30cm' || this.state.selectedPizzaSize === '35cm') {
    // Remove all type height styles and add active btn style for clicked btn
    sizeHeightBtns.forEach(el => el.classList.remove('active_sizebtn'));
    e.target.classList.add('active_sizebtn');

    switch(type) {
      case 'Normal':
      this.setState({ selectedPizzaHeight: 'normal' })
      break;
      case 'Subtire':
      this.setState({ selectedPizzaHeight: 'subtire' })
      break;
      default:
      this.setState({ selectedPizzaHeight: 'normal' })
    }
  }
}


handleAddTopExtra(e,extopping) {
  let iChar = e.target.lastChild;
  // Change btn background color
  e.target.classList.toggle('prodd_topextradded');
  
  let updatedTotalPrice = this.state.totalProdPrice;
  // Change btn icon
  if(iChar.classList.contains('fa-plus')) {
      iChar.classList.add('fa-check');
      iChar.classList.remove('fa-plus');

      // If totalProdPrice was not created, use the default lower price to recalculate after adding new topping/extra new topping
      if(this.state.totalProdPrice !== undefined) {
        // Use already defined totalPrice + clicked topping price
        updatedTotalPrice = Number(this.state.totalProdPrice) + Number(extopping.price);
      } else {
        // Use lower default price product price - clicked topping price
        updatedTotalPrice = Number(this.state.product.price[0].price) + Number(extopping.price);
      }
      // Update new totalprice after has been calculated
      this.setState({ totalProdPrice: updatedTotalPrice })
  } else {
      iChar.classList.add('fa-plus');
      iChar.classList.remove('fa-check');
      //  totalPrice - removed topping price
      updatedTotalPrice = (Number(updatedTotalPrice) - Number(extopping.price).toFixed(2));
      // Update new totalprice after has been calculated
      this.setState({ totalProdPrice: updatedTotalPrice })
  }

  // Add new topping to the list
  let addedExtraTopping = [...this.state.addedExtraTopping];
      // If removed topping array length  === 0, push item inside array
      if(!addedExtraTopping.length > 0) {
        addedExtraTopping.push(extopping);
        this.setState({ addedExtraTopping: addedExtraTopping })
      // If removed topping array length > 0
      } else {
          // If item is found inside array, search and remove
         if(addedExtraTopping.includes(extopping) ) {
            let extoppingIndex = addedExtraTopping.indexOf(extopping);
              addedExtraTopping.splice(extoppingIndex,1);
              this.setState({ addedExtraTopping: addedExtraTopping }, () => {
                // If addextratopping array is empty, set totalProdPrice to undefined
                if(!addedExtraTopping.length > 0) {
                   this.setState({ totalProdPrice: undefined })
                }
              })
         } else {
          // If item was not found, push item inside array
          addedExtraTopping.push(extopping);
          this.setState({ addedExtraTopping: addedExtraTopping })
         }
      }
}
 

// ADD PRODUCT TO CART
handleAddProdToCartBtn(e) {
  let cartProd = [...this.props.cartProducts];


  if(this.state.product !== undefined) {
    let product = this.state.product;
 

    switch(product.type) {
      case 'pizza':
      
       class newPizza {
        constructor(id,img,type,name,size,height,topping,removedIngr,basicProdPrice,totalProdPrice,addedExtraTopping,offer) {
            this.id = id;
            this.img = img;
            this.pieces = 1;
            this.type = type;
            this.name = name;
            this.size = size;
            this.height = height;
            this.topping = topping;
            this.removedIngr = removedIngr;
            this.totalProdPrice = totalProdPrice;
            this.basicProductPrice = basicProdPrice;
            this.addedExtraTopping  = addedExtraTopping;
            this.offer = offer !== undefined ? offer : false;
        }
      }
      let addNewPizza = new newPizza(product.id,product.img,product.type,product.prodName,this.state.selectedPizzaSize,this.state.selectedPizzaHeight,this.state.addedExtraTopping,this.state.removedIngredients,this.state.basicProductPrice,this.state.totalProdPrice,this.state.addedExtraTopping,product.offer);
        // Set productFound to false, and proceed to see if product is found inside the cart
        let productFound = false;

        // IF CART IS EMPTY, ADD PRODUCT
        if(cartProd.length === 0) {
          // Set default prod price
          addNewPizza.totalProdPrice = parseFloat(this.state.totalProdPrice).toFixed(2);
          addNewPizza.basicProductPrice = parseFloat(this.state.totalProdPrice).toFixed(2);
          cartProd.push(addNewPizza);
          this.props.setAddToCart({ cartProducts: cartProd })
        } else {
          // Loop through cart products to see if addec product is not already inside the cart
          for(let i=0;i<cartProd.length;i++) {
            // Compare all proprierties from card products with type === 'pizza' with the new added product item
            if(cartProd[i].type === 'pizza') {
              if(cartProd[i].id === product.id) {
                if(cartProd[i].size === this.state.selectedPizzaSize) {
                  if(cartProd[i].height === this.state.selectedPizzaHeight) {
                    // Compare existing cart topping array items with the state product
                    let addedExtraToppingCart  = cartProd[i].topping.map(el => el.topping.toLowerCase()).sort();
                    let addedExtraToppingState = this.state.addedExtraTopping.map(el => el.topping.toLowerCase()).sort();
                    if(JSON.stringify(addedExtraToppingCart) == JSON.stringify(addedExtraToppingState)) {

                      // Compare existing cart removedIngredients array items with the state product
                      let removedIngredientsCart  = cartProd[i].removedIngr.map(el => el.toLowerCase()).sort();
                      let removedIngredientsState = this.state.removedIngredients.map(el => el.toLowerCase()).sort();
                      if(JSON.stringify(removedIngredientsCart) == JSON.stringify(removedIngredientsState)) {
                        // If all conditions passes the test, set productFound to true and increase clicked product by one
                        productFound = true;
                        // Increase existing product piece item by one
                        cartProd[i].pieces = cartProd[i].pieces + 1;
                        // Recalculate normal product price multiplied by pieces number
                        let calcTotalProdPrice = cartProd[i].basicProductPrice * cartProd[i].pieces;
                        cartProd[i].totalProdPrice = parseFloat(calcTotalProdPrice).toFixed(2);
                        

                        // Set new identification unque id
                        let getRandomUniqueId = uuidv4();
                        cartProd[i].uniqueId = getRandomUniqueId;

                        this.props.setAddToCart({ cartProducts: cartProd })
                      }
                    }
                   }
                 }
               } 
             }
           }
           // If product was not found inside cart, add it
            if(!productFound) {
              // Set default prod price
              addNewPizza.totalProdPrice = parseFloat(this.state.totalProdPrice).toFixed(2);
              addNewPizza.basicProductPrice = parseFloat(this.state.totalProdPrice).toFixed(2);
              cartProd.push(addNewPizza);
              this.props.setAddToCart({ cartProducts: cartProd })
           }
         }

         this.calculateCartTotalSum();
         break;
         case 'other':
            let otherProductFound = false;
             class newOther {
              constructor(id,img,type,name,gr,descr,basicProdPrice,totalProdPrice,topping,removedIngr,addedExtraTopping,offer) {
                  this.id = id;
                  this.img = img;
                  this.pieces = 1;
                  this.type = type;
                  this.name = name;
                  this.gr = gr;
                  this.totalProdPrice = totalProdPrice;
                  this.basicProductPrice = basicProdPrice;
                  this.topping = topping;
                  this.removedIngr = removedIngr;
                  this.addedExtraTopping  = addedExtraTopping;
                  this.offer = offer !== undefined ? offer : false;
              }
            }

            let newOtherProduct = new newOther(product.id,product.img,product.type,product.prodName,product.gr,product.descr,product.price,product.price,[],[],[],product.offer);

             // IF CART IS EMPTY, ADD PRODUCT
            if(cartProd.length === 0) {
              // Set default prod price
              newOtherProduct.totalProdPrice = parseFloat(this.state.totalProdPrice.toFixed(2));
              cartProd.push(newOtherProduct);
              this.props.setAddToCart({ cartProducts: cartProd })
            } else {
                for(let i=0;i<cartProd.length;i++) {
                    if(cartProd[i].type === 'other') {
                      if(cartProd[i].id === product.id) {
                          if(cartProd[i].gr === product.gr) {
                              // Set found product to true
                              otherProductFound = true;
                              // Increase pieces
                              cartProd[i].pieces = cartProd[i].pieces + 1; 
                              // Recalculate normal product price multiplied by pieces number
                              let calcTotalProdPrice = cartProd[i].basicProductPrice * cartProd[i].pieces;
                              cartProd[i].totalProdPrice = parseFloat(calcTotalProdPrice).toFixed(2);
                              // Set new identification unque id
                              let getRandomUniqueId = uuidv4();
                              cartProd[i].uniqueId = getRandomUniqueId;
                              this.props.setAddToCart({ cartProducts: cartProd })
                          }
                      }
                    }
                }

                   // If product was not found inside cart, add it
                  if(!productFound) {
                    // Set default prod price
                    newOtherProduct.totalProdPrice = product.price;
                    cartProd.push(newOtherProduct);
                    this.props.setAddToCart({ cartProducts: cartProd })
                  }
              }
              
              
              break;
              case 'drink':
               let drinkProductFound = false;
              class newDrink {
              constructor(id,img,type,name,l,basicProdPrice,totalProdPrice,topping,removedIngr,addedExtraTopping,offer) {
                  this.id = id;
                  this.img = img;
                  this.pieces = 1;
                  this.type = type;
                  this.name = name;
                  this.l = l;
                  this.totalProdPrice = totalProdPrice;
                  this.basicProductPrice = basicProdPrice;
                  this.topping = topping;
                  this.removedIngr = removedIngr;
                  this.addedExtraTopping  = addedExtraTopping;
                  this.offer = offer !== undefined ? offer : false;
              }
            }
            
             let newDrinkProduct = new newDrink(product.id,product.img,product.type,product.prodName,product.l,product.price,product.price,[],[],[],product.offer);

             // IF CART IS EMPTY, ADD PRODUCT
            if(cartProd.length === 0) {
              // Set default prod price
              newDrinkProduct.totalProdPrice = Number(this.state.totalProdPrice.toFixed(2));
              cartProd.push(newDrinkProduct);
              this.props.setAddToCart({ cartProducts: cartProd })
            } else {
                for(let i=0;i<cartProd.length;i++) {
                    if(cartProd[i].type === 'drink') {
                      if(cartProd[i].id === product.id) {
                          if(cartProd[i].l === product.l) {
                              // Set found product to true
                              drinkProductFound = true;
                              // Increase pieces no
                              cartProd[i].pieces = cartProd[i].pieces + 1; 
                              // Recalculate normal product price multiplied by pieces number
                              let calcTotalProdPrice = cartProd[i].basicProductPrice * cartProd[i].pieces;
                              cartProd[i].totalProdPrice = parseFloat(calcTotalProdPrice).toFixed(2);
                              // Set new identification unque id
                              let getRandomUniqueId = uuidv4();
                              cartProd[i].uniqueId = getRandomUniqueId;
                              this.props.setAddToCart({ cartProducts: cartProd })
                          }
                      }
                    }
                }

                   // If product was not found inside cart, add it
                  if(!drinkProductFound) {
                    // Set default prod price
                    newDrinkProduct.totalProdPrice = product.price;
                    cartProd.push(newDrinkProduct);
                    this.props.setAddToCart({ cartProducts: cartProd })
                  }
              }

              break;
              case 'dessert':
               let dessertProductFound = false;
              class newDessert {
              constructor(id,img,type,name,gr,basicProdPrice,totalProdPrice,topping,removedIngr,addedExtraTopping,offer) {
                  this.id = id;
                  this.img = img;
                  this.pieces = 1;
                  this.type = type;
                  this.name = name;
                  this.gr = gr;
                  this.totalProdPrice = totalProdPrice;
                  this.basicProductPrice = basicProdPrice;
                  this.topping = topping;
                  this.removedIngr = removedIngr;
                  this.addedExtraTopping  = addedExtraTopping;
                  this.offer = offer !== undefined ? offer : false;
              }
            }
            
             let newDessertProduct = new newDessert(product.id,product.img,product.type,product.prodName,product.gr,product.price,product.price,[],[],[],product.offer);

             // IF CART IS EMPTY, ADD PRODUCT
            if(cartProd.length === 0) {
              // Set default prod price
              newDessertProduct.totalProdPrice = Number(this.state.totalProdPrice.toFixed(2));
              cartProd.push(newDessertProduct);
              this.props.setAddToCart({ cartProducts: cartProd })
            } else {
                for(let i=0;i<cartProd.length;i++) {
                    if(cartProd[i].type === 'dessert') {
                      if(cartProd[i].id === product.id) {
                          if(cartProd[i].gr === product.gr) {
                              // Set found product to true
                              dessertProductFound = true;
                              // Increase pieces no
                              cartProd[i].pieces = cartProd[i].pieces + 1; 
                              // Recalculate normal product price multiplied by pieces number
                              let calcTotalProdPrice = cartProd[i].basicProductPrice * cartProd[i].pieces;
                              cartProd[i].totalProdPrice = parseFloat(calcTotalProdPrice).toFixed(2);
                              // Set new identification unque id
                              let getRandomUniqueId = uuidv4();
                              cartProd[i].uniqueId = getRandomUniqueId;
                              this.props.setAddToCart({ cartProducts: cartProd })
                          }
                      }
                    }
                }

                   // If product was not found inside cart, add it
                  if(!dessertProductFound) {
                    // Set default prod price
                    newDessertProduct.totalProdPrice = Number(this.state.totalProdPrice.toFixed(2));
                    cartProd.push(newDessertProduct);
                    this.props.setAddToCart({ cartProducts: cartProd })
                  }
              }
             
              break;
              default:
              console.log('');
       }

        this.setState({ displayAddNotif: true })
       // Set addtocart style btn opacity to 0.5 after click
       e.target.setAttribute('style','opacity:0.5;pointer-events:none');
       // Remove addtocart style btn opacity after 1.4sec
       setTimeout(() => {
        if(document.querySelector('.proddet_addtocart_btn')) {
          document.querySelector('.proddet_addtocart_btn').removeAttribute('style');
        }
       },1400);
    }


        
          if(this.state.displayAddNotif && !this.state.addedNotifHoverIn) {
            this.setState({ displayAddNotif: false })
            setTimeout(() => {
              this.setState({ displayAddNotif: true })
            },1000);
          } 
               
 
}



calculateCartTotalSum() {
    let prices = [];
    // If cart products is not empty, collect al totalPrices and get the sum
    if(this.props.cartProducts.length > 0) {
    this.props.cartProducts.map(cartProd => prices.push(parseFloat(cartProd.totalProdPrice)));
    // return total cart products sum
    let getTheCartSum = prices.reduce((a,b) => a + b);
    // Convert cart sum to decimals
    let convertCartSum  = getTheCartSum.toFixed(2);
    this.props.setCartTotalSum({ cartTotalSum: convertCartSum})
  }
}








  render() { 

    let product = this.state.product;
    let totalSumBtn = Number(this.state.totalProdPrice === undefined ? this.state.basicProductPrice : this.state.totalProdPrice);
    return (
      
            <div>
              <div className='productdetails_container'>
                  <div className='productdetails_wrapper'>
                  {product.offer && (
                  <div className='ribbon_proddet ribbon-top-left'>
                    <span>1 + 1</span>
                  </div>
                  )}
                  <span className='proddet_close_btn' onClick={() => { this.props.setOpenProductDetails({ openProductDetails: false })}} ><i className='fas fa-times'></i></span>
                    
                    {/* PIZZA CONTAINER */}

                    {product !== undefined && product.type === 'pizza' && (
                    <div className='proddet_wrap_pizzacont'>
                      <div className='proddet_wrap_image'>
                        <img id='proddet_image' src={product.img} alt=''/>
                      </div>

                      <div className='proddet_wrap_info'>
                        <div className='proddet_wrap_ingrinfo'>
                          <span className='proddet_wrap_prodname'>{product.prodName}</span>
                          <span className='proddet_wrap_prodsizetxtno'>{this.state.selectedPizzaSize},blat {this.state.selectedPizzaHeight}</span>
                          <div className='proddet_wrap_ingredients'>
                            {/* PRODUCT INGREDIENTS */}
                            {product.ingredients.map((ingred,index) =>
                            <span key={index} className='proddet_ingr_item'>
                              <span className='proddet_ingritem_name' onClick={(e) => this.handleIngredientClick(e,ingred)}>{ingred.ingr}</span>
                              {ingred.removable && <span className='proddet_removeitem_icon'><i className='fas fa-times proddet_i_x'></i></span>}
                              {index !== product.ingredients.length - 1 && ','}
                            </span>
                            )}
                            {/* ADD EXTRA / TOPPING */}
                            {this.state.addedExtraTopping.length > 0 && this.state.addedExtraTopping.map((extopping,index) =>
                            <span key={index} className='proddet_ingr_item'> 
                              <span tabindex='0' className='proddet_extopp_item' onClick={(e) => this.handleIngredientClick(e,extopping)}>&nbsp;{'+ '+extopping.topping}</span>
                            </span>
                            )}
                          </div>
                        </div>

                        {/* Product size and height wrappers */}
                       
                            <div className='proddet_wrap_size'>
                              {product.price.map((price,index) =>
                              <span key={index} 
                                    className={'proddet_sizebtn ' + (index === 0 && 'active_sizebtn')}
                                    onClick={(e) => this.sizeSelect(e,price)}
                                    tabindex='0'>
                                    {price.type === 'small' ? 'Mica' : price.type === 'medium' ? 'Medie' : price.type === 'big' ? 'Mare' : ''}
                              </span>
                              )}
                            </div>

                            <div className='proddet_wrap_sizeheight'>
                              <span tabindex='0' className='proddet_sizeheight_btn active_sizebtn proddet_sizeheight_btn_normal' onClick={(e) => this.handleSizeHeightBtn(e,'Normal')}>Normal</span>
                              <span tabindex='0' className='proddet_sizeheight_btn' onClick={(e) => this.handleSizeHeightBtn(e,'Subtire')}>Subtire</span>
                            </div>

                            {/* Product add topping/extra */}

                             <div className='proddet_wrap_toppextra'>
                              {this.state.extraTopping.map((extopping,index) =>
                              <div key={index} className='prodd_toppextra_box'>
                                <span className='prodd_toppextra_img'><img src={extopping.img} alt=''/></span>
                                <span className='prodd_toppextra_name'>{extopping.topping}</span>
                                <div className='prodd_toppextra_action'>
                                  <span className='prodd_toppextra_price'>{extopping.price}</span>
                                  <span className='prodd_toppextra_addprodbtn' tabindex='0' onClick={(e) => this.handleAddTopExtra(e,extopping)}><i className='fas fa-plus'></i></span>
                                </div>
                              </div>
                              )}
                             </div>

                      
                          {/* Product added to cart notification */}
                          <div className='proddet_addedtocart_notf'>
                            {this.state.displayAddNotif && (
                            <div className='proddet_addedtocart_notf_wrap'>
                              <span>Produsul a fost adaugat in cos</span>
                              <Link to={'/cart'} tabindex='0'><i className='fas fa-shopping-cart'></i> Cosul meu</Link>
                            </div>
                            )}   
                          </div>  
                          {/* Product add to cart button */}
                          <div className='proddet_addtocart_btn' tabindex='0' onClick={(e)=>this.handleAddProdToCartBtn(e)}>Adauga pentru {totalSumBtn.toFixed(2)} lei</div>
            </div>
              
                  </div>
                    )}
                    
                    {/* OTHER PRODUCTS */}

                    {product !== undefined && product.type === 'other' && (
                      <div className='proddet_wrap_othercont'>
                        <div className='proddet_wrap_image_other'>
                          <img src={product.img} alt=''/>
                        </div>

                        <div className='proddet_wrap_info_other'>
                          <span className='proddet_wother_name'>{product.prodName}</span>
                          <span className='proddet_wother_quant'>{product.gr}gr</span>
                          <span className='proddet_wother_descr'>{product.descr}</span>

                        {/* Product added to cart notification */}
                        <div className='proddet_addedtocart_notf' style={{margin: '25px 0 -110px 0'}}>
                          {this.state.displayAddNotif && (
                          <div className='proddet_addedtocart_notf_wrap'>
                            <span>Produsul a fost adaugat in cos</span>
                            <Link to={'/cart'} tabindex='0'><i className='fas fa-shopping-cart'></i> Cosul meu</Link>
                          </div>
                          )}   
                        </div>  
                        {/* Product add topping/extra */}
                        <div className='proddet_addtocart_btn proddet_addtocartbtn_other' tabindex='0' onClick={(e)=>this.handleAddProdToCartBtn(e)}>Adauga pentru {Number(product.price).toFixed(2)} lei</div>
                        </div>

                      </div>
                    )}

                    {/* DRINK PRODUCTS */}

                    {product !== undefined && product.type === 'drink' && (
                      <div className='proddet_wrap_othercont' style={{paddingTop: '20px'}}>
                        <div className='proddet_wrap_image_other'>
                          <img src={product.img} alt=''/>
                        </div>

                        <div className='proddet_wrap_info_other'>
                          <span className='proddet_wother_name'>{product.prodName}</span>
                          <span className='proddet_wother_quant'>{product.l}l</span>

                        {/* Product added to cart notification */}
                        <div className='proddet_addedtocart_notf' style={{margin: '25px 0 -110px 0'}}>
                          {this.state.displayAddNotif && (
                          <div className='proddet_addedtocart_notf_wrap'>
                            <span>Produsul a fost adaugat in cos</span>
                            <Link to={'/cart'} tabindex='0'><i className='fas fa-shopping-cart'></i> Cosul meu</Link>
                          </div>
                          )}   
                        </div> 

                        {/* Product add topping/extra */}
                        <div className='proddet_addtocart_btn proddet_addtocartbtn_other' tabindex='0' onClick={(e)=>this.handleAddProdToCartBtn(e)}>Adauga pentru {Number(product.price).toFixed(2)} lei</div>
                        </div>

                      </div>
                    )}

                   {/* DESSERT PRODUCTS */}

                    {product !== undefined && product.type === 'dessert' && (
                      <div className='proddet_wrap_othercont' style={{paddingTop: '20px'}}>
                        <div className='proddet_wrap_image_other'>
                          <img src={product.img} alt=''/>
                        </div>

                        <div className='proddet_wrap_info_other'>
                          <span className='proddet_wother_name'>{product.prodName}</span>
                          <span className='proddet_wother_quant'>{product.gr} gr</span>
                          <span className='proddet_wother_descr'>{product.descr}</span>

                        {/* Product added to cart notification */}
                        <div className='proddet_addedtocart_notf' style={{margin: '25px 0 -110px 0'}}>
                          {this.state.displayAddNotif && (
                          <div className='proddet_addedtocart_notf_wrap'>
                            <span>Produsul a fost adaugat in cos</span>
                            <Link to={'/cart'} tabindex='0'><i className='fas fa-shopping-cart'></i> Cosul meu</Link>
                          </div>
                          )}   
                        </div>
                        
                        {/* Product add topping/extra */}
                        <div className='proddet_addtocart_btn proddet_addtocartbtn_other' tabindex='0' onClick={(e)=>this.handleAddProdToCartBtn(e)}>Adauga pentru {Number(product.price).toFixed(2)} lei</div>
                        </div>

                      </div>
                    )}

                  </div>
              </div>
            </div>
    );
  }
}




const ProductDetails = connect(mapStateToProps,mapDispatchToProps)(connectedProductDetails);
export default ProductDetails;

