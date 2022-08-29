<script>
    import services from "../../services/setting_product";
    export default {
        name: "Product",
        data () {
            return {
                data : [],
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
                    this.$router.push({
                        name: 'product_manage',
                        params: response.data
                    })
                })
                .catch(function (error) {
                    console.log(error)
                })
                this.$forceUpdate()
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
        },
        mounted () {
            this.get_all ()
            this.$forceUpdate ()
        }
    }
</script>

<template>
    <title>สินค้า</title>
    <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4">สินค้า</h4>
        <div class="d-flex">
            <router-link to="/product_manage" class="btn btn-success text-white mb-3 mx-1">เพิ่มสินค้า</router-link>
        
            <!-- Button trigger modal -->
            <button
                type="button"
                class="btn btn-outline-primary mb-3 mx-1"
                data-bs-toggle="modal"
                data-bs-target="#basicModal"
            >
                ค้นหา
            </button>
            <button type="button" class="btn btn-outline-secondary mb-3 mx-1" @click="reset">คืนค่า</button>

            
        </div>
        <div class="card">
        <h5 class="card-header">รายการ</h5>
        
        <div class="table-responsive text-nowrap">
            <table class="table mb-3">
            <thead>
                <tr>
                    <th>#</th>
                    <th>รูปสินค้า</th>
                    <th>ชื่อสินค้า</th>
                    <th>รหัสสินค้า</th>
                    <th>ราคา</th>
                    <th>คลัง</th>
                    <th>ยอดขาย</th>
                    <th>จัดการ</th>
                </tr>
            </thead>
            <tbody class="table-border-bottom-0 ">
                <tr v-for="(item, index) in data">
                    <td>{{ index + 1 }}</td>
                    <td><img 
                            v-if="item.product_image_cover != '' "
                            :src="item.product_image_cover" 
                            class="d-block rounded"
                            height="100"
                            width="100"
                        >
                        <img 
                            v-else="item.product_image_cover != '' "
                            src="../../assets/img/avatars/1.png" 
                            class="d-block rounded"
                            height="100"
                            width="100"
                        >
                    </td>
                    <td><button @click="get_one(item.product_id)" class="bg-transparent border-0 text-primary">{{ item.product_name }}</button></td>
                    <td>{{ item.product_code }}</td>
                    <td>{{ item.product_code }}</td>
                    <td>{{ item.product_code }}</td>
                    <td>{{ item.product_code }}</td>
                    <td>
                        <button @click="delete_one(item.product_id)" class="me-1 bg-transparent border-0"><i class="bx bx-trash me-1 font-22 text-primary"></i></button> 
                    </td>
                </tr>
            </tbody>
            </table>

        </div>
        </div>
    </div>
</template>