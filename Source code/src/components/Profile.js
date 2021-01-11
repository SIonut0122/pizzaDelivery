import React from 'react';
import '../css/Profile.css';
import { connect             }               from "react-redux";
import { setSignedInUser,setGoogleUserInfo } from '../actions';
import { Link,Redirect }                     from 'react-router-dom'; 



const mapStateToProps = state => {
  return {  
         signedInUser   : state.signedInUser,
         googleUserInfo : state.googleUserInfo
        };
};


function mapDispatchToProps(dispatch) {
  return {
        setSignedInUser    : bol    => dispatch(setSignedInUser(bol)),
        setGoogleUserInfo  : obj    => dispatch(setGoogleUserInfo(obj))
        };
}



class connectedProfile extends React.Component {

  state = {
    profileAccPromo  : false,
    signedInUser     :  null,
    googleUserInfo   : null,
    profileName      : '',
    profilePhone     : '',
    profileEmail     : '',
    profileBirthdate : '',
    displaySuccMsg   : false
  }


  componentDidMount() {
    // Check for localstorage user profile data
    if (window.localStorage.getItem('userProfileData') !== null) {
          let userProfileData = JSON.parse(localStorage.getItem('userProfileData'));
          this.setState({
            profileName: userProfileData.profileName,
            profilePhone: userProfileData.profilePhone,
            profileBirthdate: userProfileData.profileBirthdate
          })
      }
    window.scrollTo(0, 0);
  }


  handleProfileSignout() {
    firebase.auth().signOut().then(() => {
      // Clear info about user
      this.props.setSignedInUser({ signedInUser: null })
      this.props.setGoogleUserInfo({ googleUserInfo: null })
    }).catch(function(error) {
      console.log('An error occurred while signing out');
    });
  }


updateProfileData() {

  class dataProfile {
    constructor(profileName,profilePhone,profileBirthdate) {
      this.profileName = profileName;
      this.profilePhone = profilePhone;
      this.profileBirthdate = profileBirthdate;
    }
  }
  // Create new profile data with the received data
  let newDataProfile = new dataProfile(this.state.profileName,this.state.profilePhone,this.state.profileBirthdate);
  // Save profile data to localstorage 
  localStorage.setItem('userProfileData', JSON.stringify(newDataProfile));

  // Decrease opacity to button
  document.querySelector('.profile_save_btn').setAttribute('style', 'opacity:0.7;transition:0.2s;pointer-events:none');
  setTimeout(() => {
    document.querySelector('.profile_save_btn').removeAttribute('style');
    this.setState({ displaySuccMsg: true })
  },2000);
  setTimeout(() => {
    this.setState({ displaySuccMsg: false })
  },4000);


}


  render() { 

    // If user is not signed in, redirect main page
    if(this.props.signedInUser === null && this.props.googleUserInfo !== null) {
        return (<div className='gen_loading_modal'>
                  <div className='lds-ring-gen-load'><div></div><div></div><div></div><div></div></div>
                </div>)
    } else if(!this.props.signedInUser) {
      return ( <Redirect to={'/'}/>)
    }

    return (
      
            <div>
              <div className='profile_container'>
                 <span className='profile_cont_title'>Profil
                  <span className='profilecont_title_signout' tabindex='0' onClick={()=>this.handleProfileSignout()}>Ieșire <i className='fas fa-sign-out-alt'></i></span>
                </span>
                 <span className='profile_cont_subtitle'>Date personale</span>

                 <span className='profile_cont_avatar'>
                  <img src={this.props.googleUserInfo.photoURL.complete ? this.props.googleUserInfo.photoURL : 'https://www.ionutdev.net/projimages/pizzadel/iconuser_profile.png'} alt={this.props.googleUserInfo.displayName}/>
                 </span>


                {/* PROFILE NAME */}
                 <div className='profile_inputs_wrap'>
                  <div className='profinp_wrap_row'>
                    <span className='profinp_ntxt'>Prenume</span>
                    <input type='text' maxLength='35' placeholder='Alex, Andrei, Andreea' onChange={(e)=>{ this.setState({ profileName: e.target.value })}} value={this.state.profileName}></input>
                  </div>

                {/* PROFILE PHONE */}
                  <div className='profinp_wrap_row'>
                    <span className='profinp_ntxt'>Telefon</span>
                    <input type='text' placeholder='07xxxxxxx' onChange={(e)=>{ this.setState({ profilePhone: e.target.value })}} value={this.state.profilePhone}></input>
                  </div>

                {/* PROFILE EMAIL */}
                  <div className='profinp_wrap_row'>
                    <div className='profinp_ntxt'>
                      Email
                      <div className='profinp_questionsign'>
                        <span>?</span>
                        <span>Te vom informa despre produse noi și promoții</span>
                      </div>
                    </div>
                    <input type='text' value={this.props.googleUserInfo !== undefined && this.props.googleUserInfo.email}></input>
                  </div>

                {/* PROFILE BIRTH DATE */}
                  <div className='profinp_wrap_row'>
                    <div className='profinp_ntxt'>
                      Data nastere
                      <div className='profinp_questionsign profinp_quest_birthdate'>
                        <span>?</span>
                        <span>Oferim reduceri și cadouri de ziua ta</span>
                      </div>
                    </div>
                    <input type='text' placeholder='ZZ/LL' maxLength='5' onChange={(e)=>{ this.setState({ profileBirthdate: e.target.value })}} value={this.state.profileBirthdate}></input>
                  </div>

                {/* PROFILE AGREE PROMO */}
                  <div className='profile_agree_promo'>
                    <label className='custom-checkbox'>
                      <input tabindex='0' className='custom-control-input' type='checkbox' onChange={(e) => { this.setState({ profileAccPromo: e.target.checked })}}/>
                      <div className='custom-control-label reg_terms_txt'>
                          Accept să primesc materiale promoționale și procesarea preferințelor mele de consum. Pentru mai multe informații, te rugăm să citești <a href='#' target='_blank' rel='noopener noreferrer'>Politica de Confidențialitate</a>.  
                      </div>
                    </label>
                   </div>

                {/* PROFILE SAVE BUTTON */}
                  <span className='profile_save_btn' tabindex='0' onClick={()=>this.updateProfileData()}>Salvează</span>
                 </div>

                 {this.state.displaySuccMsg && (
                  <span className='profile_saved_succesmsg'>Datele tale au fost actualizate.</span>
                 )}
              </div>
            </div>
    );
  }
}




const Profile = connect(mapStateToProps,mapDispatchToProps)(connectedProfile);
export default Profile;

