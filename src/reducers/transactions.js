import {
    CREATE_TRANSACTION,
    RETRIEVE_TRANSACTION,
    UPDATE_TRANSACTION,
    DELETE_TRANSACTION,
    DELETE_ALL_TRANSACTIONS
  } from "../actions/types";

  const initialState = [];
  function transactionReducer(transaction = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case CREATE_TRANSACTION:
        return [...transactions, payload];
      case  RETRIEVE_TRANSACTION:
        return payload;
      case  UPDATE_TRANSACTION:
        return transactions.map((transaction) => {
          if (transaction.id === payload.id) {
            return {
              ...transaction,
              ...payload,
            };
          } else {
            return transaction;
          }
        });
      case DELETE_TRANSACTION:
        return transactions.filter(({ id }) => id !== payload.id);
      case DELETE_ALL_TRANSACTIONS:
        return [];
      default:
        return transactions;
    }
  };
  export default transactionReducer;