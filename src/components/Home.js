import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Products from "./products";
import { db } from "../firebase";
import { getDocs, collection } from "@firebase/firestore";
import { contextCreated } from "./ContextAPI";
import SideCart from "./SideCart";
import FlipMove from "react-flip-move";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Home() {
  const [{ prod, cart, user }, dispatch] = useContext(contextCreated);

  const anime = {
    from: { transform: "translateX(2500px)", opcaity: "0" },
    to: { opcaity: "1" },
  };

  useEffect(() => {
    async function getFirestoreData() {
      const productCollection = collection(db, "products");
      const snapshot = await getDocs(productCollection);

      dispatch({
        type: "productArray",
        data: snapshot.docs.map((doc) => ({ itm: doc.data(), id: doc.id })),
      });
      console.log("fetching data");
    }
    getFirestoreData();
  }, [dispatch]);

  return (
    <HomeContainer>
      <Carousel
        showStatus={false}
        interval={2000}
        infiniteLoop={true}
        autoPlay={true}
        axis={"horizontal"}
      >
        <AdBanner>
          <img
            src="https://m.media-amazon.com/images/I/61JY6P9al7L._SX3000_.jpg"
            alt=""
          />
        </AdBanner>
        <AdBanner>
          <img
            src="https://m.media-amazon.com/images/I/71vqLqXlZqL._SX3000_.jpg"
            alt=""
          />
        </AdBanner>
        <AdBanner>
          <img
            src="https://m.media-amazon.com/images/I/71GyCiRGgeL._SX3000_.jpg"
            alt=""
          />
        </AdBanner>
      </Carousel>

      <Content>
        {prod?.map(({ itm, id }) => (
          <Products
            key={id}
            id={id}
            image={itm.image}
            title={itm.title}
            stars={itm.rating}
            price={itm.price}
          />
        ))}
      </Content>

      <FlipMove enterAnimation={anime}>
        {cart[0] && (
          <Sidecart>
            {" "}
            <SideCart />{" "}
          </Sidecart>
        )}
      </FlipMove>

      <Footer>
        <h5>Made with ❤️ by Anish</h5>
      </Footer>
    </HomeContainer>
  );
}
export default Home;
//styles

const Sidecart = styled.div`
  z-index: 2;
  height: 150vh;
  width: 100px;
  background-color: white;
  transform: translate(1390px, -1300px);
  border-radius: 10px;
  position: fixed;
  margin-top: -120px;
`;
const HomeContainer = styled.div`
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
`;
const AdBanner = styled.div`
  display: flex;
  justify-content: center;

  img {
    height: 600px;
    width: 100%;
    margin-top: 70px;
    z-index: -1;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 2),
      rgba(0, 0, 0, 0)
    );
  }
`;
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -300px;
  margin-left: 40px;
`;
const Footer = styled.div`
  display: flex;
  justify-content: center;
  border: 2px solid black;

  width: 100%;
  margin-top: 200px;
  background-color: black;
  color: white;
`;
