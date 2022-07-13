import React from 'react';
import { connect }  from 'react-redux';
import '../css/Contact.css';
 
 


 const mapStateToProps = state => {
  return {  
        signedInUser: state.signedInUser
        };
};


class connectedContactContainer extends React.Component {

  state = {
      firstAndLastname  : '',
      contactEmail      : '',
      contactPhone      : '',
      contactCommandNo  : '',
      contactMessage    :'',
      messageSent       : false,
      messageWasNotSent : false,
  }
  
  componentDidMount() {
     window.scrollTo(0, 0);

     // Hide More dropdown menu on mount
     if(document.querySelector('.mobmenu_leftnav_moredropdownmenu')) {
       document.querySelector('.mobmenu_leftnav_moredropdownmenu').classList.toggle('mobmenu_dropdown_active');
    }
  }

 
 ctSendMessage() {
  let {firstAndLastname,contactEmail,contactPhone,contactCommandNo,contactMessage} = this.state;

    if(firstAndLastname.length > 3 && contactEmail.length > 3 && contactPhone.length > 9 && contactMessage.length > 3) {
        this.setState({ messageSent: true,messageWasNotSent: false,firstAndLastname:'',contactEmail:'',contactPhone:'',contactCommandNo:'',contactMessage:'' })
    } else {
      this.setState({ messageWasNotSent: true,messageSent: false })
    }
 }
 

  render() { 
    return (
      
            <div>
              <div className='contact_container'>
                <div className='contact_cont_wrapinputs'>
                  <span className='contact_cont_title'>Contact</span>
                  {!this.props.signedInUser && (
                  <span className='ct_w_haveacc_questtxt'>
                    Ai deja cont? <span>Intră în cont</span> și îţi completăm automat informaţiile de contact.
                  </span>
                  )}

                  <span className='ct_w_wrtmsgtxt'>Lasa-ne mesajul tau aici</span>
                
                  <div className='ctwrapinputs'>
                    <span className='ctwrinp_title'>Nume si prenume<i>*</i></span>
                    <span className='ctwrinp_span'>
                      <input type='text' placeholder='Nume si prenume' value={this.state.firstAndLastname} onChange={(e) => {this.setState({ firstAndLastname: e.target.value})}}></input>
                    </span>

                    <span className='ctwrinp_title'>Email<i>*</i></span>
                    <span className='ctwrinp_span'>
                      <input type='text' placeholder='Email'value={this.state.contactEmail}  onChange={(e) => {this.setState({ contactEmail: e.target.value})}}></input>
                    </span>

                    <span className='ctwrinp_title'>Telefon<i>*</i></span>
                    <span className='ctwrinp_span'>
                      <input type='text' placeholder='Telefon'value={this.state.contactPhone}  maxLength='10' onChange={(e) => {this.setState({ contactPhone: e.target.value})}}></input>
                    </span>

                    <span className='ctwrinp_title'>Numar comanda</span>
                    <span className='ctwrinp_span'>
                      <input type='text' placeholder='Numar comanda' value={this.state.contactCommandNo} onChange={(e) => {this.setState({ contactCommandNo: e.target.value})}}></input>
                    </span>

                    <span className='ctwrinp_title'>Mesajul tau<i>*</i></span>
                    <span className='ctwrinp_span ctwrinp_span_txtarea'>
                      <textarea type='text' placeholder='Mesajul tau' value={this.state.contactMessage} onChange={(e) => {this.setState({ contactMessage: e.target.value})}}></textarea>
                    </span>

                  </div>

                    <div className='ctwrinp_politdate'>
                      <span>Înțelegem importanța datelor personale și de aceea, pentru scopul de a vă trimite informații cu privire la produsele și serviciile, campaniile publicitare și ofertele noastre, vom procesa datele dumneavoastră personale:
                      nume, prenume, adresa de e-mail și/sau numărul de telefon (mobil). Datele dumneavoastră nu vor fi procesate în niciun alt scop, decât cu consimțământul dumneavoastră prealabil.
                      </span>   

                      <span>Pentru a putea procesa datele mai sus menționate avem nevoie de consimțământul dumneavoastră expres în acest sens. Puteți afla mai multe informații consultând <a href='#'>Politica de Confidențialitate</a> și/sau contactându-ne la <a href='mailto:protectiadatelor@pizzadelivery.ro'>protectiadatelor@pizzadelivery.ro</a></span>
                   
                      <span>Odata cu apasarea butonului <strong>'Trimite mesaj'</strong>, dovediti ca <strong>sunteti de acord cu procesarea datelor dvs.</strong> si ca doriti sa fiti contactat pe adresa de email si numarul de telefon inscrise.</span>
                    
                      <span className='ctwring_ct_sendmsgbtn' tabindex='0' onClick={()=>this.ctSendMessage()}>Trimite mesaj</span>
                      {this.state.messageSent && (
                      <span className='ctwring_messagesent_msg'>Mesajul a fost trimis. Multumim!</span>
                      )}

                      {this.state.messageWasNotSent && (
                      <span className='ctwring_messagesent_err'>Mesajul nu a fost trimis. Campurile marcate cu * sunt obligatorii.</span>
                      )}
                    </div>


                </div>
                <div className='contact_cont_wrapdetails'>
                  <span className='ctwdet_wrdet'>Alte modalitati de a ne contacta</span>
                  <div className='ctwdet_wrapsocial'>
                    <span className='ctwdet_wrdetphone'><i className='fas fa-phone-alt'></i>021 210 100</span>
                    <span className='ctwdet_wrdetmobile'><i className='fas fa-mobile-alt'></i>*7676</span>
                    <span className='ctwdet_wrdetemail'><i className='far fa-envelope'></i>contact@pizzadelivery.ro</span>
                  </div>

                  <div className='ctwdet_wrapdet_sectwo'>
                    <span className='ctwedet_wsectwo_firstxt'>Pentru sfaturi utile şi comentarii, conectează-te cu noi pe social media.</span>
                    <span className='ctwedet_wsectwo_fsocial'>
                      <i className='fab fa-facebook'></i>
                      <i className='fab fa-instagram'></i>
                      <i className='fab fa-twitter'></i>
                    </span>

                    <span className='ctwedet_wsectwo_sectxt'>Date de identificare companie</span>
                    <span className='ctwedet_wsectwo_cid'>RO RESTAURANT SYSTEM S.A</span>
                    <span className='ctwedet_wsectwo_cid'>Splaiul independentei nr.6,corp B</span>
                    <span className='ctwedet_wsectwo_cid'>sector 1, Bucuresti</span>
                    <span className='ctwedet_wsectwo_cid'>CUI: RO65216725</span>

                  </div>
                </div>

              </div>
            </div>
    );
  }
}

 
const contactContainer = connect(mapStateToProps,null)(connectedContactContainer);
export default contactContainer;
 

