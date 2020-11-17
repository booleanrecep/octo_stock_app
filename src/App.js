import React from "react";
import axios from "axios";
import Card from "./Card";
import { PropagateLoader } from "react-spinners";

// import {w3cwebsocket} from "websocket"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.TIME_TO_RERENDER = 3000;
    this.state = {
      data: "",
    };
    this.data_uri =
      "http://us-central1-stock-fantasy-fd46e.cloudfunctions.net/helloWorld";
  }

  componentDidMount() {
    this.getInterval();
  }
  // componentWillUnmount(){
  //   return true
  // }
  getInterval = () => {
    setTimeout(async () => {
      const returnData = await axios(this.data_uri);

      return this.setState({
        data: returnData.data,
      });
    }, this.TIME_TO_RERENDER);
  };

  componentDidUpdate() {
    return this.getInterval();
  }

  render() {
    // console.log(this.state);
    // setInterval(() => {
    //   this.getInterval();
    // },5000);
    return (
      <>
        <h2 style={{ margin: "10px 10px 10px 30px" }}>WELLCOME TO STOCKS</h2>
        <p style={{ margin: "10px 10px 50px 40px" }}>
          Buy and create your portfolio
        </p>
        {this.state.data ? (
          this.state.data.map((data) => <Card {...data} />)
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "30vh",
              alignItems: "center",
            }}
          >
            {" "}
            <PropagateLoader color={"#333"} />{" "}
          </div>
        )}
      </>
    );
  }
}
