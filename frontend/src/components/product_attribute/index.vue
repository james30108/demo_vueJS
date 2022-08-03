<script>
    import services from "../../services/setting_product_attribute"
    export default {
        name: "Product Attribute",
        data () {
            return {
                data : [],
                value: {
                    product_attribute_id     : null,
                    product_attribute_name   : null,
                    product_attribute_detail : [""],
                },
            }
        },
        methods: {
            get_all () {

                services.get_all()
                .then((response) => {
                    this.data = response.data
                    console.log(response.data)
                })
                .catch(function (error) {
                    console.log(error)
                })
                this.$forceUpdate()
            },
            get_one (id) {

                services.get_one(id)
                .then((response) => {
                    this.data  = response.data.product_attribute
                    this.value = {
                        product_attribute_id    : response.data.product_attribute_id,
                        product_attribute_name  : response.data.product_attribute_name,
                        product_attribute_detail: response.data.product_attribute_detail
                    }
                    console.log(response.data)
                })
                .catch(function (error) {
                    console.log(error)
                })
                this.$forceUpdate()
            },
            save () {
                
                services.create(this.value)
                .then((response) => {
                    this.get_all ()
                    this.reset ()
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error);
                })
                
            },
            update () {
                services.update(this.value.product_attribute_id, this.value)
                .then((response) => {
                    this.get_all ()
                    this.reset ()
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error);
                })
            },
            delete_one (id) {
                
                services.delete(id)
                .then((response) => {
                    this.get_all()
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
                
            },
            form_submit () {
                this.value.product_attribute_id ? this.update () : this.save ()
            },
            delete_attribute (index) {

                if (index != 0) {
                    console.log (index)
                    this.value.product_attribute_detail.splice(index, 1)
                }
                
            },
            add_attribute () {

                this.value.product_attribute_detail.push("")
                
            },
            reset () {
                this.value.product_attribute_id    = null
                this.value.product_attribute_name  = null
                this.value.product_attribute_detail = [""]
                //this.get_all ()
            },
            
        },
        mounted () {
            this.get_all ()
            this.$forceUpdate ()
        }
    }
</script>

<template>
    <title>คุณสมบัติสินค้า</title>
    {{ JSON.stringify(value) }}
    <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-3">คุณสมบัติสินค้า</h4>
        <div class="row">
            <div class="col-12 col-sm-6">
                <div class="card mb-3">
                    <div class="card-body">
                        <form id="formsubmit" @submit.prevent="form_submit">
                        <input 
                            type="hidden"
                            name="product_attribute_id"
                            v-model.trim="value.product_attribute_id"
                        >
                        <div class="row">
                            <div class="mb-3">
                                <label for="product_attribute_name" class="form-label">หัวข้อคุณสมบัติ</label>
                                <input
                                    class="form-control"
                                    type="text"
                                    id="product_attribute_name"
                                    placeholder="หัวข้อคุณสมบัติ"
                                    name="product_attribute_name"
                                    v-model.trim="value.product_attribute_name"
                                    autofocus
                                    required
                                />
                            </div>
                        </div>
                        <hr>
                        <label for="product_attribute_detail" class="form-label">รายละเอียด</label>
                        <div 
                            v-for="(item, index) in value.product_attribute_detail"
                            class="input-group mb-3"
                        >
                            <input
                            class="form-control"
                            type="text"
                            id="product_attribute_detail"
                            placeholder="รายละเอียด"
                            name="product_attribute_detail"
                            v-model.trim="value.product_attribute_detail[index]"
                            required
                            />
                            <button class="btn btn-outline-success" type="button" @click="add_attribute" v-if="(value.product_attribute_detail.length - 1) === index">เพิ่ม</button>
                            <button class="btn btn-outline-danger" type="button" @click="delete_attribute (index)">ลบ</button>
                        </div>
                        <hr>
                        <div class="mt-2">
                            <button type="submit" class="btn btn-primary me-2">บันทึก</button>
                            <button type="reset" class="btn btn-outline-secondary" @click="reset">ยกเลิก</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6">

        <div class="card">
        <h5 class="card-header">รายการ</h5>
        
        <div class="table-responsive text-nowrap">
            <table class="table mb-3">
            <thead>
                <tr>
                    <th>#</th>
                    <th>หัวข้อ</th>
                    <th>จัดการ</th>
                </tr>
            </thead>
            <tbody class="table-border-bottom-0 ">
                <tr v-for="(item, index) in data">
                    <td>{{ index + 1 }}</td>
                    <td><button @click="get_one(item.product_attribute_id)" class="bg-transparent border-0 text-primary">{{ item.product_attribute_name }}</button></td>
                    <td>
                        <button @click="delete_one(item.product_attribute_id)" class="me-1 bg-transparent border-0"><i class="bx bx-trash me-1 font-22 text-primary"></i></button> 
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>
            </div>
        </div>
        
        
        
        
        
    </div>
</template>