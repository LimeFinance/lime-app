import React from "react";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import { GuideContainer } from "./styles";

const Guide = () => {
  return (
    <>
      <Title>
        Coming <span>soon</span>
      </Title>
      <Subtitle>
        The guide and other features will be available in upcoming phases!
      </Subtitle>
      <GuideContainer>
        {/* <Navigation>
          <Scrollspy items={["section-1", "section-2", "section-3"]} currentClassName="active">
            <li>
              <a href="#section-1">Introduction</a>
            </li>
          </Scrollspy>
        </Navigation>
        <GuideContent>
          <section id="section-1">
            <Title>Coming so</Title>
          </section>
        </GuideContent> */}
      </GuideContainer>
    </>
  );
};

export default Guide;
