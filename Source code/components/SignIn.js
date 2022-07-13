import React from 'react';
import '../css/SignInContainer.css';
import { connect             }  from "react-redux";
import { setSigninContainer,setSignedInUser,setGoogleUserInfo } from '../actions';




function mapDispatchToProps(dispatch) {
  return {
        setSigninContainer : bol    => dispatch(setSigninContainer(bol)),
        setSignedInUser    : bol    => dispatch(setSignedInUser(bol)),
        setGoogleUserInfo  : obj    => dispatch(setGoogleUserInfo(obj))
        };
}



class connectedSignInContainer extends React.Component {


componentWillUnmount() {
   // Show hamburger icon menu
  document.querySelector('.headmobile_hamb_div').classList.remove('hamb_inactive_btn');
  // Enable body scrolling
  document.querySelector('body').classList.remove('body-fixed');

}
handleSigninupCloseBtn() {
  // Close signinup container and enable body scrolling
  this.props.setSigninContainer({ openSigninContainer: false })
  document.querySelector('body').style.overflow = 'visible';
   
}

handeleSigninBtn() {
    // Create google auth provider
  let provider = new firebase.auth.GoogleAuthProvider();
  // Open popup window to signin Google+
  firebase.auth().signInWithPopup(provider).then((result) => {

    // Call function to close signin container
    this.handleSigninupCloseBtn();
    // Set user signed in and google user info
    this.props.setSignedInUser({ signedInUser: true })
    this.props.setGoogleUserInfo({ googleUserInfo: result })

  }).catch(function(error) {
  });
}


  render() { 
    return (
      
            <div>
              <div className='signincontainer_container'>
                <div className='signincont_wrap'>
                  <div className='signin_action_div'>
                    <span className='signinup_close_btn' onClick={()=>this.handleSigninupCloseBtn()}>&#10006;</span>
                    <span className='signinup_title'>Intra</span>
                    <div id='w_signin_button' onClick={()=>this.handeleSigninBtn()}>
                      <span>Conecteaza-te cu</span> 
                      <span>Google+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    );
  }
}




const SignInContainer = connect(null,mapDispatchToProps)(connectedSignInContainer);
export default SignInContainer;

