import React, { Component } from "react";
import { connect } from "react-redux";
import { createTransaction } from "../actions/transactions";

class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.onChangeMeterNumber = this.onChangeMeterNumber.bind(this);
    this.onChangecurrentElectricityToken = this.onChangecurrentElectricityToken.bind(this);
    this.daysRemaining = this.daysRemaining.bind(this);
    this.saveTransaction = this.saveTransaction.bind(this);
    this.newTransaction = this.newTransaction.bind(this);
    this.state = {
      id: null,
      meterNumber: "",
      currentElectricityToken: "",
      daysRemaining: "",
   
    };
  }
  onChangeMeterNumber(e) {
    this.setState({
      title: e.target.value,
    });
  }
  onChangecurrentElectricityToken(e) {
    this.setState({
      description: e.target.value,
    });
  }
  daysRemaining(e) {
    this.setState({
      title: e.target.value,
    });
  }

  saveTransaction() {
    const { meterNumber, currentElectricityToken ,daysRemaining } = this.state;
    this.props
      .createTransaction(meterNumber, currentElectricityToken,daysRemaining)
      .then((data) => {
        this.setState({
          id: data.id,
          meterNumber: data.meterNumber,
          currentElectricityToken: data.currentElectricityToken,
          daysRemaining: data.daysRemaining,
     
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  newTransaction() {
    this.setState({
      id: null,
      meterNumber: "",
      currentElectricityToken: "",
      daysRemaining: " ",
     
    });
  }

    render() {
      return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newTransaction}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="MeterNumber">MeterNumber</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.MeterNumber}
                  onChange={this.onChangeMeterNumber}
                  name="MeterNumber"
                />
              </div>
              <div className="form-group">
                <label htmlFor="currentElectricityToken">Token</label>
                <input
                  type="text"
                  className="form-control"
                  id="Token"
                  required
                  value={this.state.Token}
                  onChange={this.onChangeCurrentElectricityToken}
                  name="Token"
                />
              </div>
              <div className="form-group">
                <label htmlFor="remainingDays">remainingDays</label>
                <input
                  type="text"
                  className="form-control"
                  id="remainingDays"
                  required
                  value={this.state.remainingDays}
                  onChange={this.onChangeRemainingDays}
                  name="remainingDays"
                />
              </div>
              <button onClick={this.saveTransaction} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    }
}
export default connect(null, { createTransaction })(AddTransaction);