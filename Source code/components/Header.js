import React from 'react';
import '../css/Header.css';
import { connect             }  from "react-redux";
import { setSigninContainer, setSignedInUser,
         setGoogleUserInfo,setAddToCart,
         setCartTotalSum, setDefDisplayname } from '../actions';
import { Link,Redirect  }                     from 'react-router-dom'; 
import { browserHistory }                     from 'react-router';





const mapStateToProps = state => {
  return {  
        openSigninContainer   : state.openSigninContainer,
        signedInUser          : state.signedInUser,
        googleUserInfo        : state.googleUserInfo,
        cartProducts          : state.cartProducts,
        cartTotalSum          : state.cartTotalSum,
        profileDefDisplayname : state.profileDefDisplayname
        };
};


function mapDispatchToProps(dispatch) {
  return {
        setSigninContainer : bol      => dispatch(setSigninContainer(bol)),
        setSignedInUser    : bol      => dispatch(setSignedInUser(bol)),
        setGoogleUserInfo  : obj      => dispatch(setGoogleUserInfo(obj)),
        setAddToCart       : prod     => dispatch(setAddToCart(prod)),
        setCartTotalSum    : totalSum => dispatch(setCartTotalSum(totalSum)),
        setDefDisplayname  : str      => dispatch(setDefDisplayname(str)),
        };
}


class connectedHeader extends React.Component {

    state = {
      headerAppMobile       : true,
      moreMenuBtnHover      : false,
      moreDropdownMenuHover : false,
      openMobileMenu        : false,
      cartDropdownIconHover : false,
      cartDropdownHover     : false,
      hdropReachedBottom    : false,
      scrollDisplayAvatar   : true,
      hiddenCartDetails     : false,
      profileDefDisplayname : this.props.profileDefDisplayname

    }


componentDidMount() {
  // Listen to window resize
  window.addEventListener('resize', (e) => this.handleHeaderResize(e));
  window.addEventListener('scroll', (e) => this.handleScroll(e));
  // Check for signed in user
  this.authListener();

  // Add click event to all header menu buttons
  let hlinksmenu = document.querySelectorAll('.hlinkmen_a');
  for(let i=0; i<hlinksmenu.length;i++) {
   hlinksmenu[i].addEventListener('click', (e) => this.handleMenuLink(e));
  }

  // Check for localstorage user profile data
  if (window.localStorage.getItem('userProfileData') !== null) {
      let userProfileData = JSON.parse(localStorage.getItem('userProfileData'));
      this.props.setDefDisplayname({ profileDefDisplayname: userProfileData.profileName })
  }

  // Handle focus outline on mouse / keyboard
    document.body.addEventListener('mousedown', function() {
      document.body.classList.add('using-mouse');
    });
    document.body.addEventListener('keydown', function() {
      document.body.classList.remove('using-mouse');
    });

  // Check localStorage saved value to display or not the header app mobile
  if (window.localStorage.getItem('headerAppMobOff') !== null) {
    // If saved value exists, hide header app mobile
     this.setState({ headerAppMobile: false })
  }
}


handleMenuLink(e) {
  switch(e.target.innerHTML.toLowerCase()) {
    case 'pizza':
    setTimeout(() => {
    document.querySelector('.wprodcont_prodtitle_pizza').scrollIntoView({behavior: "smooth",block: "center"});
    },300)
    break;
    case 'bauturi':
    setTimeout(() => {
    document.querySelector('.wprodcont_prodtitle_drinks').scrollIntoView({behavior: "smooth",block: "center"});
    },300);
    break;
    case 'desert':
    setTimeout(() => {
    document.querySelector('.wprodcont_prodtitle_dessert').scrollIntoView({behavior: "smooth",block: "center"});
    },300);
    break;
    case 'gustari':
    setTimeout(() => {
    document.querySelector('.wprodcont_prodtitle_snacks').scrollIntoView({behavior: "smooth",block: "center"});
    },300);
    break;
    default:
    console.log('');
  }
}

 
componentDidUpdate(prevProps) {
 if(this.state.profileDefDisplayname !== prevProps.profileDefDisplayname) {
  this.setState({ profileDefDisplayname: this.props.profileDefDisplayname })
 }
}

authListener() {
 
      // if user is logged in, set state user to user and use the data
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.props.setSignedInUser({ signedInUser: true })
          this.props.setGoogleUserInfo({ googleUserInfo: user })
       } else { 
          this.props.setSignedInUser({ signedInUser: false })
          this.props.setGoogleUserInfo({ googleUserInfo: null })
      }
    });
}

