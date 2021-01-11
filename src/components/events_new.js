import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { postEvent } from "../actions";

class EventsNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
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

  validate = (values) => {
    const errors = {};

    if (!values.title) errors.title = "Enter a title, please.";
    if (!values.body) errors.body = "Enter a body, please.";
    return errors;
  };

  async onSubmit(values) {
    await this.props.postEvent(values);
    this.props.history.push("/");
  }

  renderFields = ({ handleSubmit, pristine, submitting, invalid }) => (
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

      <Button
        label="Submit"
        type="submit"
        style={{ margin: 12 }}
        disabled={pristine || submitting || invalid}
        variant="outlined"
      >
        Submit
      </Button>
      <Button label="Cancel" style={{ margin: 12 }} variant="outlined" href="/">
        Cancel
      </Button>
    </form>
  );

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        validate={this.validate}
        render={this.renderFields}
      />
    );
  }
}

const mapDispatchToProps = { postEvent };

export default connect(null, mapDispatchToProps)(EventsNew);
