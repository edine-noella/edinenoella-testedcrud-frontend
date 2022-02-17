import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveTransactions, findTransactionsByMeterNumber, deleteAllTransactions} from "../actions/transactions";
class TransactionsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchMeterNumber = this.onChangeMeterNumber.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveTransaction = this.setActiveTransaction.bind(this);
    this.findByMeterNumber = this.findByMeterNumber.bind(this);
    this.removeAllTransactions = this.removeAllTransactions.bind(this);
    this.state = {
      currentTransaction: null,
      currentIndex: -1,
      searchMeterNumber: "",
    };
  }
  componentDidMount() {
    this.props.retrieveTransactions();
  }
  onChangeSearchMeterNumber(e) {
    const searchMeterNumber = e.target.value;
    this.setState({
      searchMeterNumber: searchMeterNumber,
    });
  }
  refreshData() {
    this.setState({
      currentTransaction: null,
      currentIndex: -1,
    });
  }
  setActiveTransaction(Transaction, index) {
    this.setState({
      currentTransaction: transaction,
      currentIndex: index,
    });
  }
  removeAllTransactions() {
    this.props
      .deleteAllTransactions()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  findByMeterNumber() {
    this.refreshData();
    this.props.findByMeterNumber(this.state.searchMeterNumber);
  }
  render() {
    const { searchMeterNumber, currentTransaction, currentIndex } = this.state;
    const { Transactions } = this.props;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by MeterNumber"
              value={searchMeterNumber}
              onChange={this.onChangeSearchMeterNumber}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByMeterNumber}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Transactions List</h4>
          <ul className="list-group">
            {Transactions &&
              Transactions.map((Transaction, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTransaction(Transaction, index)}
                  key={index}
                >
                  {Transaction.MeterNumber}
                </li>
              ))}
          </ul>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTransactions}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTransaction ? (
            <div>
              <h4>Transaction</h4>
              <div>
                <label>
                  <strong>MeterNumber:</strong>
                </label>{" "}
                {currentTransaction.MeterNumber}
              </div>
              <div>
                <label>
                  <strong>currentElectricityToken:</strong>
                </label>{" "}
                {currentTransaction.currentElectricityToken}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTransaction.published ? "Published" : "Pending"}
              </div>
              <Link
                to={"/Transactions/" + currentTransaction.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Transaction...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
  };
};
export default connect(mapStateToProps, { retrieveTransactions, findTransactionsByMeterNumber, deleteAllTransactions})(TransactionsList);