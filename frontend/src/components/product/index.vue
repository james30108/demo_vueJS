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

            <!-- Modal -->
            <div class="modal fade" id="basicModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog" role="document">
                <div class="modal-content">
                <form id="formsubmit" @submit.prevent="onSubmit">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel1">ค้นหาพนักงาน</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                    </div>
                    <div class="modal-body">
                    <div class="row">
                        <div class="col mb-3">
                        <label for="name" class="form-label">ชื่อ</label>
                        <input type="text" id="nameBasic" class="form-control" placeholder="Enter Name" name="employee_name" v-model.trim="employee_name"/>
                        </div>
                    </div>
                    <div class="row g-2">
                        <div class="col mb-0">
                        <label for="emailBasic" class="form-label">ตำแหน่ง</label>
                        <input type="text" id="emailBasic" class="form-control" placeholder="xxxx@xxx.xx" v-model.trim="employee_department"/>
                        </div>
                        <div class="col mb-0">
                        <label for="dobBasic" class="form-label">เบอร์โทร</label>
                        <input type="text" id="dobBasic" class="form-control" placeholder="XXX-XXXX-XXX" v-model.trim="employee_tel"/>
                        </div>
                    </div>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button type="button" class="btn btn-primary" @click="find_all">ค้นหา</button>
                    </div>
                </form>
                </div>
                </div>
            </div>
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