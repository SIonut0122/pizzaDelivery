import React from 'react';
import '../css/Main.css';
import pizzaBannerOne from '../images/main/pizza_banner_1.jpeg';
import pizzaBannerTwo from '../images/main/pizza_banner_2.jpg';


class MainCarousel extends React.Component {
 
  render() { 
    return (
      
            <div>
              <div className='main_carousel_cont'>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                  <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                  </ol>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img className="d-block w-100" draggable='false' src={pizzaBannerTwo} alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                      <img className="d-block w-100" draggable='false' src={pizzaBannerOne} alt="Second slide"/>
                    </div>
                  </div>
                  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Precedenta</span>
                  </a>
                  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Urmatoarea</span>
                  </a>
                </div>
              </div>
            </div>
    );
  }
}


export default MainCarousel;

