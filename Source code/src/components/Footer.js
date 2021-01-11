import React        from 'react';
import { Link }     from 'react-router-dom'; 
import googlePlay   from '../images/footer/play.png';
import appStore     from '../images/footer/appstore.png';
import '../css/Footer.css';




class Footer extends React.Component {
  render() { 
    return (
      
            <div>
              <div className='row'>
                <div className='footer_container'>
                  <div className='footercont_sect_wrapp'>
                    <div className='footercont_sect'>
                      <span className='footercont_sect_title'>Despre Pizza Delivery</span>
                      <span className='footsec_link'><Link tabindex='0' to={'/contact'}>Contact</Link></span>
                      <span className='footsec_link'><Link tabindex='0' to={'/#'}>Aplicație mobilă</Link></span>
                    </div>
                    <div className='footercont_sect'>
                      <span className='footercont_sect_title'>Produse</span>
                      <span className='footsec_link' tabindex='0' onClick={() => { document.querySelector('.wprodcont_prodtitle_pizza').scrollIntoView({behavior: "smooth"})}}><a href='#'>Meniu</a></span>
                    </div>
                    <div className='footercont_sect'>
                      <span className='footercont_sect_title'>Altele</span>
                      <span className='footsec_link'><Link tabindex='0' to={'/'}>Termeni și condiții</Link></span>
                      <span className='footsec_link'><Link tabindex='0' to={'/'}>Politica de confidențialitate</Link></span>
                    </div>
                  </div>

                  <div className='footer_social_app'>
                    <div className='footer_socialapp_sect foo_social_wrapicons'>
                        <span className='foosocialapp_sect_txt'>Social media:</span>
                        <span className='foosecicon'><i tabindex='0' className='fab fa-facebook'></i></span>
                        <span className='foosecicon'><i tabindex='0' className='fab fa-instagram'></i></span>
                        <span className='foosecicon'><i tabindex='0' className='fab fa-twitter'></i></span>
                    </div>

                    <div className='footer_socialapp_sect foo_app_wrapicons'>
                       <a href='https://play.google.com/store' tabindex='0' className='footer_app_icon'><img src={googlePlay}/></a>
                       <a href='https://www.apple.com/app-store/' tabindex='0' className='footer_app_icon'><img src={appStore}/></a>
                    </div>

                  </div>

                  <div className='footer_copyrights_wrap'>
                      <span>Pizza delivery </span>© 2020
                  </div>
                </div>
              </div>
            </div>
    );
  }
}





export default Footer;

