import React from "react";
import { useState, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";
//URL DELIBAKERY
import { URL } from "../../api/apiDB";
import "./homeView.css";
// swiper importaciones
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import "../../assets/css/swiper.css";
import Sidebar from "../sidebar/Sidebar";
//moment importaciones
//import Moment from 'react-moment';
//import 'moment/locale/es';
//import "../../assets/css/home.css";
//import "../../assets/css/style.css";
import bebidas from "../../assets/images/bebidas.jpg";
import bebidascalientes from "../../assets/images/bebidascalientes.jpg";
import bocadillos from "../../assets/images/bocadillos.jpg";
import comidas from "../../assets/images/comidas.jpg";
import ensaladas from "../../assets/images/ensaladas.jpg";
import mariscos from "../../assets/images/mariscos.jpg";
import postres from "../../assets/images/postres.jpg";
import sopas from "../../assets/images/sopas.jpg";

import oferta1 from "../../assets/images/oferta1.png";
import oferta2 from "../../assets/images/oferta2.png";
import oferta3 from "../../assets/images/oferta3.png";
import oferta4 from "../../assets/images/oferta4.png";
import oferta5 from "../../assets/images/oferta5.png";
import oferta6 from "../../assets/images/oferta6.png";
import oferta7 from "../../assets/images/oferta7.png";
import oferta8 from "../../assets/images/oferta8.png";
import { Message } from "../Dashboard/Message";

SwiperCore.use([EffectCoverflow, Pagination]);

const HomeView = () => {
  const [Products, setProducts] = useState([]);
  const [TableProducts, setTableProducts] = useState([]);
  const [Busqueda, setBusqueda] = useState("");
  const [Error, setError] = useState(null);

  useEffect(() => {
    const getDataProducts = async () => {
      await helpHttp()
        .get(URL.PRODUCT_DB)
        .then((res) => {
          if (res.length > 0) {
            setProducts(res);
            setTableProducts(res);
          } else {
            setError(res);
          }
        });
    };
    getDataProducts();
  }, []);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };
  const filtrar = (terminoBusqueda) => {
    var resultado = TableProducts.filter((el) => {
      if (
        el.nameProduct
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        el.description
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        el.category.nameCategory
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return el;
      }
    });
    setProducts(resultado);
  };

  return (
    <>
      <Sidebar />
      <section className="home-section">
        <div className="home-bg"></div>
        <div className="contenedor">
          <div className="row min-vh-100">
            <div className="home-text">
              <h1>Disfruta en Delibakery</h1>
              <p>
                Delibakery busca deleitar el paladar de nuestro exigente público
                con la excelente calidad de nuestros platos. Nos identificamos
                por el buen sabor y una atención de primera. Buscamos crear
                experiencias únicas para fidelizar a nuestros clientes y hacer
                más grande la familia Delibakery.
              </p>
              <div className="boton boton-default">Conoce la carta</div>
            </div>
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 60,
                stretch: 0,
                depth: 300,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="imgBx">
                  <img src={oferta1} alt="oferta1"/>
                </div>
                <div className="details">
                  <h3>
                    Torta de flan
                    <br />
                    <span>Sabor a chococale</span>
                  </h3>
                  <h4>2:00hrs</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="imgBx" >
                  <img src={oferta2} alt="oferta2"/>
                </div>
                <div className="details">
                  <h3>
                    Arros con leche
                    <br />
                    <span>Canela y clavo a gusto</span>
                  </h3>
                  <h4>3:00hrs</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="imgBx">
                  <img src={oferta3} alt="oferta3" />
                </div>
                <div className="details">
                  <h3>
                    Papa Huancaina
                    <br />
                    <span>Queso , papa y aceituna</span>
                  </h3>
                  <h4>1:00hrs</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="imgBx">
                  <img src={oferta4}  alt="oferta4"/>
                </div>
                <div className="details">
                  <h3>
                    Ceviche de pota
                    <br />
                    <span>Fresco y picante </span>
                  </h3>
                  <h4>1:00hrs</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="imgBx">
                  <img src={oferta5} alt="oferta5"/>
                </div>
                <div className="details">
                  <h3>
                    Lomo saltado
                    <br />
                    <span>cocinada con carne premiun</span>
                  </h3>
                  <h4>10:00hrs</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="imgBx">
                  <img src={oferta6} alt="oferta6" />
                </div>
                <div className="details">
                  <h3>
                    Juanes
                    <br />
                    <span>Pollo ,platano y aceitunas</span>
                  </h3>
                  <h4>20:00hrs</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="imgBx">
                  <img src={oferta7} alt="oferta7" />
                </div>
                <div className="details">
                  <h3>
                    Chupe de pescado
                    <br />
                    <span>Pescado Bonito con calamares</span>
                  </h3>
                  <h4>3:00hrs</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="imgBx">
                  <img src={oferta8} alt="oferta8"/>
                </div>
                <div className="details">
                  <h3>
                    Sopa de Kion
                    <br />
                    <span>este es la descripcion</span>
                  </h3>
                  <h4>2:00hrs</h4>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
      <section className="categorias content">
        <div className="contenedor2">
          <div className="section-title">
            <h2 data-title="Ordene Ahora">Nuestras Categorias</h2>
          </div>
          <div className="galeria-port">
            <div className="imagen-port">
              <img src={bebidas} alt="" />
              <div className="hover-galeria">
                <h2>Bebidas</h2>
                <p>Gran variedad de bebidas frías</p>
              </div>
            </div>
            <div className="imagen-port">
              <img src={bebidascalientes} alt="" />
              <div className="hover-galeria">
                <h2>Bebidas calientes</h2>
                <p>Bebidas calientes contra el frio</p>
              </div>
            </div>
            <div className="imagen-port">
              <img src={bocadillos} alt="" />
              <div className="hover-galeria">
                <h2>Bocadillos</h2>
                <p>Tortas de jamon y mucho más</p>
              </div>
            </div>
            <div className="imagen-port">
              <img src={comidas} alt="" />
              <div className="hover-galeria">
                <h2>Comidas</h2>
                <p>De todas las regiones del pais</p>
              </div>
            </div>
            <div className="imagen-port">
              <img src={ensaladas} alt="" />
              <div className="hover-galeria">
                <h2>Ensaladas</h2>
                <p>Comidas saludables para ti</p>
              </div>
            </div>
            <div className="imagen-port">
              <img src={mariscos} alt="" />
              <div className="hover-galeria">
                <h2>Mariscos</h2>
                <p>Del mar a tus manos</p>
              </div>
            </div>
            <div className="imagen-port">
              <img src={postres} alt="" />
              <div className="hover-galeria">
                <h2>Postres</h2>
                <p>Todo tipo de postres </p>
              </div>
            </div>
            <div className="imagen-port">
              <img src={sopas} alt="" />
              <div className="hover-galeria">
                <h2>Sopas</h2>
                <p>Sopas veganas y vegetarianas</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="productos content">
        <div className="contenedor3">
          <div className="section-title">
            <h2 data-title="Ordene Ahora">Nuestros Productos</h2>
          </div>
          <div className="search-box">
            <input
              className="src"
              type="text"
              name="search"
              placeholder="Buscar comidas,bebidas,categorias"
              autoComplete="off"
              value={Busqueda}
              onChange={handleChange}
            />
          </div>
          {Error && (
        <Message
          msg="Error al cargar"
          bgColor="#dc3545"
        />
      )}
          <div className="cards">
            {Products &&
              Products.map((product) => (
                <div key={product.idProduct} className="card">
                  <img
                    src={`${URL.PRODUCT_DB}/${product.idProduct}/image`}
                    alt={product.nameProduct}
                  />
                  <div className="contenido-texto-card">
                    <h4>{product.nameProduct}</h4>
                    <p>{product.description}</p>
                    <h5>$/. {product.priceProduct}</h5>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <footer className="content">
        <div className="contenedor-footer">
          <div className="content-foo">
            <h4>Celular</h4>
            <p>922098340</p>
          </div>
          <div className="content-foo">
            <h4>Correo </h4>
            <p>Delibakery@gmail.com</p>
          </div>
          <div className="content-foo">
            <h4>Direccion</h4>
            <p>Lima-Ancon</p>
          </div>
        </div>
        <h2 className="titulo-final">&copy; Delibakery | GustavoFC - DavidPG</h2>
      </footer>
    </>
  );
};

export default HomeView;
