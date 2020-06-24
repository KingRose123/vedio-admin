<template>
  <div class="app-container">
    <el-button type="primary" @click="dialogFormVisible = true">添加章节</el-button>
    <div class="addtop" v-for="(tag, i) in constlist" :key="i">
      <el-tag 
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
        show-file-list="false"
      >
        {{tag.name}}
      </el-tag>
      <div
        class="sss"
        v-for="(item, index) in [].slice.call(tag.list)"
        :key="index"
      >
        <el-input class="sss-flex-1" placeholder="请输入课程名称" v-model="item.name"></el-input>
        <el-input class="sss-flex-3 input-with-select" placeholder="请输入播放地址" v-model="item.url">
          <el-select v-model="item.select" slot="prepend" placeholder="请选择">
            <el-option label="bilibili" value="bilibili"></el-option>
            <el-option label="优酷" value="youku"></el-option>
            <el-option label="本地" value="local"></el-option>
          </el-select>
          <el-upload
            v-if="item.select === 'local'"
            slot="append"
            :http-request="(opt) => handleuploadfile(opt,i,index)"
            :on-change="handleonchange(i,index)"
            action="#"
          >上传</el-upload>
        </el-input>
        <el-button style="margin-left:10px" type="danger" @click="deleteon(i,index)">删除</el-button>
      </div>
      <div style="margin-top:20px"><el-button type="primary" @click="addsomeon(i)">添加播放</el-button></div>
    </div>
    <el-dialog title="添加章节" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="章节名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addyes">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import Qs from 'qs'
export default {
  name: 'Addles',
  data(){
    return{
      constlist:[{
        name: 'ads',
        list: [{name:'423',select:'',url:'42'},{name:'23',select:'',url:'42'}]
      },{
        name: '123',
        list: [{name:'423',select:'',url:'42'},{name:'23',select:'',url:'42'}]
      }],
      form: {
        name: '',
        subjID: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      thisi: null,
      thisindex: null
    }
  },
  mounted() {
    if(this.$route.query.sid){
      this.form.subjID = this.$route.query.sid
    }else{
      this.$router.push({path: '/classes/index'})
    }
  },
  methods:{
    handleuploadfile(opt,i,index) {
      console.log(opt,i,index)
      if(opt.file){
        var file = opt.file
        var types = opt.file.type.split('/')
        if(types[1] === 'mpeg'){
          types[1] = 'mp3'
        }
        if(types[1] === 'x-matroska'){
          types[1] = 'mkv'
        }
        var reader = new FileReader();
        let formData = new FormData()
        
        reader.readAsDataURL (file)

        reader.onload = (e => { 
          formData.append('file', reader.result)
          let fget = {
            base64: reader.result,
            flag: 1,
            type: types[1],
            path: 'vedio'
          }
          this.$store.dispatch('classes/upload',fget).then(res=>{
            console.log(res)
          })
          // let myAxios = axios.create({
          //     baseURL: 'https://api.aeui.cn',
          //     timeout: 60000,
          //     withCredentials: true,
          //     headers: {
          //         'Content-Type': 'multipart/form-data',
          //         uid:this.$store.getters.uid,
          //         sign:this.$store.getters.token,
          //         type:types[1],
          //         flag:1,
          //         path:'vedio'
          //     }
          //     ,
          //     transformRequest: [function (data) {
          //       // Do whatever you want to transform the data
          //       return Qs.stringify(data);
          //     }],
          // });
          // myAxios.post('/admin/upload',fget).then(res=>{
          //   console.log(res)
          // }).catch(err=>{
          //   console.log(err)
          // })
          // console.log(axios)
          // this.constlist[i].list[index].url = res.url
        //   var xhr = new XMLHttpRequest()

        //   xhr.open('POST', 'https://api.aeui.cn/admin/upload')
        //   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        //   xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
        //   xhr.setRequestHeader('flag', 0)
        //   xhr.setRequestHeader('sign', this.$store.getters.token)
        //   xhr.setRequestHeader('uid', this.$store.getters.uid)
        //   xhr.setRequestHeader('path', 'vedio')
        //   xhr.setRequestHeader('type', types[1])
        //   xhr.send(reader.result)
        //   xhr.onload = (res)=>{
        //      // onloadend readyState => 4
        //      // 请求响应过程结束的时候触发
        //      console.log(res.currentTarget.response)
        //   }
        })
      }
    },
    handleonchange(i,index) {
      let ofi = i
      let ofindex = index
      // this.handleuploadfile()
    },
    addsomeon(index) {
      this.constlist[index].list.push({name:'',select:'',url:''})
    },
    deleteon(i,index) {
      if(this.constlist[i].list.length > 1)
        this.constlist[i].list.splice(index, 1)
      else
        this.$message({
          type: 'warning',
          message: '至少有一个课程，不能删除!'
        })
      return
    },
    handleClose(tag) {
      this.constlist.splice(this.constlist.indexOf(tag),1)
    },
    addyes() {
      this.$store.dispatch('classes/addsec')
    },
  }
}
</script>

<style lang="scss">
.addtop{
  margin-top:20px
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.sss{
  margin-top: 20px;
  display: flex;
  .sss-flex-1{
    flex:1
  }
  .sss-flex-3{
    flex: 6;
  }
}
.el-input-group__append .el-upload-list{
  display: none;
}
</style>