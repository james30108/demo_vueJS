
<script>
export default {
    name: "Header",
    props: ["sidebar_toggle"],
    data () {
        return {
            sidebar_status  : this.sidebar_toggle,
        }
    },
    watch: { 
        sidebar_toggle: function(newVal, oldVal) { // watch it
            this.sidebar_status = newVal
        }
    },
    methods: {
        sidebar_open () {
            this.sidebar_status = !this.sidebar_status
            this.$emit("sidebar_open", this.sidebar_status)
        }
    }
}
</script>

<template>

    <nav
        class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar"
        >
        <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
            <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)" @click="sidebar_open">
            <i class="bx bx-menu bx-sm"></i>
            </a>
        </div>

        <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
            <!-- Search -->
            <div class="navbar-nav align-items-center">
            <div class="nav-item d-flex align-items-center">
                VueJS Demo
            </div>
            </div>
            <!-- /Search -->

            <ul class="navbar-nav flex-row align-items-center ms-auto">

            <!-- User -->
            <li class="nav-item navbar-dropdown dropdown-user dropdown">
                <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                <div class="avatar avatar-online">
                    <img src="/assets/img/avatars/1.png"  class="w-px-40 h-auto rounded-circle" />
                </div>
                </a>
            </li>
            <!--/ User -->
            </ul>
        </div>
    </nav>
</template>