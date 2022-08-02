import http from "../http_common";
class ProductType {
  get_all(params) {
    return http.get("/product_type", { params });
  }
  get_one(id) {
    return http.get(`/product_type/${id}`);
  }
  create(data) {
    return http.post("/product_type", data);
  }
  update(id, data) {
    return http.put(`/product_type/${id}`, data);
  }
  delete(id) {
    return http.delete(`/product_type/${id}`);
  }
}
export default new ProductType();