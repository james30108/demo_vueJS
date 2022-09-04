<script>
    import services from "../../services/setting_product_type";
    export default {
        name: "Product Type",
        data () {
            return {
                data : [],
                value: {
                    product_type_id     : null,
                    product_type_name   : null,
                    product_type_code   : null,
                }
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
                    this.data  = response.data.product_type
                    this.value = {
                        product_type_id   : response.data.product_type_id,
                        product_type_name : response.data.product_type_name,
                        product_type_code : response.data.product_type_code
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
                services.update(this.value.product_type_id, this.value)
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
                this.value.product_type_id ? this.update () : this.save ()
            },
            reset () {
                this.value.product_type_id   = null
                this.value.product_type_name = null
                this.value.product_type_code = null
                this.get_all ()
            }

        },
        mounted () {
            this.get_all ()
            this.$forceUpdate ()
        }
    }
</script>

<template>
    <title>ประเภทสินค้า</title>
    <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4">ประเภทสินค้า</h4>
        <div class="card mb-3">
            <div class="card-body">
                <form id="formsubmit" @submit.prevent="form_submit">
                <input 
                    type="hidden"
                    name="product_type_id"
                    v-model.trim="value.product_type_id"
                >
                <div class="row">
                    <div class="mb-3 col-md-6">
                        <label for="product_type_code" class="form-label">รหัสประเภท</label>
                        <input
                            class="form-control"
                            type="text"
                            id="product_type_code"
                            placeholder="รหัสประเภท"
                            name="product_type_code"
                            v-model.trim="value.product_type_code"
                            autofocus
                        />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label class="form-label" for="product_type_name">ประเภทสินค้า</label>
                        <input
                            type="text"
                            id="product_type_name"
                            class="form-control"
                            name="product_type_name"
                            placeholder="ประเภทสินค้า"
                            v-model.trim="value.product_type_name"
                            />
                    </div>
                </div>
                <div class="mt-2">
                    <button type="submit" class="btn btn-primary me-2">บันทึก</button>
                    <button type="reset" class="btn btn-outline-secondary" @click="reset">ยกเลิก</button>
                </div>
                </form>
            </div>
        </div>
        
        <!-- Basic Bootstrap Table -->
        <div class="card">
        <h5 class="card-header">ตำแหน่ง</h5>
        
        <div class="table-responsive text-nowrap">
            <table class="table mb-3">
            <thead>
                <tr>
                    <th>#</th>
                    <th>รหัสประเภท</th>
                    <th>ประเภทสินค้า</th>
                    <th>จัดการ</th>
                </tr>
            </thead>
            <tbody class="table-border-bottom-0 ">
                <tr v-for="(item, index) in data">
                    <td>{{ index + 1 }}</td>
                    <td><button @click="get_one(item.product_type_id)" class="bg-transparent border-0 text-primary">{{ item.product_type_name }}</button></td>
                    <td>{{ item.product_type_code }}</td>
                    <td>
                        <button @click="delete_one(item.product_type_id)" class="me-1 bg-transparent border-0"><i class="bx bx-trash me-1 font-22 text-primary"></i></button> 
                    </td>
                </tr>
            </tbody>
            </table>

        </div>
        </div>
    </div>
</template>