import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";

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
      <div>
        <input {...input} placeholder={label} type={type} />
        {error && touched && <span>{error}</span>}
      </div>
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

      <div>
        <input
          type="submit"
          value="Submit"
          disabled={pristine || submitting || invalid}
        />
        <Link to="/">Cancel</Link>
      </div>
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
