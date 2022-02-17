import {
    CREATE_TRANSACTION,
    RETRIEVE_TRANSACTION,
    UPDATE_TRANSACTION,
    DELETE_TRANSACTION,
    DELETE_ALL_TRANSACTIONS
  } from "./types";
  import TransactionDataService from "../services/transaction.service";

  export const CREATE_TRANSACTION = (meterNumber, currentElectricityToken,DaysRemaining) => async (dispatch) => {
    try {
      const res = await TransactionDataService.create({ meterNumber, currentElectricityToken,DaysRemaining });
      dispatch({
        type: CREATE_TRANSACTION,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const retrieveTransactions= () => async (dispatch) => {
    try {
      const res = await TransactionDataService.getAll();
      dispatch({
        type:RETRIEVE_TRANSACTION,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const updateTransaction = (id, data) => async (dispatch) => {
    try {
      const res = await TransactionDataService.update(id, data);
      dispatch({
        type:  UPDATE_TRANSACTION,
        payload: data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const deleteTransaction = (id) => async (dispatch) => {
    try {
      await TransactionDataService.delete(id);
      dispatch({
        type: DELETE_TRANSACTION,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const deleteAllTransactions = () => async (dispatch) => {
    try {
      const res = await TransactionDataService.deleteAll();
      dispatch({
        type:DELETE_ALL_TRANSACTIONS,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const findTutorialsByMeterNumber = (meterNumber) => async (dispatch) => {
    try {
      const res = await TransactionDataService.findByMeterNumber(meterNumber);
      dispatch({
        type: RETRIEVE_TRANSACTION,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };