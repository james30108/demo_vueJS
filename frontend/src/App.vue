<script>
import sidebar from './components/sidebar.vue'
import navbar from './components/header.vue'
import content from './components/content.vue'

export default {
  name: "Demo",
  components: {
    sidebar, 
    navbar,
    content
  },
  data() {
    return {
        sidebar_status : false
    }
  },
  methods: {

    sidebar_open (data) {
      this.sidebar_status = data
      console.log (this.sidebar_status)
    },
    sidebar_close (data) {
      this.sidebar_status = data
      console.log (this.sidebar_status)
    },
    
  }
}
</script>

<template>
    <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <sidebar @sidebar_close="sidebar_close" :sidebar_toggle="sidebar_status"/>
      <div class="layout-page">
        <navbar @sidebar_open="sidebar_open" :sidebar_toggle="sidebar_status"/>
          <div class="content-wrapper">
            <content/>
          </div>
      </div>
    </div>
    <div class="layout-overlay layout-menu-toggle"></div>
  </div>
</template>
