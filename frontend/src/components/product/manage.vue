<script>
    import services from "../../services/setting_product";
    export default {
        name: "Product Manage",
        data () {
            return {
                data             : {
                    product_id          : "", 
                    product_type        : "", 
                    product_attribute   : {},
                    product_detail      : [],
                    product_wait_status : 0,
                    product_condition   : 0,
                    product_sub1        : { name : "", child : [] },
                    product_sub2        : { name : "", child : [] }
                },
                product_type     : null,
                product_attribute: [],
                sub1            : false,
                sub2            : false,
                image_cover     : "../../assets/img/avatars/1.png",
                image           : [
                    "../../assets/img/avatars/1.png",
                    "../../assets/img/avatars/1.png",
                    "../../assets/img/avatars/1.png",
                    "../../assets/img/avatars/1.png",
                    "../../assets/img/avatars/1.png",
                ]
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
                    //console.log(response)
                })
                .catch((error) => {
                    console.log(error);
                })
            
            },
            save () {
                
                const formsubmit = document.getElementById('formsubmit')
                const form       = new FormData(formsubmit)
                form.append("data", JSON.stringify(this.data))
                const main_data  = [this.data, form]

                services.create(form)
                .then((response) => {
                    console.log(response)
                    this.$router.push("product")
                })
                .catch((error) => {
                    console.log(error);
                })
            },
            form_submit () {
                this.data.product_id ? this.update () : this.save ()
            },
            sub1_button () {
                this.sub1 = !this.sub1
                if (this.sub1 === false) {
                    this.data.product_sub1.child = []
                    this.data.product_sub1.name  = ""
                    this.data.product_detail = []
                }
                else {
                    this.data.product_sub1.child.push ({ id : 1, name : ""})
                    this.data.product_detail.push ({ product_detail_sub1 : 1, child : [{}] })
                }
            },
            add_sub1 () {
                const id = this.data.product_sub1.child[0] ? this.data.product_sub1.child.at(-1).id + 1 : 1
                this.data.product_sub1.child.push ({ id : id, name : "" })
                
                // Insert data to Product_detail
                this.data.product_detail.push ({ product_detail_sub1 : id, child : [{}] })
    
                // Insert Catagory2 to Product_detail
                if (this.data.product_sub2.child.length > 0) {
                    
                    this.data.product_sub2.child.forEach((element) => {
                        
                        this.data.product_detail.at(-1).child.push ({ product_detail_sub2 : element.id })
                    })
                } 
                
            },
            sub2_button () {
                this.sub2 = !this.sub2
                if (this.sub2 === false) {
                    this.data.product_sub2.child = []
                    this.data.product_sub2.name  = ""
                    // Delete Catagory2 in product_detail
                    this.data.product_detail.forEach ((element) => {
                        element.child = [{}]
                    })
                }
                else {
                    this.data.product_sub2.child.push ({ id : 1, name : ""})
                    // Delete Catagory2 in product_detail
                    this.data.product_detail.forEach ((element) => {
                        element.child[0] = {product_detail_sub2 : 1}
                    })
                }
                
            },
            cancel () {
                this.$router.push("product")
            },
            delete_sub1 (index) {
                this.data.product_sub1.child.splice(index, 1)
                this.data.product_detail.splice(index, 1)
            },
            add_sub2 () {
                const id = this.data.product_sub2.child[0] ? this.data.product_sub2.child.at(-1).id + 1 : 1
                this.data.product_sub2.child.push ({ id : id, name : "" })
                
                // Insert Catagory2 to Product_detail
                this.data.product_detail.forEach((element) => {
                    element.child.push({product_detail_sub2 : id})
                })
                
            },
            delete_sub2 (index) {
                this.data.product_sub2.child.splice(index, 1)

                // Delete Catagory2 in product_detail
                this.data.product_detail.forEach ((element) => {
                    element.child.splice(index, 1)
                })
            },
            upload_cover () {
                this.image_cover = URL.createObjectURL(this.$refs.image_cover.files[0])
                console.log (this.$refs.image_cover)
            },
            upload_file (index) {
                console.log (index)
                this.image[index] = URL.createObjectURL(this.$refs.image[index].files[0])
                
            },
        },
        mounted () {

            if (this.$route.params.product_id) {

                this.data = this.$route.params
                
                // จัดการข้อมูลแบบฟอร์ม
                this.product_type        = JSON.parse (this.$route.params.form_product_type)

                // จัดการรูปภาพ
                if (this.$route.params.product_image_cover != "") this.image_cover = this.$route.params.product_image_cover
                
                const product_attribute  = JSON.parse (this.$route.params.form_product_attribute)
                product_attribute.forEach(element => {

                    this.product_attribute.push({
                        product_attribute_id     : element.product_attribute_id,
                        product_attribute_name   : element.product_attribute_name,
                        product_attribute_detail : JSON.parse (element.product_attribute_detail)
                    })
                })
                this.data.product_attribute = JSON.parse (this.$route.params.product_attribute)

                // จัดการข้อมูลรายละเอียดสินค้า
                if (this.$route.params.product_sub1 != "") {
                    this.sub1                   = true
                    this.data.product_sub1      = JSON.parse (this.$route.params.product_sub1)
                    this.data.product_detail    = JSON.parse (this.$route.params.product_detail)
                    this.$route.params.product_sub1.child.forEach ((element, index) => this.data.product_sub1.child[index] = JSON.parse (element))
                    
                    for (let x in this.$route.params.product_detail) {
                        for (let y in this.$route.params.product_detail[x].child) {
                            //onsole.log (this.$route.params.product_detail[x].child[y])
                            this.data.product_detail[x].child[y] = JSON.parse (this.$route.params.product_detail[x].child[y])
                        }
                    }
                    
                    //this.$route.params.product_detail[0].child.forEach ((element, index) => this.data.product_detail[0].child[index] = JSON.parse (element))
                }
                if (this.$route.params.product_sub2 != "") {
                    this.sub2 = true
                    this.data.product_sub2 = JSON.parse (this.$route.params.product_sub2)
                    this.$route.params.product_sub2.child.forEach ((element, index) => this.data.product_sub2.child[index] = JSON.parse (element))
                }
                console.log (this.data)
            }
            else {
                this.get_form ()
            }
            
        }
    }
