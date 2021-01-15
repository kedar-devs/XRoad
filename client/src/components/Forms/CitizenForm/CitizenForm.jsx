<<<<<<< HEAD:client/src/components/Forms/CitizenForm.jsx
import React, { Component } from "react";
import Button from "../UI/Button/Button";
import Map from "../Map";
import classes from "./CitizenForm.module.css";
import Input from "../UI/Input/Input";
import Spinner from "../UI/Spinner/Spinner";

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
            { value: "low", displayValue: "Low" },
            { value: "medium", displayValue: "Medium" },
            { value: "high", displayValue: "High" },
          ],
        },
        value: "medium",
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
    },
    lat: "",
    long: "",
    image: "",
    loading: false,
    formIsValid: false,
  };

  componentDidMount() {
    if ("geolocation" in navigator) {
      // console.log('Available')
      const that = this;
      navigator.geolocation.getCurrentPosition(function (position) {
        const updatedForm = { ...that.state.orderForm };

        that.setState({
          orderForm: updatedForm,
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
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
    this.setState({ lat: location.lat, long: location.lng });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    formData["latitude"] = this.state.lat;
    formData["longitude"] = this.state.long;
    alert(JSON.stringify(formData, null, 2));
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
      <form onSubmit={this.submitHandler}>
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
        <input
          type="file"
          required
          onChange={(e) => console.log(e.target.files[0])}
        />
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
=======
import React, { Component } from 'react'
import Button from '../../UI/Button/Button'
import classes from './CitizenForm.module.css'
import Input from '../../UI/Input/Input'
import Spinner from '../../UI/Spinner/Spinner'

class CitizenForm extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Name',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},

			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			latitude: {
				elementType: 'input',
				elementConfig: {
					type: 'number',
					placeholder: 'Latitude',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: !false,
				touched: false,
			},
			longitude: {
				elementType: 'input',
				elementConfig: {
					type: 'number',
					placeholder: 'Longitude',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: !false,
				touched: false,
			},
			priority: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 1, displayValue: 'Priority 1 (Low)' },
						{ value: 2, displayValue: 'Priority 2 (Medium)' },
						{ value: 3, displayValue: 'Priority 3 (High)' },
					],
				},
				value: '2',
				validation: {},
				valid: true,
			},
			description: {
				elementType: 'textarea',
				elementConfig: {
					placeholder: 'Description',
				},
				value: '',
				validation: {},
				valid: true,
			},
			image: {
				elementType: 'input',
				elementConfig: {
					placeholder: 'Image',
					type: 'file',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: true,
			},
		},

		loading: false,
		formIsValid: false,
		image: null,
	}

	componentDidMount() {
		if ('geolocation' in navigator) {
			// console.log('Available')
			const that = this
			navigator.geolocation.getCurrentPosition(function (position) {
				console.log('Latitude is :', position.coords.latitude)
				console.log('Longitude is :', position.coords.longitude)

				const updatedForm = { ...that.state.orderForm }
				const lat = { ...updatedForm['latitude'] }
				const lon = { ...updatedForm['longitude'] }

				lat.value = position.coords.latitude
				lon.value = position.coords.longitude
				updatedForm['latitude'] = lat
				updatedForm['longitude'] = lon

				that.setState({ orderForm: updatedForm })
			})
		} else {
			// console.log('Not Available')
		}
	}

	checkValidity = (value, rules) => {
		let isValid = true

		if (rules.required) {
			isValid = value.trim() !== '' && isValid
		}

		return isValid
	}

	inputChangedHandler = (event, inputIdentifier) => {
		// console.log(event.target.value)
		const updatedOrderForm = { ...this.state.orderForm }
		const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }

		updatedFormElement.value = event.target.value

		if (updatedFormElement.elementConfig.type === 'file') {
			this.setState({ image: event.target.files[0] })
		}

		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		)
		updatedFormElement.touched = true
		updatedOrderForm[inputIdentifier] = updatedFormElement

		let formIsValid = true
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
		}

		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
		// console.log(updatedFormElement)
	}

	submitHandler = (event) => {
		event.preventDefault()
		const formData = {}
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value
		}
		// Image Upload
		const image = this.state.image
		console.log(image)
		alert(JSON.stringify(formData, null, 2))
	}

	render() {
		const formElementsArray = []
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			})
		}
		let form = (
			<form onSubmit={this.submitHandler}>
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
							this.inputChangedHandler(event, formElement.id)
						}}
					/>
				))}
				<Button disabled={!this.state.formIsValid}>Add</Button>
			</form>
		)

		if (this.state.loading) {
			form = <Spinner />
		}

		return (
			<div className={classes.CitizenForm}>
				<h1>Add Complaint</h1>
				{form}
			</div>
		)
	}
>>>>>>> 407ca84854bb2260dbff4a92b6ec4d54e5d15973:client/src/components/Forms/CitizenForm/CitizenForm.jsx
}

export default CitizenForm;
