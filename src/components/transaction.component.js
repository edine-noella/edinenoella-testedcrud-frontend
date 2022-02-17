import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTransaction, deleteTransaction } from "../actions/Transactions";
import TransactionDataService from "../services/Transaction.service";
class Transaction extends Component {
  constructor(props) {
    super(props);
    this.onChangeMeterNumber = this.onChangeMeterNumber.bind(this);
    this.onChangeCurrentElectricityToken = this.onChangeCurrentElectricityToken.bind(this);
    this.onChangeDaysRemaining = this.onChangeDaysRemaining.bind(this);
    this.getTransaction = this.getTransaction.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeTransaction = this.removeTransaction.bind(this);
    this.state = {
      currentTransaction: {
        id: null,
        MeterNumber: "",
        CurrentElectricityToken: "",
        DaysRemaining: "",
      },
      message: "",
    };
  }
  componentDidMount() {
    this.getTransaction(this.props.match.params.id);
  }
  onChangeMeterNumber(e) {
    const MeterNumber = e.target.value;
    this.setState(function (prevState) {
      return {
        currentTransaction: {
          ...prevState.currentTransaction,
          MeterNumber: MeterNumber,
        },
      };
    });
  }
  onChangeCurrentElectricityToken(e) {
    const CurrentElectricityToken = e.target.value;
    this.setState((prevState) => ({
      currentTransaction: {
        ...prevState.currentTransaction,
        CurrentElectricityToken: CurrentElectricityToken,
      },
    }));
  }

  onChangeRemainigDays(e) {
    const DaysRemaining = e.target.value;
    this.setState((prevState) => ({
      currentTransaction: {
        ...prevState.currentTransaction,
        DaysRemaining: DaysRemaining,
      },
    }));
  }
  getTransaction(id) {
    TransactionDataService.get(id)
      .then((response) => {
        this.setState({
          currentTransaction: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  updateStatus(status) {
    var data = {
      id: this.state.currentTransaction.id,
      MeterNumber: this.state.currentTransaction.MeterNumber,
      CurrentElectricityToken: this.state.currentTransaction.CurrentElectricityToken,
      published: status,
    };
    this.props
      .updateTransaction(this.state.currentTransaction.id, data)
      .then((reponse) => {
        console.log(reponse);
        this.setState((prevState) => ({
          currentTransaction: {
            ...prevState.currentTransaction,
            published: status,
          },
        }));
        this.setState({ message: "The status was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  updateContent() {
    this.props
      .updateTransaction(this.state.currentTransaction.id, this.state.currentTransaction)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The Transaction was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  removeTransaction() {
    this.props
      .deleteTransaction(this.state.currentTransaction.id)
      .then(() => {
        this.props.history.push("/Transactions");
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    const { currentTransaction } = this.state;
    return (
      <div>
        {currentTransaction ? (
          <div className="edit-form">
            <h4>Transaction</h4>
            <form>
              <div className="form-group">
                <label htmlFor="meterNumber">MeterNumber</label>
                <input
                  type="text"
                  className="form-control"
                  id="meterNumber"
                  value={currentTransaction.meterNumber}
                  onChange={this.onChangeMeterNumber}
                />
              </div>
              <div className="form-group">
                <label htmlFor="currentElectricityToken">Token</label>
                <input
                  type="text"
                  className="form-control"
                  id="currentElectricityToken"
                  value={currentTransaction.currentElectricityToken}
                  onChange={this.onChangeCurrentElectricityToken}
                />
              </div>

              <div className="form-group">
                <label htmlFor="remainingDays">remainingDays</label>
                <input
                  type="text"
                  className="form-control"
                  id="remainingDays"
                  value={currentTransaction.remainingDays}
                  onChange={this.onChangeRemainingDays}
                />
              </div>

            </form>
            {/* {currentTransaction.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(true)}
              >
                Publish
              </button>
            )} */}
            <button
              className="badge badge-danger mr-2"
              onClick={this.removeTransaction}
            >
              Delete
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Transaction...</p>
          </div>
        )}
      </div>
    );
  }
}
export default connect(null, { updateTransaction, deleteTransaction })(Transaction);