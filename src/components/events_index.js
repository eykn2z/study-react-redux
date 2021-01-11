import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Fab,
} from "@material-ui/core";
import { readEvents } from "../actions";

const style = {
  right: 20,
  bottom: 20,
  position: "fixed",
};

class EventsIndex extends Component {
  componentDidMount() {
    this.props.readEvents();
  }

  renderEvents() {
    return _.map(this.props.events, (event) => (
      <TableRow key={event.id}>
        <TableCell>{event.id}</TableCell>
        <TableCell>
          <Link to={`/events/${event.id}`}>{event.title}</Link>
        </TableCell>
        <TableCell>{event.body}</TableCell>
      </TableRow>
    ));
  }
  render() {
    return (
      <>
        <Fab color="primary" aria-label="add" href="/events/new" style={style}>
          <AddIcon />
        </Fab>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.renderEvents()}</TableBody>
        </Table>
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
