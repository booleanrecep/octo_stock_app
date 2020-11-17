import React from "react";
import icon1 from "./assets/icon1.png";
import "./App.css";

const Card = ({ symbol, basevalue }) => {
  basevalue = parseFloat(basevalue).toFixed(2);
  const [prevalue, setPrevalue] = React.useState(basevalue);
  setTimeout(() => {
    setPrevalue(basevalue);
  }, 2500);
  React.useEffect(() => {
    setPrevalue(basevalue);
  }, [prevalue]);
  const per = parseFloat(
    (100 * Math.abs(prevalue - basevalue)) / basevalue
  ).toFixed(1);

  const [state, setState] = React.useState({
    boughtPrice: 0,
    profit: "",
    clickedBuy: false,
    clickedDiv: false,
  });

  const handleBuy = (price) => {
    setState((prevState) => ({
      ...prevState,
      clickedBuy: true,
      clickedDiv: true,
      boughtPrice: price,
    }));
    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        clickedBuy: false,
      }));
    }, 3000);
  };
  const handleSold = (price) => {
    const boughtP = state.boughtPrice;
    const soldP = price;
    const prof = (boughtP - soldP).toFixed(2);
    setState((prevState) => ({
      ...prevState,
      profit: prof,
    }));
  };

  return (
    <>
      <div
        className="pop-buy"
        style={{
          display: `${state.clickedBuy ? "block" : "none"}`,
        }}
      >
        <p>{symbol} &#10003;</p>
      </div>
      <div
        className="main-div"
        style={{ backgroundColor: state.clickedDiv ? "lightgreen" : "" }}
      >
        <img
          className="icon"
          alt="J"
          style={{ filter: "contrast(10%)" }}
          src={icon1}
        />
        <div className="buy-sell-div">
          <p
            className="buy-sell-p"
            style={{
              display: `${!state.clickedDiv ? "inline-block" : "none"}`,
            }}
            onClick={() => handleBuy(basevalue)}
          >
            BUY
            {/* <span className="buy-icon">&#8743;</span> */}
          </p>
          <p
            className="buy-sell-p"
            style={{ display: `${state.clickedDiv ? "inline-block" : "none"}` }}
            onClick={() => handleSold(basevalue)}
          >
            SELL
            {/* <span className="sell-icon">&#8744;</span> */}
          </p>
        </div>

        <div className="ticker-div">
          <p className="ticker">{symbol}</p>
        </div>
        <div className="selectedby-div">
          <p
            style={{
              marginLeft: "-65px",
              marginTop: "85px",
              display: `${state.clickedDiv ? "inline-block" : "none"}`,
            }}
          >
            Your profit:<i> ₹ {state.profit}</i>
          </p>
          <p
            className="selectedby"
            style={{
              display: `${state.clickedDiv ? "inline-block" : "none"}`,
            }}
          >
            You bought ₹{state.boughtPrice}{" "}
            <i
              className="pop-X"
              style={{
                display: `${state.clickedDiv ? "inline-block" : "none"}`,
              }}
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  clickedDiv: false,
                }));
              }}
            >
              &#10005;
            </i>
          </p>
        </div>
        <div
          className="price-div"
          style={{
            backgroundColor:
              (per !== "0.0") & (basevalue !== "0.00") ? "pink" : "",
          }}
        >
          <p className="price">
            {" "}
            {`₹ ${basevalue}`}{" "}
            <span
              style={{
                color:
                  per === "0.0"
                    ? "black"
                    : prevalue >= basevalue
                    ? "red"
                    : "green",
              }}
            >
              {`${isNaN(per) || per === "0.0" ? "" : per + "%"}`}
            </span>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
