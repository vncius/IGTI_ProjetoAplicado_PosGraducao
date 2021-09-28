import React from 'react'
import imagemPadrao from './../../Content/img/no-image-avaiable.png';

export default function Carrousel({ listDir }) {
  const heigthFullWindow = window.innerHeight;
  const height = heigthFullWindow < 800 ? "300px" : "530px";
  const styleImg = { objectFit: 'cover', height, borderRadius: "1.0em" };

  if (listDir === null || listDir === undefined) {
    listDir = [imagemPadrao, imagemPadrao, imagemPadrao];
  }

  return (<>
    {/* <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        {
          listDir.map((diretorio, index) => {
            const classes = index === 0 ? "active" : "";
            return (
              <li key={index + 1} data-target="#carouselExampleIndicators" data-slide-to={index} className={classes}></li>
            );
          })
        }
      </ol>
      <div className="carousel-inner"> */}
    {
      listDir.map((diretorio, index) => {
        const classes = index === 0 ? "carousel-item active" : "carousel-item";

        return (
          <div key={index + 1} className={classes}>
            <img className="d-block w-100" src={diretorio} alt="First slide" style={styleImg} />
          </div>
        );
      })
    }
    {/* </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" ></span>
        <span className="sr-only">Next</span>
      </a>
    </div> */}
  </>
  )
}