handleScroll() {
  // Classes to be hide
  let headerElements = ['.header_right_logo_box','.hcont_halftwo_sectone_firsthalf','.hcont_halftwo_sectone_sechalf','.head_logo_icon','#head_signin_btn'];
  
   // When pageYOffSet is higher than 55 and window innerWidth is higher than 900, change header style ( display short header )
   if(window.pageYOffset > 55 && window.innerWidth > 900) {
      // Add inactive class to every selected dom elements (hide)
      document.querySelector('.header_container').classList.add('inactive_header');
      // Map through all classes and apply inactive head item class to hide all
      for(let i=0; i<headerElements.length;i++) { 
          if(document.contains(document.querySelector(headerElements[i]))) {
            document.querySelector(headerElements[i]).classList.add('inactive_head_item'); 
          }
      }
      // Apply styles to header Dom elements
      document.querySelector('#head_cartdetails_div').style.marginTop = '0';
      document.querySelector('.header_right_menu').style.marginTop = '24px';
      document.querySelector('.head_cont_halftwo_sect_two').style.paddingTop = '0';
      document.querySelector('.head_rightmenu_icon').style.width = '40px';
      document.querySelector('.headrightmenu_dropdown_more').setAttribute('style','right:0');
      // Align cart dropdown menu under the cart icon
      document.querySelector('.hdropdowncart_menu_cont').style.top = '42px';

       if(this.state.scrollDisplayAvatar) {
        this.setState({ scrollDisplayAvatar: false })
       }
        
      if(document.querySelector('#head_cartdetails_div').style.display === 'none') {
        if(!this.state.hiddenCartDetails) {
          this.setState({ hiddenCartDetails: true })
          document.querySelector('.head_cont_halftwo_sect_two').style.flexDirection = 'row';
        }
      }
    

   } else if(window.pageYOffset < 55 && window.innerWidth > 900) {
      // Remove header's inactive class to display header
      document.querySelector('.header_container').classList.remove('inactive_header');
      // Map through all classes and remove inactive head item class to show all dom header elements
      for(let i=0; i<headerElements.length;i++) { 
          if(document.contains(document.querySelector(headerElements[i]))) {
            document.querySelector(headerElements[i]).classList.remove('inactive_head_item'); 
          }
      }
      // Remove applied styles to header Dom elements
      document.querySelector('#head_cartdetails_div').style.marginTop = '10px';
      document.querySelector('.header_right_menu').style.marginTop = '5px';
      document.querySelector('.head_cont_halftwo_sect_two').style.paddingTop = '10px';
      document.querySelector('.head_rightmenu_icon').style.width = '0';
      document.querySelector('.headrightmenu_dropdown_more').setAttribute('style','right:40px');
      // Align cart dropdown menu under the cart icon
      document.querySelector('.hdropdowncart_menu_cont').style.top = '88px';

      if(!this.state.scrollDisplayAvatar) {
        this.setState({ scrollDisplayAvatar: true })
      }

      if(document.querySelector('#head_cartdetails_div').style.display === 'none') {
        if(this.state.hiddenCartDetails) {
          this.setState({ hiddenCartDetails: false })

          document.querySelector('.head_cont_halftwo_sect_two').style.flexDirection = 'column';
        }
      }
    }
}



