import React from "react";

// import useGetPrices from "../../hooks/useGetPrices";

import Header from "../../components/Header/index";
import Container from "../../components/Container";

import "./styles.scss";

const Profile: React.FC = (): JSX.Element => {
  return (
    <div id="profile-page">
      <Header />
      <Container>
        <main>
          <h1>Seu perfil.</h1>
        </main>
      </Container>
    </div>
  );
};

export default Profile;
