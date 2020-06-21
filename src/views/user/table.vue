<template>
  <div class="app-container">
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
      <el-table-column label="用户名" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户类型" width="110" align="center">
        <template slot-scope="scope">
          {{ +scope.row.code === 9 ? '管理员' : +scope.row.code === 7 ? '教师' : '普通用户' }}
        </template>
      </el-table-column>
      <el-table-column label="最后登录地址" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.loginIP }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="注册时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="xiugai" label="编辑" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">禁用</el-button>
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
  name: "UTable",
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
    }
  },
  created() {
    
    this.getlist()
    this.getuserlst()
    
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage=val
    },
    handleEdit(index,row) {
      // 编辑用户资料
      this.$router.push({name:'Uadd',query:{uid:row.uid}})
      return false
    },
    handleDelete() {
      // 改变用户是否为启用，还是禁用
      return false
    },
    getlist() {
      let fetdata = {
        flag: 0
      }
      this.listLoading = true
      this.$store.dispatch('user/getList',fetdata).then(res =>{
        this.listLoading = false
        if(res.errcode === 0){
          if(this.count > res.data.count)
            this.count = res.data.count
          this.totals = res.data.count
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getuserlst() {
      let fetdata = {
        flag: 1,
        startID: this.startID,
        count: this.totals
      }
      this.$store.dispatch('user/getList',fetdata).then(response =>{
          [...this.lists] = response.data.list
        }).catch(error =>{
          console.log(error)
        })
    }
  }
}
</script>
