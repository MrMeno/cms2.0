<template>
      <div class="row" id='modes'>
      <div class="col col-md-3 text-center" id='tabs' style='padding-top:10px'  v-for='items in labelList'>
         {{items.adver_type_name}}
      </div>
 </div>
</template>
<script>
  import $ from 'jquery'
    export default {
  name: 'modules',
  props: ['labelList'],
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
<style>

   
</style>
