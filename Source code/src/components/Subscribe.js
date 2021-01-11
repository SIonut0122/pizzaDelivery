import React from 'react';
import '../css/Subscribe.css';


class Subscribe extends React.Component {

  state = {
    subscrName        : '',
    subscrEmail       : '',
    userSubscribed    : false,
    userSubscribedErr : false
  }


subscrBtn() {
  let {subscrName,subscrEmail} = this.state;

  if(subscrName.length > 1 && subscrEmail.length > 10) {
    this.setState({ userSubscribed: true, userSubscribedErr: false, subscrEmail: '', subscrName: '' })
  } else {
    this.setState({ userSubscribed: false, userSubscribedErr: true })
  }

  setTimeout(() => {
    this.setState({  userSubscribedErr: false })
  },3000);
}

  render() { 
    return (
      
            <div>
              <div className='subscribe_container'>
                 <span className='scrb_txtone'>Abonează-te pentru promoții și oferte</span>

                 <div className='scrb_wrap_inputs'>
                  <span className='scrb_wrapinp_span'>
                    <input type='text' placeholder='Nume' value={this.state.subscrName} onChange={(e) => {this.setState({ subscrName: e.target.value})}}></input>
                  </span>
                  <span className='scrb_wrapinp_span'>
                    <input type='text' placeholder='Adresa email' value={this.state.subscrEmail} onChange={(e) => {this.setState({ subscrEmail: e.target.value})}}></input>
                  </span>
                  <span className='scrb_subscribe_btn' tabindex='0' onClick={()=>this.subscrBtn()}>Aboneaza-te</span>
                 </div>

                  <span className='scrb_subscribe_accpolicy'>* Odată cu apăsarea butonului de abonare, dovediți că sunteți de acord cu <a href='#'>Politica de Confidențialitate</a>.</span>
                  {this.state.userSubscribed && ( 
                    <span className='scrb_subscr_success'>Abonare realizată cu succes!.</span>
                  )}
                  {this.state.userSubscribedErr && (
                  <span className='scrb_subscr_error'>Nume / email invalid</span>
                  )}
              </div>
            </div>
    );
  }
}





export default Subscribe;

