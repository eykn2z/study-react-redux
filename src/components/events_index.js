import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";

import { readEvents } from "../actions";
class EventsIndex extends Component {
  componentDidMount() {
    this.props.readEvents();
  }

  renderEvents() {
    return _.map(this.props.events, (event) => (
      <tr key={event.id}>
        <td>{event.id}</td>
        <td>{event.title}</td>
        <td>{event.body}</td>
      </tr>
    ));
  }
  render() {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>{this.renderEvents()}</tbody>
        </table>

        <Link to="/events/new">New Event</Link>
      </>
    );
  }
}

// Stateが持つ情報からcomponent内に持つpropsとしてmappingする
// どういった情報を戻り値とするか関数に定義
const mapStateToProps = (state) => ({ events: state.events });
// あるActionが発生した時にReducerにTypeに応じた状態遷移を実行させるもの
// const mapDispatchToProps = (dispatch) => ({
//   increment: () => dispatch(increment()),
//   decrement: () => dispatch(decrement()),
// });

const mapDispatchToProps = { readEvents };

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex);
