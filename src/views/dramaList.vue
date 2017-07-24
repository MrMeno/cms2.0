<template>
    <div style='background-color:white'>
        <div class="row" style='padding: 20px;min-height: 600px'>
            <div class="row text-left">
                <div class="col col-md-12">
                    <h4>
                        <strong style="padding:5px">
                                产品列表
                        </strong>
                    </h4>
                </div>
            </div>
            <div class="row" style='padding-top:30px'>
                <div class="col col-md-11 col-md-offset-1">

                <el-table :data="tableData" style="width: 90%;font-size:12px">
                    <el-table-column prop="name" label="影视剧">
                    </el-table-column>
                    <el-table-column label="题材">
                         <template scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ scope.row.dramaTypeList }}</p>
                                <div slot="reference" class="name-wrapper">
                                    {{ scope.row.dramaType }}
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column  label="导演">
                        <template scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ scope.row.directorList }}</p>
                                <div slot="reference" class="name-wrapper">
                                    {{ scope.row.director }}
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column label="编剧">
                         <template scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ scope.row.screenwriterList }}</p>
                                <div slot="reference" class="name-wrapper">
                                    {{ scope.row.screenwriter }}
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                     <el-table-column label="主演">
                         <template scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ scope.row.actorList }}</p>
                                <div slot="reference" class="name-wrapper">
                                    {{ scope.row.actor}}
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                     <el-table-column label="出品公司">
                          <template scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ scope.row.companyList }}</p>
                                <div slot="reference" class="name-wrapper">
                                    {{ scope.row.company }}
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                     <el-table-column  label="操作" width="120">
                    <template scope="scope">
                         <router-link :to="{path:'/userCenter/edMedia',query:{id:scope.row.id}}">编辑</router-link>&nbsp;&nbsp;&nbsp;
                        <el-button @click.native.prevent="deleteRow(scope.$index,tableData)" type='text'> 
                            <a>删除</a><!--炒饭的样式，偷懒-->
                        </el-button>
                    </template>
                   </el-table-column>
                </el-table>                     
                </div>
            </div>
            <div class="row text-center" style='padding-top:30px'>
               <div class="col col-md-11">
                    <div class="block">
                    <el-pagination 
                    @current-change="handleCurrentChange" 
                    :current-page.sync="currentPage1" 
                    layout="total, prev, pager, next"
                    :total="total">
                    </el-pagination>
                </div>
               </div>
            </div>
        </div>
    </div> 
</template>
<script>
import $ from 'jquery'
import axios from 'axios'
export default {
    mounted() {
        this.getAdvisory(this.page);
    },
    data() {
        return {
            currentPage1: 1,
            page: 1,
            rows: 10,
            total: 0,
            tableData: []
        }
    }, methods: {
        handleCurrentChange(val) {
            this.getAdvisory(val);
        },
        getAdvisory(page) {
            let self = this;
            axios.get('/home/media/list?page=' + page + '&rows=' + self.rows).then(function (res) {
                if (res.status == 200 && res.data.ret == 0) {
                    self.total = res.data.records;
                    self.page = page;
                    self.tableData = self.funData(res.data.data);
                }
            });
        },
        deleteRow(index, rows) {
             var id = rows[index].id;
            let self = this;
            this.$confirm('删除该记录?', '提示', {
             confirmButtonText: '确定',
            cancelButtonText: '取消',
             type: 'warning'
        }).then(() => {
            axios.delete('/home/media?id=' + id).then(function (res) {
                if (res.status == 200 && res.data.ret == 0) {
                    self.getAdvisory(self.page);
                    self.$message.success({showClose: true,
                      message: '删除成功',
                       type: 'success',
                       duration:1000
                   });
                }
                else{
                    self.$message.error('网络异常!');
                }
            });
        }).catch(() => {
          this.$message.info({
            showClose: true,
            message: '已取消删除',
            duration:1000
          });          
        });
        },
        funData(obj) {
            var arry = new Array();
            $.each(obj, function (index, item) {
                var company = '';
                var companyList = '';
                $.each(item.companyList, function (c_index, c_item) {
                    if (0 == c_index) {
                        company = c_item.companyName;
                    }
                    companyList += c_item.companyName;

                });

                var dramaType = '';
                var dramaTypeList = '';
                $.each(item.dramaTypeList, function (t_index, d_item) {
                    if (0 == t_index) {
                        dramaType = d_item.drama_type_name;
                    }
                    dramaTypeList += d_item.drama_type_name;
                });

                var actor = '';
                var actorList = '';
                $.each(item.actorList, function (a_index, a_item) {
                    if (0 == a_index) {
                        actor = a_item.staff_name;
                    }
                    actorList += a_item.staff_name;
                });

                var director = '';
                var directorList = '';
                $.each(item.directorList, function (d_index, d_item) {
                    if (0 == d_index) {
                        director = d_item.staff_name;
                    }
                    directorList += d_item.staff_name;
                });

                var screenwriter = '';
                var screenwriterList = '';
                $.each(item.screenwriterList, function (s_index, s_item) {
                    if (0 == s_index) {
                        screenwriter = s_item.staff_name;
                    }
                    screenwriterList += s_item.staff_name;
                });

                var drama = { 
                     id: item.id,
                     name: item.name, 
                     companyList:companyList,
                     company: company, 
                     dramaTypeList:dramaTypeList,
                     dramaType: dramaType,
                     actorList:actorList,
                     actor: actor, 
                     directorList:directorList,
                     director: director,
                     screenwriterList:screenwriterList,
                     screenwriter: screenwriter
                     };
                arry.push(drama);
            });
            return arry;
        }
    }
}
  </script>
  <style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>