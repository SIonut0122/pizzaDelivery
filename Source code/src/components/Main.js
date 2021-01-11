import React from 'react';
import '../css/Main.css';
import MainCarousel from './MainCarousel';
import ProductsContainer from './ProductsContainer';
 

class Main extends React.Component {

  render() {
    return (
        <div>
      
      
         		<div className='row'>
         			<div className='main_container'>
                <div className='pizza_offer_container col-12'></div>
                {/* Pizza banner images carousel */}
                <MainCarousel />

                 {/* Products container */}
                     
                 <ProductsContainer />
              </div>
         		</div>
   
      
        </div>
      )
  }
}


export default Main;
