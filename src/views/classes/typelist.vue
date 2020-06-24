<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom:20px;" @click="dialogFormVisible = true">添加课程分类</el-button>
    <el-table
      v-loading="listLoading"
      :data="lists.slice((currentPage-1)*PageSize,currentPage*PageSize)"
      show-header
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="分类名称" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="分类介绍" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.mark }}
        </template>
      </el-table-column>
      <el-table-column prop="xiugai" label="编辑" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:20px"
      background
      layout="prev, pager, next"
      :page-size="PageSize"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :total="totals">
    </el-pagination>
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="typeform">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="typeform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类介绍" :label-width="formLabelWidth">
          <el-input v-model="typeform.mark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onupload">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "Typelist",
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      lists: [],
      list: [],
      startID: 0,
      count: 20,
      listLoading: true,
      istrue: null,
      totals: null,
      currentPage: 1,
      PageSize:20,
      typeform:{
        name: '',
        mark: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      isgai: false,
      tijiaoid: null
    }
  },
  created() {
    this.getlist().then(() => {
      this.gettypelst()
    })
  },
  methods: {
    onupload() {
      if(this.isgai){
        let fdata = {
          flag: 1,
          tid: this.tijiaoid,
          ...this.typeform
        }
        this.$store.dispatch('classes/getsetstypeinfo',fdata).then(res=>{
          if(res.status){
            this.$message({
              type:'success',
              message: '修改成功'
            })
            this.dialogFormVisible = false
            this.getuserlst()
          }
        })
      }else{
        this.$store.dispatch('classes/addtype',this.typeform).then(res => {
          if(res.id){
            this.getuserlst()
            this.dialogFormVisible = false
            this.$message({
              type:'success',
              message: '添加成功'
            })
          }
        }).catch(err=> {
          console.log(err)
        })
      }
      
    },
    handleCurrentChange(val) {
      this.currentPage=val
    },
    handleEdit(index,row) {
      // 编辑用户资料
      let fdata = {
        flag: 0,
        tid: row.id
      }
      this.dialogFormVisible = true
      this.$store.dispatch('classes/getsetstypeinfo',fdata).then(res=>{
        this.isgai = true
        this.typeform = {
          ...res
        }
        this.tijiaoid = row.id
      })
      return false
    },
    getlist() {
      let fetdata = {
        flag: 0
      }
      return new Promise((resolve, reject) => { 
        this.$store.dispatch('classes/stypelist',fetdata).then(res =>{
          this.listLoading = false
          
          if(this.count > res.count)
            this.count = res.count
          this.totals = res.count
          resolve()
        }).catch(err => {
          reject(err)
        })
      }) 
      this.listLoading = true

    },
    gettypelst() {
      let fetdata = {
        flag: 1,
        startID: this.startID,
        count: this.totals
      }
      this.$store.dispatch('classes/stypelist',fetdata).then(response =>{
          [...this.lists] = response.list
        }).catch(error =>{
          console.log(error)
        })
    }
  }
}
</script>
