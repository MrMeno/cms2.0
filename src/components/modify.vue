<template>
       <div class="row text-left">
            <div class="col col-md-2">
              {{name}}
            </div>
            <div class="col col-md-4">
              <el-input v-show='modify' v-model='data'></el-input>
              <span v-show='!modify'>data</span>
            </div>
          </div>
</template>
<script>
    export default {
  name: 'md-input',
  props: ['modify','data','name'],
  data(){
      return{
      }
  },
  mounted(){
  
  },
  computed:{
  },
  methods:{
  }
    }
</script>