</script>

<template>
    <title>จัดการสินค้า</title>
    {{ JSON.stringify(image_cover) }}
    <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4">จัดการสินค้า</h4>
        <form id="formsubmit" @submit.prevent="form_submit">
        <input type="hidden" name="product_id" v-model.trim="data.product_id">
        <div class="card mb-3">
            <div class="card-header"><h5>รูปสินค้า</h5></div>
            <div class="card-body">
                <div class="row">
                    <div class="col-6 col-sm-2 position-relative p-3">
                        <label for="file-input" class="position-relative">
                            <img 
                                :src="image_cover" 
                                class="d-block rounded"
                                height="120"
                                width="120"
                            >
                            <p class="position-absolute top-50 start-50 translate-middle">Upload</p>
                        </label>
                        <p class="m-1">รูปปก</p>
                        <input 
                            id="file-input"
                            type="file" 
                            ref="image_cover"
                            accept="image/png, image/jpeg"
                            name="product_image_cover" 
                            style="display: none;"
                            @change="upload_cover ()"
                        >
                    </div>
                    <div class="col-6 col-sm-2 position-relative p-3" v-for="index in 5" :key="index">
                        <label :for="'file_' + index" class="position-relative">
                            <img 
                                :src="image[index - 1]"
                                class="d-block rounded"
                                height="120"
                                width="120"
                            >
                            <p class="position-absolute top-50 start-50 translate-middle">Upload</p>
                        </label>
                        <p class="m-1">รูปที่ {{ index }}</p>
                        <input 
                            :id="'file_' + index"
                            type="file" 
                            ref="image"
                            accept="image/png, image/jpeg"
                            :name="'product_image_' + index" 
                            style="display: none;"
                            @change="upload_file ( index - 1 )"
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-header"><h5>ข้อมูลสินค้า</h5></div>
            <div class="card-body">
                <div class="row g-3">
                    <div class="col-md-6">
                        <label for="product_name" class="form-label">ชื่อสินค้า</label>
                        <input
                            class="form-control"
                            type="text"
                            id="product_name"
                            placeholder="ชื่อสินค้า"
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
                            placeholder="รายละเอียดสินค้า"
                            v-model.trim="data.product_description"
                        >
                        </textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-header"><h5>คุณลักษณะของสินค้า</h5></div>
            <div class="card-body">
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
            <!--
            {{ JSON.stringify(data.product_sub2) }} <br>
            {{ JSON.stringify(data) }} <br>     
            -->
            <div class="card-header"><h5>การขาย</h5></div>
            <div class="card-body">
                <div class="row g-3">
                    <div class="col-12 d-grid">
                        <button type="button" class="btn btn-primary" @click="sub1_button" v-if="!sub1">เปิดใช้งานตัวเลือกสินค้า</button>
                    </div>
                    <div v-if="sub1" class="col-12">
                        <div class="card border border-primary position-relative">
                            <div class="position-absolute top-0 end-0 m-3">
                                <button 
                                    type="button" 
                                    class="btn-close" 
                                    @click="sub1_button"
                                    v-if="!sub2"
                                ></button>
                            </div>
                            <div class="card-header">ตัวเลือกที่ 1</div>
                            <div class="card-body d-flex">
                                <div class="col-12 col-sm-6 mx-auto">
                                    <div class="my-3">
                                        <label for="product_sub1" class="form-label">ชื่อหมวดหมู่</label>
                                        <input
                                            class="form-control"
                                            type="text"
                                            id="product_sub1"
                                            placeholder="ตัวเลือกสินค้า เช่น ไซส์, ขนาด, ประเภท"
                                            v-model.trim="data.product_sub1.name"
                                            required
                                        />
                                    </div>
                                    <div 
                                        v-for="(item, index) in data.product_sub1.child"
                                        class="input-group my-3"
                                    >
                                        <input
                                            class="form-control"
                                            type="text"
                                            placeholder="ข้อมูลของตัวเลือกสินค้า เช่น สีแดง, สีดำ, ไซส์ S, ไซส์ M"
                                            v-model.trim="data.product_sub1.child[index].name"
                                            required
                                        />
                                        <button 
                                            class="btn btn-outline-danger" 
                                            type="button" 
                                            @click="delete_sub1 (index)" 
                                            v-if="index != 0"
                                        >
                                            ลบ
                                        </button>
                                    </div>
                                    <div class="col-12 d-grid mt-3">
                                        <button
                                            type="button"
                                            class="btn btn-primary" 
                                            @click="add_sub1 ()" 
                                            v-if="data.product_sub1.child.length < 10"
                                        >
                                            เพิ่มตัวเลือก
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 d-grid mt-3">
                            <button type="button" class="btn btn-primary" @click="sub2_button" v-if="!sub2">ตัวเลือกที่ 2</button>
                        </div>
                        <div class="card border border-primary position-relative" v-if="sub2">
                            <div class="position-absolute top-0 end-0 m-3">
                                <button type="button" class="btn-close" @click="sub2_button"></button>
                            </div>
                            <div class="card-header">ตัวเลือกที่ 2</div>
                                <div class="card-body d-flex">
                                <div class="col-12 col-sm-6 mx-auto">
                                    <div class="my-3">
                                        <label for="product_sub2" class="form-label">ชื่อหมวดหมู่</label>
                                        <input
                                            class="form-control"
                                            type="text"
                                            id="product_sub2"
                                            placeholder="ตัวเลือกสินค้า เช่น ไซส์, ขนาด, ประเภท"
                                            v-model.trim="data.product_sub2.name"
                                            required
                                        />
                                    </div>
                                    <div 
                                        v-for="(item, index) in data.product_sub2.child"
                                        class="input-group my-3"
                                    >
                                        <input
                                            class="form-control"
                                            type="text"
                                            placeholder="ข้อมูลของตัวเลือกสินค้า เช่น สีแดง, สีดำ, ไซส์ S, ไซส์ M"
                                            v-model.trim="data.product_sub2.child[index].name"
                                            required
                                        />
                                        <button 
                                            class="btn btn-outline-danger" 
                                            type="button" 
                                            @click="delete_sub2 (index)" 
                                            v-if="index != 0"
                                        >
                                            ลบ
                                        </button>
                                    </div>
                                    <div class="col-12 d-grid mt-3">
                                        <button 
                                            type="button" 
                                            class="btn btn-primary" 
                                            @click="add_sub2" 
                                            v-if="data.product_sub2.child.length < 10"
                                        >
                                            เพิ่มตัวเลือก
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h5 class="mt-5">รายการตัวเลือกสินค้า</h5>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>{{ data.product_sub1.name }}</th>
                                    <th width="250">รูปสินค้า</th>
                                    <th v-if="sub2">{{ data.product_sub2.name }}</th>
                                    <th width="200">ราคา</th>
                                    <th width="200">จำนวนสินค้า</th>
                                    <th width="250">รหัสสินค้า</th>
                                    
                                </tr>
                            </thead>
                            <tbody class="table-border-bottom-0" v-for="(item, index) in data.product_detail" v-if="sub2">
                                <tr>
                                    <td :rowspan="data.product_sub2.child.length + 1">{{ data.product_sub1.child.find(element => element.id === item.product_detail_sub1).name }}</td>
                                    <td :rowspan="data.product_sub2.child.length + 1" width="250">
                                        <input
                                        type="file"
                                        class="form-control"
                                        placeholder="รูปสินค้า"
                                        :name="'product_sub1_image_' + index"
                                        accept="image/png, image/jpeg"
                                        />
                                    </td>
                                </tr>
                                <tr v-for="(item2, index2) in data.product_detail[index].child">
                                    <td>{{ data.product_sub2.child.find(element => element.id === item2.product_detail_sub2).name }}</td>
                                    <td width="200">
                                        <input
                                        type="number"
                                        class="form-control"
                                        placeholder="ราคาสินค้า"
                                        v-model.trim="data.product_detail[index].child[index2].product_detail_price"
                                        />
                                    </td>
                                    <td width="200">
                                        <input
                                        type="number"
                                        class="form-control"
                                        placeholder="จำนวนสินค้า"
                                        v-model.trim="data.product_detail[index].child[index2].product_detail_quantity"
                                        />
                                    </td>
                                    <td width="250">
                                        <input
                                        type="text"
                                        class="form-control"
                                        placeholder="รหัสสินค้า"
                                        v-model.trim="data.product_detail[index].child[index2].product_detail_code"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                            <tbody class="table-border-bottom-0" v-else="sub2">
                                <tr v-for="(item, index) in data.product_detail">
                                    <td>{{ data.product_sub1.child.find(element => element.id === item.product_detail_sub1).name }}</td>
                                    <td width="250">
                                        <input
                                        type="file"
                                        class="form-control"
                                        placeholder="รูปสินค้า"
                                        :name="'product_sub1_image_' + index"
                                        accept="image/png, image/jpeg"
                                        />
                                    </td>
                                    <td width="200">
                                        <input
                                        type="number"
                                        class="form-control"
                                        placeholder="ราคาสินค้า"
                                        v-model.trim="data.product_detail[index].child[0].product_detail_price"
                                        />
                                    </td>
                                    <td width="200">
                                        <input
                                        type="number"
                                        class="form-control"
                                        placeholder="จำนวนสินค้า"
                                        v-model.trim="data.product_detail[index].child[0].product_detail_quantity"
                                        />
                                    </td>
                                    <td width="250">
                                        <input
                                        type="text"
                                        class="form-control"
                                        placeholder="รหัสสินค้า"
                                        v-model.trim="data.product_detail[index].child[0].product_detail_code"
                                        />
                                    </td>
                                </tr>
                            </tbody>                    
                        </table>
                    </div>
                    <div v-else="sub1" class="col-12">
                        <div class="row">
                            <div class="col-6">
                                <label for="product_price" class="form-label">ราคาสินค้า</label>
                                <input
                                    class="form-control"
                                    type="text"
                                    id="product_price"
                                    placeholder="ราคาสินค้า"
                                    v-model.trim="data.product_detail_price"
                                    required
                                />
                            </div>
                            <div class="col-6">
                                <label for="product_quantity" class="form-label">จำนวนสินค้า</label>
                                <input
                                    class="form-control"
                                    type="text"
                                    id="product_quantity"
                                    placeholder="จำนวนสินค้า"
                                    v-model.trim="data.product_detail_quantity"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-header"><h5>การขนส่ง</h5></div>
            <div class="card-body">
                <div class="row g-3">
                    <div class="col-12">
                        <label for="product_weight" class="form-label">น้ำหนัก</label>
                        <input
                            class="form-control"
                            type="text"
                            id="product_weight"
                            placeholder="น้ำหนัก (กิโลกรัม)"
                            v-model.trim="data.product_weight"
                        />
                    </div>
                    <div class="col-12 col-sm-4">
                        <label class="form-label" for="product_height">ความสูง</label>
                        <input
                            type="text"
                            id="product_height"
                            class="form-control"
                            placeholder="ความสูง (เซนติเมตร)"
                            v-model.trim="data.product_height"
                            />
                    </div>
                    <div class="col-12 col-sm-4">
                        <label class="form-label" for="product_width_x">ความกว้าง</label>
                        <input
                            type="text"
                            id="product_width_x"
                            class="form-control"
                            placeholder="ความกว้าง (เซนติเมตร)"
                            v-model.trim="data.product_width_x"
                            />
                    </div>
                    <div class="col-12 col-sm-4">
                        <label class="form-label" for="product_width_y">ความยาว</label>
                        <input
                            type="text"
                            id="product_width_y"
                            class="form-control"
                            placeholder="ความยาว (เซนติเมตร)"
                            v-model.trim="data.product_width_y"
                            />
                    </div>
                </div>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-header"><h5>อื่น ๆ</h5></div>
            <div class="card-body">
                <div class="row g-3">
                    <div class="col-12 col-sm-6">
                        <label for="product_wait_status" class="form-label">สินค้าจัดส่งนานกว่าปกติ (3-10 วัน)</label>
                        <select 
                            id="product_wait_status" 
                            class="form-select" 
                            v-model.trim="data.product_wait_status"
                        >
                            <option value="0">ไม่</option>
                            <option value="1">ใช่</option>
                        </select>
                    </div>
                    <div class="col-12 col-sm-6">
                        <label for="product_condition" class="form-label">สภาพสินค้า</label>
                        <select 
                            id="product_condition" 
                            class="form-select" 
                            v-model.trim="data.product_condition"
                        >
                            <option value="0">ของใหม่</option>
                            <option value="1">ของมือสอง</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-body">
                <button type="submit" class="btn btn-primary me-2">บันทึก</button>
                <button type="reset" class="btn btn-outline-secondary" @click="cancel">ยกเลิก</button>
            </div>
        </div>
        </form>
    </div>
</template>