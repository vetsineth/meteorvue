<template  v-loading="loading2" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="product" v-loading="loading" label-width="120px">
      <div>
        <el-form :ref="form" :model="form" :rules="rules" size="mini">
          <el-form-item label="Item" prop="item">
            <el-input v-model="form.item"></el-input>
            <input type="hidden" v-model="form.id">
          </el-form-item>
          <el-form-item label="Price" prop="price">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.prevent="handleAddItem(form)" size="mini">{{form.value}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>  
        <div style="margin-bottom:10px">
          <el-input placeholder="Please input" @keyup.native="handleSearch" v-model="search" size="mini" >
          </el-input>
        </div>
        <el-table
          :data="tableData"
          border
          v-loading='loadingdata'
          style="width: 100%">
          <el-table-column
            prop="item"
            label="Item"
            >
          </el-table-column>
          <el-table-column
            prop="price"
            label="Price">
          </el-table-column>
          <el-table-column
            label="Operations"
            >
            <template slot-scope="scope">
              <el-button @click="handleRemove(scope.$index, scope.row)" type="primary" size="mini" icon="el-icon-delete" ></el-button>
              <el-button type="danger" @click="handleEdit(scope.$index, scope.row)" size="mini" icon="el-icon-edit" ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>
<script>
import { Meteor } from "meteor/meteor";
export default {
  props: ["myMessage"],
  data() {
    return {
      form: {
        item: "",
        price: "",
        id: "",
        value: "Add"
      },
      select: "",
      rules: {
        item: [
          { required: true, message: "Please input Item", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "Length should be 1 to 50",
            trigger: "blur"
          }
        ],
        price: [
          { required: true, message: "Please input Item", trigger: "blur" }
        ]
      },
      tableData: [],
      loading: false,
      search: "",
      loadingdata: false
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    handleAddItem(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            let obj = {
              item: this.form.item,
              price: this.form.price
            };
            if (this.form.value == "Add") {
              Meteor.call("insertData", obj, (error, result) => {
                this.$message({
                  message: "ការក្សាទុកបានជោគជ័យ!",
                  type: "success"
                });
                this.clearData();
                this.loadData();
              });
            } else if (this.form.value == "Update") {
              let id = this.form.id;
              Meteor.call("updateData", id, obj, (error, result) => {
                this.$message({
                  message: "ការកែប្រែទទួលបានជោគជ័យ!",
                  type: "success"
                });
                this.clearData();
                this.loadData();
              });
              this.form.value = "Add";
            }
          }, 200);
        } else {
          this.$message({
            message: "ការរក្សាទុកមិនបានជោគជ័យ!",
            type: "error"
          });
          return false;
        }
      });
    },
    loadData() {
      Meteor.call("getAllData", (error, result) => {
        this.tableData = result
      })
    },
    clearData() {
      this.form.item = "";
      this.form.price = "";
    },
    handleRemove(index, row) {
      let id = row._id;
      Meteor.call("removeItem", id, (error, result) => {
        this.$message({
          message: "លុបបានជោគជ័យ!",
          type: "success"
        });
        this.loadData();
      });
    },
    handleEdit(index, row) {
      let id = row._id;
      this.form.id = id;
      this.form.item = row.item;
      this.form.price = row.price;
      this.form.value = "Update";
    },
    handleSearch() {
      
      let item = this.search;
      this.loadingdata = true;
      setTimeout(() => {
        this.loadingdata = false;
        if (item != null ) {
          Meteor.call("getOneItem", item, (error, result) => {
            this.tableData = result;
          });
        }else{
          loadData();
        }
      }, 500);
    }
  }
};
</script>

