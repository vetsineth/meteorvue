<template>
  <div class="home">
      <el-container>
            <el-main>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-card :body-style="{ padding: '5px' }">
                    <img src="http://pngimg.com/uploads/student/student_PNG166.png" class="image">
                    <div style="padding: 14px;">
                        <span>Student Info</span>
                        <div class="bottom clearfix">
                        <span class="countData" >{{ currentData }} record</span>
                        <el-button type="text" class="button">
                            <router-link :to="{name :'student'}">Student</router-link>
                        </el-button>
                        </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card :body-style="{ padding: '5px' }">
                    <img src="http://pngimg.com/uploads/student/student_PNG166.png" class="image">
                    <div style="padding: 14px;">
                        <span>Student Info</span>
                        <div class="bottom clearfix">
                        <span class="countData" >{{ currentData }} record</span>
                        <el-button type="text" class="button">
                            <router-link :to="{name :'student'}">Student</router-link>
                        </el-button>
                        </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="6">
                  <el-card :body-style="{ padding: '5px' }">
                    <img src="http://pngimg.com/uploads/student/student_PNG166.png" class="image">
                    <div style="padding: 14px;">
                        <span>Student Info</span>
                        <div class="bottom clearfix">
                        <span class="countData" >{{ currentData }} record</span>
                        <el-button type="text" class="button">
                            <router-link :to="{name :'student'}">Student</router-link>
                        </el-button>
                        </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="6">
                  <el-card :body-style="{ padding: '5px' }">
                    <img src="http://pngimg.com/uploads/student/student_PNG166.png" class="image">
                    <div style="padding: 14px;">
                        <span>Product</span>
                        <div class="bottom clearfix">
                        <span class="countData" >{{ currentData }} record</span>
                        <el-button type="text" class="button">
                            <router-link :to="{name :'student'}">Student</router-link>
                        </el-button>
                        </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
              
            </el-main>
      </el-container>
  </div>
</template>

<script>
import {Meteor} from 'meteor/meteor';
export default {
  data() {
    return {
      currentData:''
    };
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      Meteor.call('countStudentData',(err,res)=>{
        return this.currentData=res
      })
    }
  }
};
</script>

<style scoped>
.countData {
    font-size: 15px;
    color:red;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }
.button a {
    text-decoration: none;
}
  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

</style>
