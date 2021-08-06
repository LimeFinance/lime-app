import Countdown from "react-countdown";

const RELEASE_DATE = new Date("August 7, 2021 11:04:00");

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return " is live!";
  } else {
    return ` 
				live in 
        ${days === 0 ? "" : days + "d "}${hours}:${minutes}:${seconds}
     `;
  }
};

const CountdownText = () => {
  return <Countdown date={RELEASE_DATE} renderer={renderer} />;
};

export default CountdownText;
