import React, { Component } from "react";
import Button from "../../UI/Button/Button";
import classes from "./CitizenForm.module.css";
import Input from "../../UI/Input/Input";
import Spinner from "../../UI/Spinner/Spinner";
import axios from "axios";
import Map from "../../Map";
class CitizenForm extends Component {
  state = {
    orderForm: {
      name: {
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

      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      priority: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: 1, displayValue: "Priority 1 (Low)" },
            { value: 2, displayValue: "Priority 2 (Medium)" },
            { value: 3, displayValue: "Priority 3 (High)" },
          ],
        },
        value: "2",
        validation: {},
        valid: true,
      },
      description: {
        elementType: "textarea",
        elementConfig: {
          placeholder: "Description",
        },
        value: "",
        validation: {},
        valid: true,
      },
      image: {
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
    lat: "",
    lon: "",
    loading: false,
    formIsValid: false,
    image: null,
  };

  componentDidMount() {
    if ("geolocation" in navigator) {
      // console.log('Available')
      const that = this;
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);

        const updatedForm = { ...that.state };
        updatedForm["lat"] = position.coords.latitude;
        updatedForm["lon"] = position.coords.longitude;
        that.setState({ updatedForm });
      });
    } else {
      // console.log('Not Available')
    }
  }

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
  updateLocation = (location) => {
    this.setState({ lat: location.lat, lon: location.lng });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const formData = {};
    // for (let formElementIdentifier in this.state.orderForm) {
    // 	formData[formElementIdentifier] = this.state.orderForm[
    // 		formElementIdentifier
    // 	].value
    // }
    // Image Upload
    const image = this.state.image;
    console.log(image);
    const data = new FormData();
    data.set("encType", "multipart/form-data");
    data.append("name", this.state.orderForm.name.value);
    data.append("email", this.state.orderForm.email.value);
    data.append("latitude", this.state.lat);
    data.append("longitude", this.state.lon);
    data.append("priority", this.state.orderForm.priority.value);
    data.append("description", this.state.orderForm.description.value);
    data.append("file", this.state.image);
    const multerimage = URL.createObjectURL(this.state.image);
    // alert(multerimage);
    axios
      .post("http://localhost:5000/complain/addcomplain", data)
      .then((res) => {
        console.log(res);
      })
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

    return (
      <div className={classes.layout}>
        <div className={classes.CitizenForm}>
          <h1>Add Complaint</h1>
          {form}
        </div>
        <div className={classes.map}>
          <Map
            center={this.props.center}
            updateLocation={this.updateLocation}
          />
          <br />
          <p>*By default your current location will be taken</p>
          <p>**You can change the location on the map</p>
        </div>
      </div>
    );
  }
}

export default CitizenForm;
