import http from "../http_common";
class ProductAttribute {
  get_all(params) {
    return http.get("/product_attribute", { params });
  }
  get_one(id) {
    return http.get(`/product_attribute/${id}`);
  }
  create(data) {
    return http.post("/product_attribute", data);
  }
  update(id, data) {
    return http.put(`/product_attribute/${id}`, data);
  }
  delete(id) {
    return http.delete(`/product_attribute/${id}`);
  }
}
export default new ProductAttribute();