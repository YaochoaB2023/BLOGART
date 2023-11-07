import Blog from '../images/Blog_art.png'
import Arte from '../images/arte-clasica.jpeg'
import Arte1 from '../images/arte-clasica1.jpeg'
import Arte2 from '../images/arte-clasica2.jpeg'
import Arte3 from '../images/arte-clasica3.jpeg'
import Urbana from '../images/Urbana.jpeg'
import Urbana1 from '../images/Urbana1.jpeg'
import Urbana2 from '../images/Urbana2.jpeg'
import Urbana3 from '../images/Urbana3.jpeg'
import '../css/homePage.css'
import Carrousel from "../components/Carrousel"

const images = [
  Arte,
  Arte1,
  Arte2,
  Arte3,
];

const images2 = [
  Urbana,
  Urbana1,
  Urbana2,
  Urbana3,
];

function HomePage (){
  return(
      <div className="Inicio">
          <div className='contenedor'>
          <div className='flex flex-col'>
          <img src={Blog} className='imagen'/>
              <div className='cuadro-1 flex '>
                  <div className='ti-tex flex flex-col'>
                      <h1 className='titulo'>Arte clasica</h1>
                      <h2 className='texto'>
                      El arte clásico se refiere a un período artístico que se destacó en la antigua Grecia y Roma, caracterizado por la búsqueda de la belleza ideal y la representación realista de la forma humana. Se centró en la armonía, la proporción y la simetría, influyendo en gran medida en la estética y la arquitectura occidentales.</h2>
                      </div>
                      <Carrousel images={images}/>
                  </div>
              <div className='cuadro-2 flex '>
                  <div className='ti-tex flex flex-col'>
                      <h1 className='titulo'>Arte Urbano</h1>
                      <h2 className='texto'>El arte urbano es una forma de expresión artística que se desarrolla en entornos urbanos, como graffiti, murales y esculturas, con el objetivo de transmitir mensajes sociales, políticos o culturales a menudo de manera subversiva o provocadora.</h2>
                  </div>
                  <Carrousel images={images2}/>
              </div>
          </div>
          </div>
      </div>
  )
}

export default HomePage