handleHeaderResize() {
   let  screenWidth = window.innerWidth || document.clientWidth || body.clientWidth;
   // If window width is higher than 900 and mobile dropdown menu is displayed, hide it
   if(screenWidth > 900 && this.state.openMobileMenu) { 
      this.setState({ openMobileMenu: false })
      // Display hamburger icon menu
      if(document.querySelector('.headmobile_hamb_div')) {
       document.querySelector('.headmobile_hamb_div').classList.toggle('hamb_inactive_btn');
       document.querySelector('.headmobile_cart_wrap').classList.toggle('hamb_inactive_btn');
      }
    }
    // Hide cart dropdown menu if screensize is lower than 900px
    if(screenWidth <= 900) {
      if(document.querySelector('.hdropdowncart_menu_cont')) {
      document.querySelector('.hdropdowncart_menu_cont').style.display = 'none';
      }
    }
}

closeHeaderAppMob() {
  // Close header app mobile and save localstorage value for the future   
  this.setState({ headerAppMobile: false})   
  localStorage.setItem('headerAppMobOff', true);
}

/* DROPDOWN MORE MENU */

moreMenuHover() {
  // WHen hovering in, set to true moreMenuBtnHover and display More dropmenu
  this.setState({ moreMenuBtnHover: true })
  // Display more dropdown  menu
  document.querySelector('.headrightmenu_dropdown_more').style.display = 'block'; 
  // Rotate angle
  document.querySelector('.fa-angle-morenav').style.transform = 'rotate(0deg)';
}

moreMenuHoverOut() {
  // When hovering in 'More' menu button
  setTimeout(() => {
    // Leave time to update 'moreMenuBtnHover' to false, and check if cursor is out of the 'More' menu button 
   if(!this.state.moreMenuBtnHover) {
      // Check if 'More' dropmenu is not displayed
      if(!this.state.moreDropdownMenuHover) {
        // And hide more dropdown menu
          // Hide more dropdown  menu
          document.querySelector('.headrightmenu_dropdown_more').style.display = 'none';
          // Rotate angle
          document.querySelector('.fa-angle-morenav').style.transform = 'rotate(-90deg)';
      }
   } 
  },500);
  // Update moreMenuBtnHover to false after hovering out
  this.setState({ moreMenuBtnHover: false })
  
}

moreDropdownMenuIn() {
  // When hovering in 'More' dropmenu
  this.setState({ moreDropdownMenuHover: true })
  // Display more dropdown  menu
  document.querySelector('.headrightmenu_dropdown_more').style.display = 'block';
  // Rotate angle
  document.querySelector('.fa-angle-morenav').style.transform = 'rotate(0deg)';
}

moreDropdownMenuOut() {
  // When hovering out 'More' dropmenu
  this.setState({ moreDropdownMenuHover: false })
  // Hide more dropdown  menu
  document.querySelector('.headrightmenu_dropdown_more').style.display = 'none';
  // Rotate angle
  document.querySelector('.fa-angle-morenav').style.transform = 'rotate(-90deg)';
}


toggleMobDropmenu() {
  // Hide / show mobile 'More' dropdown menu nav
  document.querySelector('.mobmenu_leftnav_moredropdownmenu').classList.toggle('mobmenu_dropdown_active');
}

/* CART DROPMENU */

cartIconHoverIn() {
  // WHen hovering in, set to true cartDropdownIconHover and display Cart dropmenu
  this.setState({ cartDropdownIconHover: true })
  // Display cart dropdown  menu
  document.querySelector('.hdropdowncart_menu_cont').style.display = 'flex';

}

cartIconHoverOut() {
  // When hovering in 'More' menu button
  setTimeout(() => {
    // Leave time to update 'cartDropdownIconHover' to false, and check if cursor is out of the 'Cart' menu button 
   if(!this.state.cartDropdownIconHover) {
      // Check if 'Cart' dropmenu is not displayed
      if(!this.state.cartDropdownHover) {
        // And hide cart dropdown menu
          // Hide cart dropdown  menu
        document.querySelector('.hdropdowncart_menu_cont').style.display = 'none';
      }
   } 
  },500);
  // Update cartDropdownIconHover to false after hovering out
  this.setState({ cartDropdownIconHover: false })
}

cartDropdownHoverIn() {
  // WHen hovering in, set to true cartDropdownHover and display cart dropmenu
  this.setState({ cartDropdownHover: true })
  // Display cart dropdown  menu
  document.querySelector('.hdropdowncart_menu_cont').style.display = 'flex';
}

