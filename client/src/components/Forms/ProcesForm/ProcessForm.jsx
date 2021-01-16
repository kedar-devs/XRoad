import React, { Component } from "react";
import Button from "../../UI/Button/Button";
import classes from "./ProcessForm.module.css";
import Input from "../../UI/Input/Input";
import Spinner from "../../UI/Spinner/Spinner";
import axios from "axios";

class CitizenForm extends Component {
  state = {
    orderForm: {
      action: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Action Taken",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      officer: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      link: {
        elementType: "input",
        elementConfig: {
          placeholder: "Image",
          type: "file",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: true,
      },
    },
    loading: false,
    formIsValid: false,
    image: null,
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.value)
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    updatedFormElement.value = event.target.value;

    if (updatedFormElement.elementConfig.type === "file") {
      this.setState({ image: event.target.files[0] });
    }

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    // console.log(updatedFormElement)
  };

  submitHandler = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.set("encType", "multipart/form-data");
    data.append("id", this.props.match.params.id);
    data.append("action", this.state.orderForm.action.value);
    data.append("officer", this.state.orderForm.officer.value);
    console.log(this.state.image);
    data.append("pdf", this.state.image);
    const multerimage = URL.createObjectURL(this.state.image);
    console.log(data.getAll("file"));
    axios
      .put("http://localhost:5000/complain/putaction", data)
      .then(() => alert("The complaint has been processed further"))
      .catch((err) => {
        console.log(err);
      });
    // alert(JSON.stringify(formData, null, 2));
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.submitHandler} encType="multipart/formdata">
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidata={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => {
              this.inputChangedHandler(event, formElement.id);
            }}
          />
        ))}
        <Button disabled={!this.state.formIsValid}>Add</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    console.log(this.props.id);
    return (
      <div className={classes.layout}>
        <div className={classes.CitizenForm}>
          <h1>Process Complaint Further</h1>
          {form}
        </div>
      </div>
    );
  }
}

export default CitizenForm;
