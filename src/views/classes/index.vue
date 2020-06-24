<template>
  <div class="app-container">
    <el-button type="primary" ref="addtype" @click="goto" style="margin-bottom:20px;">添加课程分类</el-button>
    <el-table
      v-loading="listLoading"
      :data="lists"
      show-header
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="课程编号" width="80">
        <template slot-scope="scope">
          {{ scope.row.sid }}
        </template>
      </el-table-column>
      <el-table-column label="课程名称" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="课程类型" width="90" align="center">
        <template slot-scope="scope">
          {{ scope.row.typeName }}
        </template>
      </el-table-column>
      <el-table-column label="任课教师" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.byAdminName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="售价" width="110" align="center">
        <template slot-scope="scope">
          ￥{{ +scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="课程简介" align="center">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isShow | statusFilter" @click="handleChange(scope.$index, scope.row)" style="cursor:pointer">{{ +scope.row.isShow === 1 ? '上架' : '下架' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="xiugai" label="编辑" width="380" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleWatch(scope.$index, scope.row)">查看</el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
          size="mini"
          @click="handleAdd(scope.$index, scope.row)">添加内容</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="PageSize"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :total="totals">
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: "Classes",
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
      listLoading: true,
      istrue: null,
      totals: null,
      currentPage: 1,
      PageSize:10
    }
  },
  created() {
    this.getlist().then(() => {
      this.getuserlst()
    })
  },
  methods: {
    handleAdd(index, row) {
      this.$router.push({path: '/classes/addles', query: {sid: row.sid}})
    },
    handleWatch() {
      return
    },
    goto() {
      if(this.$refs.addtype.$el.innerText==="添加课程分类")
        this.$router.push({path: '/classes/typelist'})
    },
    handleCurrentChange(val) {
      this.currentPage=val
      this.getuserlst()
    },
    handleEdit(index,row) {
      // 编辑用户资料
      this.$router.push({name:'Classadd',query:{sid:row.sid}})
      return false
    },
    handleChange(index,row) {
      // 改变用户是否为启用，还是禁用
      
      let fdata = {
        flag: 1,
        sid: row.sid,
        isShow: 0
      }
      if(+row.isShow === 1){
        fdata.isShow = 0
      }
      else{
        fdata.isShow = 1
      }
      this.$store.dispatch('classes/getsetsubjinfo',fdata).then(res => {
        this.getuserlst()
      }).catch(err => {
        console.log(err)
      })
      return false
    },
    getlist() {
      let fetdata = {
        flag: 0
      }
      return new Promise((resolve, reject) => { 
        this.$store.dispatch('classes/getsubjlist',fetdata).then(res =>{
          this.listLoading = false
          this.totals = res.count
          resolve()
        }).catch(err => {
          reject(err)
        })
      }) 
      this.listLoading = true

    },
    getuserlst() {
      let fetdata = {
        flag: 1,
        startID: (this.currentPage-1)*this.PageSize,
        count: this.PageSize
      }
      this.$store.dispatch('classes/getsubjlist',fetdata).then(response =>{
          [...this.lists] = response.list
        }).catch(error =>{
          console.log(error)
        })
    }
  }
}
</script>
