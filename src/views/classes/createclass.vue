<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="课程名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="任课教师">
        <el-select v-model="form.byAdminID" placeholder="请选择">
          <el-option
            v-for="item in teachers"
            :key="item.uid"
            :label="item.username"
            :value="item.uid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input v-model="form.price" type="number" placeholder="请设置价格" />
      </el-form-item>
      <el-form-item label="课程类型">
        <el-select v-model="form.type" placeholder="请选择课程类型">
          <el-option
            v-for="item in typelists"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :http-request="picupload"
          >
          <img v-if="form.icon" :src="form.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="是否上架">
        <el-select v-model="form.isShow" placeholder="请选择用户状态">
          <el-option label="上架" value="1" />
          <el-option label="下架" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="课程简介">
        <el-input v-model="form.description" type="textarea" :rows="2"/>
      </el-form-item>
      <el-form-item label="课程描述">
        <mavon-editor v-model="form.detail" ref="md" @imgAdd="$imgAdd" @change="change"/>
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
  name: 'Classadd',
  data() {
    return {
      form: {
        name: '',
        byAdminID: '',
        price: '',
        type: '',
        joinMethod: 1,
        icon: '',
        detail: '',
        description: '',
        isShow: ''
      },
      text: '创建',
      teachers:[],
      count: 0,
      isgai: false,
      typelists: [],
      changehtml: ''
    }
  },
  mounted() {
    if(this.$route.query.sid){
      let fetdata = {
        flag: 0,
        sid: this.$route.query.sid
      }
      this.$store.dispatch('classes/getsetsubjinfo',fetdata).then(res => {
        this.form = {
          ...res,
        }
        this.form.byAdminID = String(res.byAdminID)
        this.form.type = String(res.typeID)
        this.isgai = true
        this.text = '修改'
      }).catch(err => {
        console.log(err)
      })
    }
    let userdata = {
      flag: 0,
      byType: 7
    }
    this.$store.dispatch('user/usersearch',userdata).then(res => {
      this.teachers = res.data.list
    }).catch(err => {
      console.log(err)
    })
    this.getlist().then(() => {
      this.gettypelst()
    })
  },
  methods: {
    $imgAdd(pos, $file) {
      var reader = new FileReader();
        
      reader.readAsDataURL($file)
      reader.onload = (event=>{
        let types = $file.type.split('/')

        let fget = {
          flag: 1,
          type: types[1],
          base64: event.target.result,
          path: 'image'
        }
        this.$store.dispatch('classes/upload',fget).then(res =>{
          if(res.url){
            this.$refs.md.$img2Url(pos, res.url);
          }
        })
      })
    },
    change(value, render){
      // render 为 markdown 解析后的结果
      
      // console.log(render)
      this.changehtml = render
    },
    picupload(file) {
      if(this.checkhege(file.file)){
        var reader = new FileReader();
        
        reader.readAsDataURL(file.file)
        reader.onload = (event=>{
          let types = file.file.type.split('/')

          let fget = {
            flag: 1,
            type: types[1],
            base64: event.target.result,
            path: 'image'
          }
          this.$store.dispatch('classes/upload',fget).then(res =>{
            if(res.url){
              this.form.icon = res.url
            }
          })
        })
      }
    },
    onSubmit() {
      
      if(this.isgai){
        this.form.flag = 1
        this.form.detail = this.changehtml
        var tijiao = {
          ...this.form
        }
        this.$store.dispatch('classes/getsetsubjinfo',tijiao).then(res=>{
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$router.push({path: '/classes/index'})
        }).catch(err => {
          console.log(err)
        })
      }else{
        this.$store.dispatch('classes/addsubj',this.form).then(res=>{
          if(res.id){
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            this.$router.push({path: '/classes/index'})
          }
          
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
    },
    getlist() {
      let fetdata = {
        flag: 0
      }
      return new Promise((resolve, reject) => { 
        this.$store.dispatch('classes/stypelist',fetdata).then(res =>{
          if(this.count > res.count)
            this.count = res.count
          resolve()
        }).catch(err => {
          reject(err)
        })
      }) 
    },
    gettypelst() {
      let fetdata = {
        flag: 1,
        startID: this.startID,
        count: this.totals
      }
      this.$store.dispatch('classes/stypelist',fetdata).then(response =>{
          [...this.typelists] = response.list
        }).catch(error =>{
          console.log(error)
        })
    },
    checkhege(file) {
      const isJPEG = file.type === 'image/jpeg';
      const isJPG = file.type === 'image/jpg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!(isJPG || isPNG || isJPG)) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return ((isJPG || isPNG || isJPG) && isLt2M);
    },
    handleAvatarSuccess() {
      return
    }
  }
}
</script>

<style lang="scss">
.line{
  text-align: center;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
