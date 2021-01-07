import React, { Component } from "react";
import { connect } from "react-redux";

import { increment, decrement } from "../actions";
class App extends Component {
  render() {
    const props = this.props;
    return (
      <>
        <div>value: {props.value}</div>
        <button onClick={props.increment}>+1</button>
        <button onClick={props.decrement}>-1</button>
      </>
    );
  }
}

// Stateが持つ情報からcomponent内に持つpropsとしてmappingする
// どういった情報を戻り値とするか関数に定義
const mapStateToProps = (state) => ({ value: state.count.value });
// あるActionが発生した時にReducerにTypeに応じた状態遷移を実行させるもの
// const mapDispatchToProps = (dispatch) => ({
//   increment: () => dispatch(increment()),
//   decrement: () => dispatch(decrement()),
// });

const mapDispatchToProps = { increment, decrement };

export default connect(mapStateToProps, mapDispatchToProps)(App);
