import http from "../http_common"
class Product {
  get_all(params) {
    return http.get("/product", { params })
  }
  get_form() {
    return http.get("/product/form")
  }
  get_one(id) {
    return http.get(`/product/${id}`)
  }
  create(data) {
    return http.post("/product", data)
  }
  update(id, data) {
    return http.put(`/product/${id}`, data)
  }
  delete(id) {
    return http.delete(`/product/${id}`)
  }
}
export default new Product()