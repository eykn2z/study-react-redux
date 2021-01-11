import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { getEvent, deleteEvent, putEvent } from "../actions";

class EventsShow extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) this.props.getEvent(id);
  }

  renderField(field) {
    const {
      input,
      label,
      type,
      meta: { touched, error },
    } = field;
    return (
      <TextField
        helperText={touched && error && error}
        label={label}
        type={type}
        error={Boolean(touched && error)}
        {...input}
        fullWidth={true}
      />
    );
  }

  async onDeleteClick() {
    const { id } = this.props.match.params;
    await this.props.deleteEvent(id);
    this.props.history.push("/");
  }

  async onSubmit(values) {
    await this.props.putEvent(values);
    this.props.history.push("/");
  }

  validate = (values) => {
    const errors = {};

    if (!values.title) errors.title = "Enter a title, please.";
    if (!values.body) errors.body = "Enter a body, please.";
    return errors;
  };

  renderFields = ({ handleSubmit, pristine, submitting, invalid }) => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            label="Title"
            name="title"
            type="text"
            component={this.renderField}
          />
        </div>
        <div>
          <Field
            label="Body"
            name="body"
            type="text"
            component={this.renderField}
          />
        </div>

        <div>
          <Button
            label="Submit"
            type="submit"
            style={{ margin: 12 }}
            disabled={pristine || submitting || invalid}
            variant="outlined"
          >
            Submit
          </Button>
          <Button
            label="Cancel"
            style={{ margin: 12 }}
            variant="outlined"
            href="/"
          >
            Cancel
          </Button>
          <Button
            label="Delete"
            style={{ margin: 12 }}
            variant="outlined"
            href="/"
            onClick={this.onDeleteClick}
          >
            Delete
          </Button>
        </div>
      </form>
    );
  };

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        validate={this.validate}
        render={this.renderFields}
        initialValues={this.props.initialValues}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  initialValues: state.events[ownProps.match.params.id],
});
const mapDispatchToProps = { getEvent, deleteEvent, putEvent };

export default connect(mapStateToProps, mapDispatchToProps)(EventsShow);
