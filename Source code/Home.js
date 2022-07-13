import React            from 'react';
import Header           from './components/Header';
 import Main            from './components/Main';
 import SignInContainer from './components/SignIn';
import Cart             from './components/Cart';
import Profile          from './components/Profile';
import ProductDetails   from './components/ProductDetails';
import contactContainer from './components/Contact';
import Subscribe        from './components/Subscribe';
import Footer           from './components/Footer';
import { connect }      from "react-redux";
import { HashRouter, 
         Router, 
         Route, 
         Switch      }  from 'react-router-dom'; 
import pizzaLoad        from './images/main/pzzload.jpg';
import './css/Home.css';



const mapStateToProps = state => {
  return {  
        openSigninContainer : state.openSigninContainer,
        openCartContainer   : state.openCartContainer,
        openProductDetails  : state.openProductDetails
        };
};

class connectedHome extends React.Component {

    state = { activeLoading     : true,
              displayPrivacyMsg : false }

componentDidMount() {
    // Disable body scrolling
    document.querySelector('body').setAttribute('style','overflow:hidden');
    // Enable body scrolling and hide loading
    setTimeout(() => {
        document.querySelector('body').removeAttribute('style');
        this.setState({ activeLoading: false })
    },2000);

      // Check for localstorage user profile data
    if (window.localStorage.getItem('privacyaccepted') === null) {
        this.setState({ displayPrivacyMsg: true })
      }
}

closePrivacyAcc() {
    this.setState({ displayPrivacyMsg: false });
    localStorage.setItem('privacyaccepted', true);
}



  render() {
    return (
        <HashRouter>
        <div>
      
         	<div className='col-12'>
         		<div className='row'>
         			<div className='home_container col-12'>

                        {this.state.activeLoading && (
                            <div className='hcont_loadingeff'>
                                <span className='hcont_loadeff_img'>
                                    <img src={pizzaLoad} alt=''/>
                                </span>
                                <div className='hcont_loadeff_miniimg'>
                                    <img className='hcontload_mozz' src='https://raw.githubusercontent.com/SIonut0122/fooddelivery/gh-pages/static/media/pizzadel/mozz.jpg' alt=''/>
                                    <img className='hcontload_mush' src='https://raw.githubusercontent.com/SIonut0122/fooddelivery/gh-pages/static/media/pizzadel/mush.png' alt=''/>
                                    <img className='hcontload_bac'  src='https://raw.githubusercontent.com/SIonut0122/fooddelivery/gh-pages/static/media/pizzadel/bac.png' alt=''/>
                                </div>
                            </div>
                        )}

         				<Header />

                        {this.props.openSigninContainer && (
                        <SignInContainer />
                        )}  

                        {this.props.openProductDetails && (
                        <ProductDetails />
                        )}

                       <Switch>    
                            <Route  exact path='/'        component={Main}             />
                            <Route  exact path='/cart'    component={Cart}             />
                            <Route  exact path='/profile' component={Profile}          />
                            <Route  exact path='/contact' component={contactContainer} />
                        </Switch>

                       <Subscribe />
                       <Footer />

                       {this.state.displayPrivacyMsg && (
                        <div className='row'>
                            <div className='homecont_wrapprivagree'>
                            <div className='homecont_privacyagree'>
                                <span>Folosim cookies pentru o functionare rapida si confortabila a site-ului. Continuarea utilizarii site-ului reprezinta acordul tau. <a href='#'>Termeni si conditii</a></span>
                                <span className='close_privacyagree' onClick={()=>this.closePrivacyAcc()}>&times;</span>
                            </div>
                            </div>
                       </div>
                       )}

         			</div>
         		</div>
         	</div>
        </div>
        </HashRouter>
      )
   }
}



const Home = connect(mapStateToProps,null)(connectedHome);
export default Home;