cartDropdownHoverOut() {   
  // WHen hovering in, set to true cartDropdownHover and display cart dropmenu
  this.setState({ cartDropdownHover: false })
  // Display cart dropdown  menu
  document.querySelector('.hdropdowncart_menu_cont').style.display = 'none';
}


handleOpenMobile() {
  // Toggle state openMobileMenu state
  this.setState({ openMobileMenu: !this.state.openMobileMenu})
  // Show / hide hamburger icon menu
  document.querySelector('.headmobile_hamb_div').classList.toggle('hamb_inactive_btn');
  document.querySelector('.headmobile_cart_wrap').classList.toggle('hamb_inactive_btn');
  // Disable body scrolling
  document.querySelector('body').classList.toggle('body-fixed');

}

handleHeaderSignInBtn() {
  this.props.setSigninContainer({ openSigninContainer: !this.props.openSigninContainer })

  // Close openMobileMenu
  this.setState({ openMobileMenu: false })

  // Enable / disable body scrolling
  if(!this.props.openSigninContainer) {
    document.querySelector('body').style.overflow = 'hidden'; 
  } else {
    document.querySelector('body').style.overflow = 'visible';
  }

}

hdropHandleRemoveProd(index) {
 let cartProducts = [...this.props.cartProducts];
 let removeUsingUniqueId = cartProducts.filter(product => cartProducts.indexOf(product) !== index);
  this.props.setAddToCart({ cartProducts: removeUsingUniqueId })
  // Call function to recalculate total cart sum everytime a product is removed
  this.calculateCartTotalSum(removeUsingUniqueId);
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


handleScrollDropCartCont(e) {
    if(e.target.scrollTop > 475) {
      this.setState({ hdropReachedBottom: true})
    }
    if(e.target.scrollTop > 95) {
      this.setState({ scrollingHdrop: true})
    } else {
      this.setState({ scrollingHdrop: false})
    }
    if(e.target.scrollTop < 400) {
      this.setState({ hdropReachedBottom: false})
    }
} 


handleMobileLinkMenu(e) {
    // Get innerHTML value and click nav button
   switch(e.target.innerHTML.toLowerCase()) {
    case 'pizza':
    document.querySelector('.hlink_a_pizza').click();
    break;
    case 'bauturi':
    document.querySelector('.hlink_a_drinks').click();
    break;
    case 'desert':
    document.querySelector('.hlink_a_dessert').click();
    break;
    case 'gustari':
    document.querySelector('.hlink_a_snacks').click();
    break;
    default:
    console.log('');
  }
  // Call to close mobmenu
  this.handleOpenMobile();
}



  render() {
    
    let cartProducts          = this.props.cartProducts;
    let scrollDownAvatarStyle = {position: 'absolute',left: '-15px',border: 'solid transparent'};
    let scrollUpAvatarStyle   = {position: 'relative',left: '50%',border: 'solid #ff9800'};
    let calculateCardProdPiec        = this.props.cartProducts.length > 0 && this.props.cartProducts.map(el => el.pieces);
    let cartProdLength = this.props.cartProducts.length > 0 ? calculateCardProdPiec.reduce((a,b) => a + b) : 0;

    return (
        <div>
         		<div className='row'>
         			<div className='header_container col-12'>
 
                {/* Right logo */}

                <div className='head_cont_content'>
                  <div className='head_content_half head_content_halfone' >
                    {/* Right logo box */}
                    <div className='header_right_logo_box'>
                      <Link to={'/'} className='header_rightlogobox_icon'></Link>
                      <span className='header_rightlogobox_txt'>Pizza delivery</span>
                    </div>
                    {/* Right menu box */}
                    <div className='header_right_menu'>
                      <Link to={'/'} className='head_rightmenu_icon'></Link>
                      <Link to={'/'} className='hlinkmen_a hlink_a_btn hlink_a_pizza'>PIZZA</Link>
                      <Link to={'/'} className='hlinkmen_a hlink_a_btn hlink_a_drinks'>BAUTURI</Link>
                      <Link to={'/'} className='hlinkmen_a hlink_a_btn hlink_a_dessert'>DESERT</Link>
                      <span 
                        className     = 'headrightmenu_more_nav hlink_a_btn'
                        tabindex      = '0'
                        onMouseMove   = {()=>this.moreMenuHover()}
                        onMouseLeave  = {()=>this.moreMenuHoverOut()}>MAI MULTE <i className='fas fa-angle-down fa-angle-morenav'></i></span>
                      
                      {/* Dropdown more btn menu */}
                      
                      <ul className='headrightmenu_dropdown_more'
                          onMouseMove   = {()=>this.moreDropdownMenuIn()}
                          onMouseLeave  = {()=>this.moreDropdownMenuOut()}>
                        <li><Link to={'/'} tabindex='0' className='hrmn_drdown_li hlinkmen_a hlink_a_snacks'>GUSTARI</Link></li>
                        <li><Link to={'/contact'} tabindex='0' className='hrmn_drdown_li'>CONTACT</Link></li>
                      </ul>
                       
                    </div>

                  </div>
                  <div className='head_content_half head_content_halftwo'>
                    <div className='head_cont_halftwo_sect head_cont_halftwo_sect_one'>
                      <div className='hcont_halftwo_sectone_firsthalf'>
                        <span>Telefon comenzi</span>
                        <span>*7676</span>
                        <span>NON-STOP</span>
                       </div>

                       <div className='hcont_halftwo_sectone_sechalf'>
                        <span>APP</span>
                        <a href='https://play.google.com/store'><i className='fas fa-mobile-alt'></i></a>
                       </div>

                    </div>

                    {/* Header Sign in / cart section */}
                    <div className='head_cont_halftwo_sect head_cont_halftwo_sect_two'>
                      
                      {/* Display user avatar or email if signedinuser & googleuserInfo */}
                      {this.props.signedInUser && this.props.googleUserInfo !== null ? (
                        <React.Fragment>
                          {/* If googleUserInfo photoURL !== undefined display avatar / else, display email only */}
                          {this.props.googleUserInfo.photoURL !== undefined ? (
                            <React.Fragment>
                              <Link to={'/profile'} tabindex='0' id='head_user_avatar' style={!this.state.scrollDisplayAvatar ? scrollDownAvatarStyle : scrollUpAvatarStyle}>
                                <img src={this.props.googleUserInfo.photoURL !== undefined && this.props.googleUserInfo.photoURL.complete ? this.props.googleUserInfo.photoURL : 'https://raw.githubusercontent.com/SIonut0122/fooddelivery/gh-pages/static/media/pizzadel/iconuser_profile.png'}
                                     className='googleuser_imgprofile'
                                     alt={this.props.googleUserInfo.email}
                                     title={this.props.googleUserInfo.email}/>
                              </Link>
                            </React.Fragment>
                          ):(
                          <Link to={'/profile'} tabindex='0' id='head_user_avatar' style={!this.state.scrollDisplayAvatar ? scrollDownAvatarStyle : scrollUpAvatarStyle}>
                                <img src={this.props.googleUserInfo.photoURL !== undefined && this.props.googleUserInfo.photoURL.complete ? this.props.googleUserInfo.photoURL : 'https://raw.githubusercontent.com/SIonut0122/fooddelivery/gh-pages/static/media/pizzadel/iconuser_profile.png'}
                                     className='googleuser_imgprofile'
                                     alt={this.props.googleUserInfo.email}
                                     title={this.props.googleUserInfo.email}/>
                          </Link>
                          )}
                      </React.Fragment>
                      ):(
                      <div id='head_signin_btn' tabindex='0' onClick={()=>this.handleHeaderSignInBtn()}>Intra</div>
                      )}

                      <div id='head_cartdetails_div' style={{marginTop: this.props.signedInUser ? '0' : '10px'}}>
                        <div className='head_cartdetails_cartno'>
                          <span className='head_cartdetails_cartno_txt'>{cartProdLength}</span>
                          <Link to={'/cart'} className='head_cartdetails_cartno_icon'
                                onMouseMove  = {()=>this.cartIconHoverIn()}
                                onMouseLeave = {()=>this.cartIconHoverOut()}></Link>
                        </div>
                        <div className='head_cartdetails_cartsum'>
                          <span className='head_cartdetails_cartsum_txt'>{this.props.cartTotalSum}LEI</span>
                        </div>
                      </div>

                      {this.state.hiddenCartDetails && this.props.signedInUser && (
                        <Link to={'/profile'} tabindex='0' className='hd_profname_txt'>{this.props.profileDefDisplayname.length > 1 ? this.props.profileDefDisplayname : this.props.googleUserInfo.displayName}</Link>
                      )}
                    </div>

                    {/* ____________________ HEADER DROPDOWN MENU ________________ */}

                    <div className = 'hdropdowncart_menu_cont'
                         style={{top: this.props.signedInUser ? '80px' : '83px'}}
                         onMouseMove  = {()=>this.cartDropdownHoverIn()}
                         onMouseLeave = {()=>this.cartDropdownHoverOut()}>
                        <div className='hdropdowncart_cont_wrap' style={{paddingBottom: cartProducts.length > 0 ? '15px' : '0'}}>
                          <div className='hdropdowncart_wrap_prod'>
                            {this.state.scrollingHdrop && ( <span className='dropdcar_barone'></span> )}
                            {cartProducts.length > 0 ? (
                            <ul className='hdropdowncart_wrap_prod_list' onScroll={(e)=>this.handleScrollDropCartCont(e)}>
                              {this.props.cartProducts.map((prod,ind) =>
                                
                                  <li key={ind}>
                                    <img src={prod.img} alt=''/>
                                    <span className='hdropcart_li_item_info'>
                                      <span className='hdropcart_li_iteminfo_name'>
                                        {prod.name}
                                        <span className='hdropli_iteminfoname_remove' onClick={(e)=>this.hdropHandleRemoveProd(ind)}></span>
                                      </span>
                                      <span className='hdropcart_li_iteminfo_descr'>
                                        {prod.type === 'pizza' ? prod.size : prod.type === 'other' || prod.type === 'dessert' ? prod.gr+' gr' : prod.type === 'drink' ? prod.l+' l' : ''}
                                        {prod.type === 'pizza' && prod.height !== undefined ? ','+prod.height : ''}
                                        {prod.addedExtraTopping !== undefined && prod.addedExtraTopping.length > 0 ? ',' : ''}
                                        {prod.addedExtraTopping !== undefined && prod.addedExtraTopping.length > 0 && (
                                          <React.Fragment>
                                           {prod.addedExtraTopping !== undefined && prod.addedExtraTopping.map((extopp,ind) =>
                                              <i key={ind}>+{extopp.topping},</i>
                                            )} 
                                          </React.Fragment>
                                        )}
                                      </span>
                                      <span className='hdropcart_li_iteminfo_info'>
                                        <span>{prod.pieces}</span>
                                        <span>{prod.totalProdPrice} lei</span>
                                      </span>
                                    </span>
                                  </li>
                              )}
                            </ul>
                            ):(
                              <div className='hdropdown_cart_empty'>
                                <span>¯\_(ツ)_/¯</span>
                                <span>Ops, e gol!</span>
                                <span>Pentru livrare, comanda minimă este de 30 lei.</span>
                              </div>
                            )}
                          </div>

                          {/* Finish order button and total cart price info */}
                          {cartProducts.length > 0 && (
                          <React.Fragment>
                          <div className='hdropdown_wrap_totalcartprice' style={{boxShadow: cartProducts.length >= 4 && !this.state.hdropReachedBottom ? '0 -5px 5px -5px #333' : 'none',padding: cartProducts.length >= 4 ? '15px 0 5px 0' : '0'}}>
                            <span>Total cos</span>
                            <span>{this.props.cartTotalSum}lei</span>
                          </div>
                           <Link to={'/cart'} className='hdropdown_cart_finishbtn'>Finalizeaza</Link>
                          </React.Fragment>
                          )}
                        </div>
                    </div>
                  </div>
                </div>

                <span className='head_logo_icon'></span>

                {/* Header mobile section */}
                <div className='row'>
                  <div className='head_mobile_section col-12'>
                    <div className='row'>

                      {/* Header mobile app banner */}
                      {this.state.headerAppMobile && (
                      <div className='head_mobile_app_banner col-12'>
                        
                          <i className='far fa-times-circle headmob_app_close' onClick={() => this.closeHeaderAppMob()}></i>
                          <span className='headmob_app_logo'></span>

                          <div className='headmob_applogotxt_div'>
                            <span>Pizza delivery</span>
                            <span>Aplicatie mobila</span>
                          </div>

                          <a href='https://play.google.com' target='_blank' rel='noopener noreferrer' className='headmob_app_installbtn'>Instaleaza</a>
                      </div>
                      )}

                      {/* Header mobile logo and hamburger menu section */}
                      <div className='head_mobile_logohamb col-12'>
                        <Link to={'/'} className='headmobile_logo_img'></Link>
                        <span className='headmobile_logo_txt'>Pizza deliveryy</span>

                        <Link to={'/cart'} className='headmobile_cart_wrap'>
                          <span className='headm_cartwrap_cartno'><span>{this.props.cartProducts.length}</span></span>
                          <span className='headm_cartwrap_cartimg'></span>
                        </Link>
                        <div className='headmobile_hamb_div' onClick={() => this.handleOpenMobile()}>
                          <i className='fas fa-bars'></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MOBILE MENU */}

                {this.state.openMobileMenu && (
                  <div className='mobile_menu_dropdown_cont'>
                    <span className='mobile_leftmenu_close' onClick={() => this.handleOpenMobile()}><i className='fas fa-times'></i></span>

                    {/* Mobile logo menu */}
                    <div className='mobile_leftmenu'>
                      <div className='mobile_leftmenu_logo'>
                        <span></span>
                        <span className='moblefmen_logo_txt'>Pizza delivery</span>
                      </div>


                      {/* Mobile logo menu nav */}
                      <div className='mobmenu_leftmenu_nav'>
                        <span className='mobmenu_lefnav_link' onClick={(e)=>this.handleMobileLinkMenu(e)}>Pizza</span>
                        <span href='https://www.google.ro' className='mobmenu_more_nav' onClick={()=>this.toggleMobDropmenu()}>Mai multe<i className="fas fa-sort-down"></i></span>
                          {/* Mobile more dropdown menu */}
                          <div className='mobmenu_leftnav_moredropdownmenu'>
                            <span className='mobmenu_lefnav_link' onClick={(e)=>this.handleMobileLinkMenu(e)}>Gustari</span>
                            <span className='mobmenu_lefnav_link' onClick={(e)=>this.handleMobileLinkMenu(e)}>Bauturi</span>
                            <span className='mobmenu_lefnav_link' onClick={(e)=>this.handleMobileLinkMenu(e)}>Desert</span>
                          </div>
                        <Link to={'/cart'} className='mobmenu_leftnav_cart_link' onClick={()=>this.handleOpenMobile()}>Cos<span>({this.props.cartProducts.length})</span></Link>
                        {this.props.signedInUser && this.props.googleUserInfo !== null ? ( <Link to={'/profile'} onClick={() => this.handleOpenMobile()}>Contul meu</Link>):( <span className='mobileleftmenu_signinbtn' onClick={()=>this.handleHeaderSignInBtn()}>Conecteaza-te</span> )}
                      </div>

                      <div className='mobmenu_leftnav_orderphone'>
                          <i className='fas fa-mobile-alt'></i>

                          <div className='mobmenu_leftnav_orderphone_txtbox'>
                            <span>Telefon comenzi</span>
                            <span>*7676</span>
                          </div>
                      </div>
                    </div>
                  </div>
                )}
         			</div>
         		</div>
        </div>
     )
  }
}


const Header = connect(mapStateToProps,mapDispatchToProps)(connectedHeader);
export default Header;