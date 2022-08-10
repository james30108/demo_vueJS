<script>
    import services from "../../services/setting_product";
    export default {
        name: "Product Manage",
        data () {
            return {
                data             : {},
                product_type     : null,
                product_attribute: [],
                sale_type        : false,
            }
        },
        methods: {
            get_form () {
                
                services.get_form()
                .then((response) => {
                    this.product_type = response.data.product_type
                    response.data.product_attribute.forEach(element => {

                        this.product_attribute.push({
                            product_attribute_id     : element.product_attribute_id,
                            product_attribute_name   : element.product_attribute_name,
                            product_attribute_detail : JSON.parse (element.product_attribute_detail)
                        })
                            
                        this.data.product_attribute[element.product_attribute_id] = ""
                    })
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error);
                })
            
            },
            save () {
                
                services.create(this.value)
                .then((response) => {
                    // this.get_all ()
                    // this.reset ()
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error);
                })
            
            },
            form_submit () {
                this.value.product_id ? this.update () : this.save ()
            },
            sale_type_button () {
                this.sale_type = !this.sale_type
            },
        },
        mounted () {
            this.get_form ()
            this.data = this.$route.params.product_id ? this.$route.params : { product_type : "", product_attribute : {} }
        }
    }
</script>

<template>
    <title>จัดการสินค้า</title>
    <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4">จัดการสินค้า</h4>
        {{ JSON.stringify(sale_type) }}
        <form id="formsubmit" @submit.prevent="form_submit">
        <div class="card mb-3">
            <div class="card-body">
                <input 
                    type="hidden"
                    name="product_id"
                    v-model.trim="data.product_id"
                >
                <div class="row g-3">
                    <div class="col-md-6">
                        <label for="product_name" class="form-label">ชื่อสินค้า</label>
                        <input
                            class="form-control"
                            type="text"
                            id="product_name"
                            placeholder="ชื่อสินค้า"
                            name="product_name"
                            v-model.trim="data.product_name"
                            autofocus
                        />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label" for="product_code">รหัสสินค้า</label>
                        <input
                            type="text"
                            id="product_code"
                            class="form-control"
                            name="product_code"
                            placeholder="รหัสสินค้า"
                            v-model.trim="data.product_code"
                            />
                    </div>
                    <div class="mb-3 col-12">
                       <label for="product_type" class="form-label">ประเภทสินค้า</label>
                        <select 
                            id="product_type" 
                            class="form-select" 
                            v-model.trim="data.product_type"
                            name="product_type"
                        >
                            <option value="">ประเภทสินค้า</option>
                            <option 
                                v-for="(item, idex) in product_type"
                                :value="item.product_type_id"
                            >
                                {{ item.product_type_name }}
                            </option>
                        </select>
                    </div>
                    <div class="col-12">
                        <label class="form-label" for="product_description">รายละเอียดสินค้า</label>
                        <textarea
                            id="product_description"
                            class="form-control"
                            name="product_description"
                            placeholder="รายละเอียดสินค้า"
                            v-model.trim="data.product_description"
                        >
                        </textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-body">
                <h5>คุณลักษณะของสินค้า</h5>
                <div class="row">
                    <div 
                        v-for="(item, index) in product_attribute"
                        class="mb-3 col-6" 
                    >
                        <label for="product_type" class="form-label">{{ item.product_attribute_name }}</label>
                        <select 
                            id="product_attribute" 
                            class="form-select" 
                            v-model.trim="data.product_attribute[item.product_attribute_id]"
                        >
                            <option value="">คุณลักษณะของสินค้า</option>
                            <option 
                                v-for="(item_detail) in item.product_attribute_detail"
                                :value="item_detail"
                            >
                                {{ item_detail }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-body">
                <h5>การขาย</h5>
                <div class="row g-3">
                    <div class="col-12 d-grid">
                        <button class="btn btn-primary" @click="sale_type_button">เปิดใช้งานตัวเลือกสินค้า</button>
                    </div>
                    <div v-if="sale_type" class="col-12">
                        <div class="row">
                            <div class="col-6">
                                <label for="product_price" class="form-label">ราคาสินค้า</label>
                                <input
                                    class="form-control"
                                    type="text"
                                    id="product_price"
                                    placeholder="ราคาสินค้า"
                                    name="product_price"
                                    v-model.trim="data.product_price"
                                    
                                />
                            </div>
                            <div class="col-6">
                                <label for="product_quantity" class="form-label">จำนวนสินค้า</label>
                                <input
                                    class="form-control"
                                    type="text"
                                    id="product_quantity"
                                    placeholder="จำนวนสินค้า"
                                    name="product_quantity"
                                    v-model.trim="data.product_quantity"
                                    
                                />
                            </div>
                        </div>
                    </div>
                    <div v-else="sale_type" class="col-12">
                        <div class="card">
                            <div class="card-header">ตัวเลือกที่ 1</div>
                            <div class="card-body d-flex">
                                
                                    <div class="col-6 mx-auto">
                                        <div class="my-3">
                                            <label for="product_detail_name" class="form-label">ชื่อหมวดหมู่</label>
                                            <input
                                                class="form-control"
                                                type="text"
                                                id="product_detail_name"
                                                placeholder="ตัวเลือกสินค้า เช่น ไซส์, ขนาด, ประเภท"
                                                name="product_detail_name"
                                                v-model.trim="data.product_detail_name"
                                                
                                            />
                                        </div>
                                        <div class="my-3">
                                            <label for="product_detail_name" class="form-label">ตัวเลือกสินค้า</label>
                                            <input
                                                class="form-control"
                                                type="text"
                                                id="product_detail_name"
                                                placeholder="ข้อมูลของตัวเลือกสินค้า เช่น สีแดง, สีดำ, ไซส์ S, ไซส์ M"
                                                name="product_detail_name"
                                                v-model.trim="data.product_detail_name"
                                                
                                            />
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-2">
                    <button type="submit" class="btn btn-primary me-2">บันทึก</button>
                    <button type="reset" class="btn btn-outline-secondary" @click="reset">ยกเลิก</button>
                </div>
            </div>
        </div>
        </form>
    </div>
</template>