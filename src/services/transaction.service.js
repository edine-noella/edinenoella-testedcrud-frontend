import http from "../http-common";
class TransactionDataService {
  getAll() {
    return http.get("/Transactions");
  }
  get(id) {
    return http.get(`/Transaction/${id}`);
  }
  create(data) {
    return http.post("/Transaction", data);
  }
  update(id, data) {
    return http.put(`/Transactions/${id}`, data);
  }
  delete(id) {
    return http.delete(`/Transaction/${id}`);
  }
  deleteAll() {
    return http.delete(`/Transactions`);
  }
  findByMeterNumber(meterNumber) {
    return http.get(`/Transaction?meterNumber=${meterNumber}`);
  }
 
}
export default new TransactionDataService();