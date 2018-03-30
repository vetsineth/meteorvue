<template>
  <div class="student">
      <h1 style="text-align:center;margin-bottom:-20px;">Student</h1>
      <el-container>
          
          <el-main>
            <div>
              <el-form :rules="rules" :model="form" :ref="form" size="mini">
                    <el-form-item label="FirstName" prop="first">
                        <el-input v-model="form.first"></el-input>
                        <input v-model="form.id" type="hidden">
                    </el-form-item>
                    <el-form-item label="LastName" prop="last">
                        <el-input v-model="form.last"></el-input>
                    </el-form-item>
                    <el-form-item label="Gender" prop="gender">
                        <el-select v-model="form.gender" placeholder="Select Gender">
                            <el-option
                                v-for="item in genders"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="DOB" prop="dob">
                         <el-date-picker
                            v-model="form.dob"
                            type="date"
                            placeholder="Pick a day"
                            format="yyyy/MM/dd" 
                            value-format="yyyy-MM-dd"
                            >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="Telephone" prop="tel">
                        <el-input v-model="form.tel"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSaveData(form)" size="mini">{{form.cap}}</el-button>
                    </el-form-item>
              </el-form>
            </div>
            <div>
              <el-input v-model="search" @keyup.native="handleSearch" size="mini" class="input-with-select" placeholder="Enter to Search">
                  <el-select v-model="opt" slot="prepend" placeholder="Select">
                    <el-option value="name.first" label="FirstName"></el-option>
                    <el-option value="name.last" label="LastName"></el-option>
                  </el-select>
              </el-input>
              <div style="margin:10px 0px 10px 0px;">
                <el-select v-model="showoption" size="mini" @change="handleChang">
                  <el-option value="10" label="10 row"></el-option>
                  <el-option value="50" label="50 row"></el-option>
                  <el-option value="100" label="100 row"></el-option>
                </el-select>
              </div>
              <el-table
              :data="tableData"
              style="width: 100%"
              v-loading = "loading"
              :default-sort="{prop:'name.first',order:'descending'}"
              >
                <el-table-column
                  prop="name[first]"
                  label="FirstName"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="name[last]"
                  label="LastName"
                >
                </el-table-column>
                <el-table-column
                  prop="gender"
                  label="Gender"
                  
                >
                </el-table-column>
                <el-table-column
                  prop="dob"
                  label="DOB"
                  
                >
                </el-table-column>
                <el-table-column
                  prop="tel"
                  label="Gender"
                  :formatter="formater"
                >
                </el-table-column>
                <el-table-column
                  label="Option"
                >
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleRemove(scope.$index,scope.row)" type="danger" icon="el-icon-delete"></el-button>
                  <el-button size="mini" @click="handleEdit(scope.$index,scope.row)" type="primary" icon="el-icon-edit" ></el-button>
                </template>
                </el-table-column>
              </el-table>
            </div>
            <div style="text-align:center">
              <el-pagination
                small
                layout="prev,pager,next"
                :total="1000"
              >
              </el-pagination>
            </div>
          </el-main> 
      </el-container>
  </div>
</template>
<script>
import { Meteor } from "meteor/meteor";
export default {
  data() {
    return {
      genders: [
        {
          value: "Male",
          label: "Male"
        },
        {
          value: "Female",
          labale: "Female"
        }
      ],
      form: {
        id: "",
        first: "",
        last: "",
        gender: "",
        dob: "",
        tel: "",
        cap: "Save"
      },
      rules: {
        first: [
          { required: true, message: "Please input FirstName", trigger: "blur" }
        ],
        last: [
          { required: true, message: "Please input LastName", trigger: "blur" }
        ],
        gender: [
          { required: true, message: "Please Select Gender", trigger: "blur" }
        ],
        dob: [
          {
            required: true,
            message: "Please Input Date of Birth",
            trigger: "blur"
          }
        ]
      },
      tableData: [],
      search: "",
      opt: "name.first",
      loading: false,
      showoption: "10",
      countItem:1000
    };
  },
  created() {
    this.loadData()
  
  },
  methods: {
    handleSaveData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {
            name: {
              first: this.form.first,
              last: this.form.last
            },
            gender: this.form.gender,
            dob: this.form.dob,
            tel: this.form.tel
          };
          if (this.form.cap == "Save") {
            Meteor.call("insertStudentData", obj, (error, result) => {
              this.$message({
                message: "ការក្សាទុកបានជោគជ័យ!",
                type: "success"
              });
            });
            this.clearData();
          } else if (this.form.cap == "Update") {
            Meteor.call("updateStudentData", this.form.id, obj, (err, res) => {
              this.$message({
                message: "ការកែប្រែទទួលបានជោគជ័យ!",
                type: "success"
              });
            });
            this.form.cap = "Save";
            this.clearData();
          }
          this.loadData();
        } else {
          this.$message({
            message: "ការក្សាទុកមិនបានជោគជ័យ!",
            type: "error"
          });
          return false;
        }
      });
    },
    loadData() {
      // let num = this.showoption
      // num = Number(num)
      // Meteor.call("getAllStudentData", num,(error, result) => {
      //   this.tableData = result;
      // });
      this.handleChang()
    },
    handleRemove(index, row) {
      this.$confirm("តើអ្នកចង់លុបទិន្ន័យនេះមែនទេ?", "Warning", {
        confirmButtonText: "យល់ព្រម",
        cancelButtonText: "ទេ",
        type: "warning"
      })
        .then(() => {
          Meteor.call("removeStudentData", row._id, (err, res) => {
            this.$message({
              type: "success",
              message: "លុបទទួលបានជោគជ័យ"
            });
          });
          this.loadData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "ទិន្ន័យមិនបានលុបចេញទេ"
          });
        });
    },
    clearData() {
      this.form.first = "";
      this.form.last = "";
      this.form.gender = "";
      this.form.dob = "";
      this.form.tel = "";
    },
    handleEdit(index, row) {
      this.form.cap = "Update";
      this.form.id = row._id;
      this.form.first = row.name.first;
      this.form.last = row.name.last;
      this.form.gender = row.gender;
      this.form.dob = row.dob;
      this.form.tel = row.tel;
    },
    handleSearch() {
      let key = this.opt;
      let val = this.search;
      let obj = { key };
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        if (val != null) {
          Meteor.call("findOneStudentData", obj, val, (err, result) => {
            this.tableData = result;
          });
        } else {
          this.loadData();
        }
      }, 500);
    },
    handleChang(){
      let num = this.showoption
      num = Number(num)
      Meteor.call("getAllStudentData", num,(error, result) => {
        this.tableData = result;
      });
    },
    formater(row, column){
      console.log(row.tel)
      return row.tel
    }
  },
  getData(){
      Meteor.call('countStudentData',(err,res)=>{
        return this.countItem=res
      })
    }
};
</script>
<style>
.el-select .el-input {
  width: 150px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
