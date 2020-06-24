<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="form.type" placeholder="请选择用户类型">
          <el-option label="普通用户" value="0" />
          <el-option label="教师" value="7" />
          <el-option label="管理员" value="9" />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="form.phone" type="text" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" type="text" placeholder="请输入邮箱号" />
      </el-form-item>
      <el-form-item label="用户状态">
        <el-select v-model="form.code" placeholder="请选择用户状态">
          <el-option label="正常" value="0" />
          <el-option label="禁用" value="-1" />
          <el-option label="管理员" value="9" />
        </el-select>
      </el-form-item>
      <el-form-item label="用户性别">
        <el-radio-group v-model="form.gender">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{this.text}}</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Uadd',
  data() {
    return {
      form: {
        name: '',
        nickname: '',
        password: '',
        type: '',
        phone: '',
        email: '',
        code: '',
        gender: ''
      },
      pandun:{
        username: '',
        email: '',
        phone: ''
      },
      text: '创建',
      isgai: false,
    }
  },
  mounted() {
    if(this.$route.query.uid){
      let fetdata = {
        flag: 0,
        uid: this.$route.query.uid
      }
      this.$store.dispatch('user/setgetuserInfo',fetdata).then(res => {
        this.pandun.username = res.username
        this.pandun.email = res.email
        res.type = +res.type === 9 ? '管理员' : +res.type === 7 ? '教师' : '普通用户'
        res.code = +res.code === 9 ? '管理员' : +res.code === 0 ? '正常' : '禁用'
        let arr = res.phone.split('-')
        if(arr[1] !== undefined){
          res.phone = arr[1]
          this.pandun.phone = res.phone
        }
        res.gender = +res.gender === 0 ? '男' : '女'
        this.form = {
          ...res,
          password: ''
        }
        this.text = '修改'
        this.isgai = true
      }).catch(err => {
        console.log(err)
      })
    }
  },
  methods: {
    onSubmit() {
      
      if(this.isgai){
        this.form.flag = 1
        var tijiao = {
          ...this.form
        }
        if(this.form.password === ''){
          delete tijiao.password
        }
        if( this.form.username === this.pandun.username ){
          delete tijiao.username
        }
        if( this.form.phone == this.pandun.phone ){
          delete tijiao.phone
        }
        if( this.pandun.email === this.form.email ){
          delete tijiao.email
        }
        this.$store.dispatch('user/setgetuserInfo',tijiao).then(res=>{
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$router.push({path: '/user/table'})
        }).catch(err => {
          console.log(err)
        })
      }else{
        this.$store.dispatch('user/adduser',this.form).then(res=>{
          this.$message({
            message: res.errmsg,
            type: 'success'
          })
          this.$router.push({path: '/user/table'})
        }).catch(err => {
          console.log(err)
        })
      }
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

