import React from 'react';
import '../css/ProductsContainer.css';
import products                 from '../js/products';
import { connect             }  from 'react-redux';
import { setOpenProductDetails,setProductDetails } from '../actions';
 


const mapStateToProps = state => {
  return {  
          productDetails : state.productDetails,
          cartTotalSum   : state.cartTotalSum,
        };
};


function mapDispatchToProps(dispatch) {
  return {
         setOpenProductDetails : bol    => dispatch(setOpenProductDetails(bol)),
         setProductDetails     : obj    => dispatch(setProductDetails(obj))
        };
}



class connectedProductsContainer extends React.Component {

  state = {
       products: products,
  }
  
  componentDidMount() {
      // Scroll to top on every mount
  window.scrollTo(0, 0);


  }

 selectThisProduct(product) {
 
  this.props.setProductDetails({ productDetails: product })
  setTimeout(() => {
    this.props.setOpenProductDetails({ openProductDetails: true })
  },200);
  // Scroll into view product wrapper details
  setTimeout(() => {
    if(document.querySelector('.productdetails_wrapper')) {
    document.querySelector('.productdetails_wrapper').scrollIntoView({behavior: "smooth"});
    }
  },250);
  
 }

  render() { 
    return (
      
            <div>
              <div className='productscontainer_container'>
                <span className='wprodcont_prod_title wprodcont_prodtitle_pizza'>Pizza</span>
                <div className='wrap_products_container'>

                  {/* PIZZA SECTION */}

                  {this.state.products.map((prod,ind) => 
                     <React.Fragment>
                      {prod.type === 'pizza' && (
                    <div key={ind} className='p_prod_item_box'>
                      <span className='p_prod_wrapimgprofile' style={{overflow:'visible'}}>
                      {prod.offer && (
                      <div className='ribbon ribbon-top-left'>
                        <span>1 + 1</span>
                      </div>
                      )}
                      <img className='p_prod_imgprofile' 
                           src={prod.img}
                           alt=''
                           onClick={(e) => this.selectThisProduct(prod)}
                           tabindex='0'
                           />
                      </span>
                      <div className='p_proditembox_info'>
                        <span className='p_proditembox_info_name'>{prod.prodName}</span>
                        <span className='p_proditembox_info_descr'>{prod.ingredients.map((ing,ind) => <i key={ind}>{ing.ingr}{ind + 1 !== prod.ingredients.length ? ',' : ''}</i>)}</span>
                      </div>

                      <div className='p_proditembox_inpbtn'>
                        <span className='pproditembox_price'>de la {prod.price[0].price} lei</span>
                        <div className='pprodbox_inptbn_select_btn' tabindex='0' onClick={(e) => this.selectThisProduct(prod)}>Alege</div>
                      </div>
                    </div>
                      )}
                    </React.Fragment>
                    )}
                </div>

                {/* GUSTARI / SNACKS */}
                <span className='wprodcont_prod_title wprodcont_prodtitle_snacks'>Gustari</span>
                <div className='wrap_products_container'>
                  {this.state.products.map((otherProd,ind) => 
                     <React.Fragment>
                      {otherProd.type === 'other' && (
                      <div key={ind} className='p_prod_item_box p_prod_itembox_snack'>
                       <span className='p_prod_wrapimgprofile'>
                       {otherProd.offer && (
                       <div className='ribbon ribbon-top-left'>
                        <span>1 + 1</span>
                       </div>
                       )}
                       <img className='p_prod_imgprofile' 
                           src={otherProd.img} 
                           alt=''
                           onClick={() => this.selectThisProduct(otherProd)}
                           tabindex='0'
                           />
                        </span>
                      <span className='snacks_gr_txt'>{otherProd.gr} gr</span>
                      <div className='p_proditembox_info'>
                        <span className='p_proditembox_info_name'>{otherProd.prodName}</span>
                        <span className='p_proditembox_info_descr'>{otherProd.descr.length >= 88 ? otherProd.descr.slice(0,88)+'...' : otherProd.descr}</span>
                      </div>

                      <div className='p_proditembox_inpbtn'>
                        <span className='pproditembox_price pprod_itemboxprice_dessert'>{otherProd.price} lei</span>
                        <div className='pprodbox_inptbn_select_btn' onClick={(e) => this.selectThisProduct(otherProd)}>Alege</div>
                      </div>
                    </div>
                      )}
                    </React.Fragment>
                    )}
                </div>


                {/* DESSERTS */}
                <span className='wprodcont_prod_title wprodcont_prodtitle_dessert'>Deserturi</span>
                <div className='wrap_products_container'>
                  {this.state.products.map((dessertProd,ind) => 
                     <React.Fragment>
                      {dessertProd.type === 'dessert' && (
                      <div key={ind} className='p_prod_item_box p_prod_itembox_dessert'>
                       <span className='p_prod_wrapimgprofile'>
                       {dessertProd.offer && (
                       <div className='ribbon ribbon-top-left'>
                        <span>1 + 1</span>
                       </div>
                       )}
                       <img className='p_prod_imgprofile' 
                           src={dessertProd.img} 
                           alt=''
                           onClick={() => this.selectThisProduct(dessertProd)}
                           tabindex='0'
                           />
                        </span>
                      <div className='p_proditembox_info'>
                        <span className='p_proditembox_info_name'>{dessertProd.prodName}</span>
                        <span className='p_proditembox_info_descr'>{dessertProd.descr.length >= 88 ? dessertProd.descr.slice(0,88)+'...' : dessertProd.descr}</span>
                      </div>

                      <div className='p_proditembox_inpbtn'>
                        <span className='pproditembox_price'>{dessertProd.price} lei</span>
                        <div className='pprodbox_inptbn_select_btn' onClick={(e) => this.selectThisProduct(dessertProd)}>Alege</div>
                      </div>
                    </div>
                      )}
                    </React.Fragment>
                    )}
                </div>

                {/* DRINKS */}
                <span className='wprodcont_prod_title wprodcont_prodtitle_drinks'>Bauturi</span>
                <div className='wrap_products_container'>
                  {this.state.products.map((drinkProd,ind) => 
                     <React.Fragment>
                      {drinkProd.type === 'drink' && (
                      <div key={ind} className='p_prod_item_box p_prod_itembox_drinks'>
                       <span className='p_prod_wrapimgprofile'>
                       {drinkProd.offer && (
                       <div className='ribbon ribbon-top-left'>
                        <span>1 + 1</span>
                       </div>
                       )}
                       <img className='p_prod_imgprofile' 
                           src={drinkProd.img} 
                           alt=''
                           onClick={() => this.selectThisProduct(drinkProd)}
                           tabindex='0'
                           />
                        </span>
                      <div className='p_proditembox_info'>
                        <span className='p_proditembox_info_name'>{drinkProd.prodName}</span>
                        <span className='p_proditembox_info_descr'>{drinkProd.l} ml</span>
                      </div>

                      <div className='p_proditembox_inpbtn'>
                        <span className='pproditembox_price'>{drinkProd.price} lei</span>
                        <div className='pprodbox_inptbn_select_btn' onClick={(e) => this.selectThisProduct(drinkProd)}>Alege</div>
                      </div>
                    </div>
                      )}
                    </React.Fragment>
                    )}
                </div>
              </div>
            </div>
    );
  }
}

const ProductsContainer = connect(mapStateToProps,mapDispatchToProps)(connectedProductsContainer);
export default ProductsContainer;
 

