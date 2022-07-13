import React from 'react';
import '../css/DeliveryAddress.css';
import { connect             }  from "react-redux";
import { Link }                 from 'react-router-dom'; 
import { setProceedWithDelAddress,setSignedInUser,
         setGoogleUserInfo,setAddToCart } from '../actions';


const mapStateToProps = state => {
  return {  
             signedInUser             : state.signedInUser,
             googleUserInfo           : state.googleUserInfo,
             setProceedWithDelAddress : state.setProceedWithDelAddress,
             cartProducts             : state.cartProducts
        };
};

function mapDispatchToProps(dispatch) {
  return {
        setProceedWithDelAddress : bol    => dispatch(setProceedWithDelAddress(bol)),
        setSignedInUser          : bol    => dispatch(setSignedInUser(bol)),
        setGoogleUserInfo        : obj    => dispatch(setGoogleUserInfo(obj)),
        setAddToCart             : prod   => dispatch(setAddToCart(prod))
        };
}


class connectedDeliveryAddress extends React.Component {

    state = {
      addressDelValid   : false, 
      lastName          : '',
      lastNameValid     : false,

      addressInput      : '',
      addressInputValid : false,

      phoneInput        : '' ,
      phoneInputValid   : false,
      loadingAddrDel    : false,
      signedInUser      : false,
      userProfileData   : null,


    }

componentDidMount() {
  // Check for signedin user
  this.authListener();
} 


componentDidUpdate(prevProps) {
  // If auth state change, check for signed in user to display Sign in button
  if(this.props.signedInUser !== prevProps.signedInUser) {
    this.authListener();
  }
  // Check when order is finished and scroll to top
  if(this.state.addressDelValid !== prevProps.addressDelValid && document.querySelector('.acceptedorder_container') !== null) {
      // Scroll to top
      window.scrollTo(0, 0);
      // Clear cart items when order is complete
      this.props.setAddToCart({ cartProducts: [] })
  }
}

componentWillUnmount() {
  // On unmount, destroy 'Enter address delivery' component
  this.props.setProceedWithDelAddress({ proceedWithDelAddr: false })
} 

checkLocalStorage() {
  // Check for localstorage user profile data is user is signedin
  if (window.localStorage.getItem('userProfileData') !== null) {
      let userProfileData = JSON.parse(localStorage.getItem('userProfileData'));
      this.setState({ lastName: userProfileData.profileName.length > 1 ? userProfileData.profileName : '',
                      lastNameValid: true,
                      phoneInput: userProfileData.profilePhone.length > 5 ? userProfileData.profilePhone : '',
                      phoneInputValid: true 
                    })
  }
}

handleNameInput(e) {
  let lastName          = e.target.value,
        // Check lastName length to be higher than 2
      checkValueLength  = lastName.length > 2,
        // Check name characters
      checkLastnameChar =  lastName.split('').every(x => x.match(/[a-zA-Z]+/g)),
        // Check for blank spaces
      checkWhiteSpaces  = lastName.trim().length === lastName.length;

      // If lastName value match, setstate value 
    if(checkValueLength && checkWhiteSpaces && checkLastnameChar) {
        this.setState({lastName: lastName, lastNameValid: true})
    } else if(lastName.length === 0) {
        // If input is empty, reset value input
        this.setState({lastName: '', lastNameValid: false})
    } else {
        this.setState({lastName: lastName, lastNameValid: false})
    }
}

handleAddressInput(e) {
  let addressInput     = e.target.value,
        // Check addressInput length to be higher than 2
      checkValueLength = addressInput.length > 2,
        // Check for blank spaces
      checkWhiteSpaces = addressInput.trim().length === addressInput.length;

      // If addressInput value match, setstate value 
    if(checkValueLength && checkWhiteSpaces) {
        this.setState({addressInput: addressInput, addressInputValid: true})
    } else if(addressInput.length === 0) {
        // If input is empty, reset value input
        this.setState({addressInput: '', addressInputValid: false})
    } else {
        this.setState({addressInput: addressInput, addressInputValid: false})
    }
}

handlePhoneInput(e) {
  let phoneInput       = e.target.value,
        // Check phoneInput length to be higher than 2
      checkValueLength = phoneInput.length > 9,
        // Check phone char
      checkPhoneChar   = phoneInput.split('').every(x => x.match(/[0-9]+/g)),
        // Check for blank spaces
      checkWhiteSpaces = phoneInput.trim().length === phoneInput.length;

      // If phoneInput value match, setstate value 
    if(checkValueLength && checkWhiteSpaces && checkPhoneChar) {
        this.setState({phoneInput: phoneInput, phoneInputValid: true})
    } else if(phoneInput.length === 0) {
        // If input is empty, reset value input
        this.setState({phoneInput: '', phoneInputValid: false})
    } else {
        this.setState({phoneInput: phoneInput, phoneInputValid: false})
    }
}


handleAddrdelProceedBtn() {
  if(this.state.lastNameValid && this.state.addressInputValid && this.state.phoneInputValid) {
      this.setState({ loadingAddrDel: true })

      setTimeout(() => {
        this.setState({addressDelErrMsg: false, loadingAddrDel: false, addressDelValid: true  })
      },1500);

  } else {
    this.setState({addressDelErrMsg: true })
  }
}

handeleSigninCartBtn() {
    // Create google auth provider
  let provider = new firebase.auth.GoogleAuthProvider();
  // Open popup window to signin Google+
  firebase.auth().signInWithPopup(provider).then((result) => {
    // Call function to close signin container
    this.handleSigninupCloseBtn();
    // Set user signed in and google user info
    this.props.setSignedInUser({ signedInUser: true })
    this.props.setGoogleUserInfo({ googleUserInfo: result })
    this.setState({ signedInUser: true })
  }).catch(function(error) {
  });
}

authListener() {
 
      // if user is logged in, set state user to user and use the data
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.props.setSignedInUser({ signedInUser: true })
          this.props.setGoogleUserInfo({ googleUserInfo: user })
          this.setState({ signedInUser: true })
          // If user is signed in, check for saved data into the localStorage
          this.checkLocalStorage();

       } else { 
          this.props.setSignedInUser({ signedInUser: false })
          this.props.setGoogleUserInfo({ googleUserInfo: null })
          this.setState({ signedInUser: false })
      }
    });
}

  render() { 
    let displaySignInBtn = this.state.signedInUser;

    return (
      
              <React.Fragment>
                 {!this.state.addressDelValid ? (
                 <div className='deliveryaddress_container'>
                    <span className='addrdel_items_title'>Adresa livrare</span>

                    {this.state.signedInUser === false ? (
                    <div id='w_signin_button' className='addrdel_signin_btn' onClick={()=>this.handeleSigninCartBtn()}>
                      <span>Conecteaza-te cu</span> 
                      <span>Google+</span>
                    </div>
                    ):('')}
 
                    <div className='addrdel_wrap_inputs'>

                      {this.state.loadingAddrDel && (
                      <div id='addrdel_wrap_loadingeff'>
                        <div className='addrdel-lds-ring'><div></div><div></div><div></div><div></div></div>
                      </div>
                      )}

                      <span className='addrdel_inputs_title'><span>* </span>Prenume:</span>
                      <span className='addrdel_wrap_input'>
                        <input type='text' 
                               onChange={(e)=>this.handleNameInput(e)}
                               value={this.state.lastName}></input>
                      </span>
                      <span className='adddrel_wrapinput_eg'>Ex: Andrei, Alex, Andreea</span>

                      <span className='addrdel_inputs_title'><span>* </span>Adresa:</span>
                      <span className='addrdel_wrap_input'>
                        <input type='text' onChange={(e)=>this.handleAddressInput(e)}></input>
                      </span>
                      <span className='adddrel_wrapinput_eg'>Ex: Strada,numar,bloc,scara,etaj,ap.,interfon</span>

                      <span className='addrdel_inputs_title'>Oras:</span>
                      <span className='addrdel_wrap_input'>
                        <input type='text' value='Bucuresti' disabled></input>
                      </span>

                      <span className='addrdel_inputs_title'><span>* </span>Telefon:</span>
                      <span className='addrdel_wrap_input addrdel_wrap_input_phone'>
                        <input type='text' 
                               onChange={(e)=>this.handlePhoneInput(e)} 
                               placeholder='07xxxxxxx' 
                               maxLength='10'
                               value={this.state.phoneInput}></input>
                      </span>

                      {this.state.addressDelErrMsg && (
                      <span className='addrdel_inputs_err_msg'>Completeaza toate campurile obligatorii</span>
                      )}

                      <div className='cart_actionbuttons_wrap addrdel_inputs_actionbtn'>
                        <span className='cartaction_btn_back' onClick={()=>{ this.props.setProceedWithDelAddress({ proceedWithDelAddr: false }) }}><i className='fas fa-long-arrow-alt-left'></i>Inapoi</span>
                        <span className='cartaction_btn_proceed' onClick={()=>this.handleAddrdelProceedBtn()}>Trimite</span>
                      </div>

                    </div>
                </div>
                ):(

                  <div className='acceptedorder_container'>
                    {/* DISPLAY ACCEPTED ORDER MESSAGE */}
                    <div className='accorder_success_txt'>
                      <span>Super!</span>
                      <span>Comanda ta a ajuns la noi!</span>
                      <span>In maxim <span>60 de minute</span> curierul iti va livra comanda.</span>
                    </div>

                    <span className='accorder_total_sum'>Total comanda:<span> 45.99 LEI</span></span>
                    <Link to={'/'} className='accorder_backbtn' onClick={()=>{ this.props.setProceedWithDelAddress({ proceedWithDelAddr: false }) }}>Pagina principala</Link>
                  </div>
                )}

               </React.Fragment>
    );
  }
}




const DeliveryAddress = connect(null,mapDispatchToProps)(connectedDeliveryAddress);
export default DeliveryAddress;

