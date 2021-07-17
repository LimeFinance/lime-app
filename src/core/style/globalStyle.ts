import { createGlobalStyle } from "styled-components";
import "../../assets/fonts/includer.css";

const GlobalStyle = createGlobalStyle`
	*{
		margin:0;
		padding:0;
	}

	html {font-size: 100%;}
  body {
    margin: 0;
    padding: 0;
		background: ${(props) => props.theme.colors.background};
		color: ${(props) => props.theme.colors.text};
		font-family: 'Avenir';
		font-weight: 400;
		line-height: 1.75;
	}


	p {margin-bottom: 1rem;}

	h1, h2, h3, h4, h5 {
		margin:1rem 0 1.38rem;

		font-weight: 400;
		line-height: 1.3;
	}

	h1 {
  	margin-top: 0;
  	font-size: 3.052rem;
	}

	h2 {font-size: 2.441rem;}

	h3 {font-size: 1.953rem;}

	h4 {font-size: 1.563rem;}

	h5 {font-size: 1.25rem;}

	small, .text_small {font-size: 0.8rem;}

	`;

export default GlobalStyle;
