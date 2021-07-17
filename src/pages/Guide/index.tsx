import React from "react";
import Container from "../../components/Container";
import Scrollspy from "react-scrollspy";
import Title from "../../components/Title";
import { GuideContainer, Navigation, GuideContent } from "./styles";

const Guide = () => {
  return (
    <>
      <Title>
        Our <span>guide</span>
      </Title>
      <GuideContainer>
        <Navigation>
          <Scrollspy
            items={["section-1", "section-2", "section-3"]}
            currentClassName="active"
          >
            <li>
              <a href="#section-1">section 1</a>
            </li>
            <li>
              <a href="#section-2">section 2</a>
            </li>
            <li>
              <a href="#section-3">section 3</a>
            </li>
          </Scrollspy>
        </Navigation>
        <GuideContent>
          <section id="section-1">section 1</section>
          <section id="section-2">section 2</section>
          <section id="section-3">section 3</section>
        </GuideContent>
      </GuideContainer>
    </>
  );
};

export default Guide;
