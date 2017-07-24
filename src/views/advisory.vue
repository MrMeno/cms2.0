<template>
    <div style='background-color:white'>
        <div class="row" style='padding: 20px;min-height: 600px'>
            <div class="row text-left">
                <div class="col col-md-12">
                    <h4>
                        <strong style="padding:5px">
                                咨询列表
                        </strong>
                    </h4>
                </div>
            </div>
            <div class="row" style='padding-top:30px'>
               <div class="col col-md-11 col-md-offset-1">
                    <el-table :data="tableData" style="width: 90%;font-size:12px">
                    <el-table-column prop="dramaName" label="影视剧" width="180">
                    </el-table-column>
                    <el-table-column prop="demand" label="植入需求" width="180">
                    </el-table-column>
                    <el-table-column prop="remark" label="回复信息">
                    </el-table-column>
                    <el-table-column prop="createDateTime" label="咨询时间">
                    </el-table-column>
                     <el-table-column  label="操作" width="120">
                    <template scope="scope">
                           <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                              删除
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
            axios.get('/home/user/advisory/list?page=' + page + '&rows=' + self.rows).then(function (res) {
                if (res.status == 200 && res.data.ret == 0) {
                    self.total = res.data.records;
                    self.page = page;
                    self.tableData = res.data.data;
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
            axios.delete('/home/user/advisory?id=' + id).then(function (res) {
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
        }
    }
}
  </script>