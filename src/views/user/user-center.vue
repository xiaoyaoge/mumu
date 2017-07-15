<template>
    <section>
        <div class="bk-panel bk-demo">
            <div class="bk-panel-header" role="tab">
                <div class="bk-panel-info fl">
                    <div class="panel-title">管理员</div>
                    <div class="panel-subtitle">(最高权限)</div>
                </div>
                <div class="bk-panel-action fr">
                    <button id="addUser" class="bk-button bk-primary bk-button-small" @click="handleAdd" title="新增">新增</button>
                </div>
            </div>
            <div class="bk-panel-body">
                <table class="bk-table">
                    <thead>
                        <tr>
                            <th style="width:20%;">日期</th>
                            <th>姓名</th>
                            <th>电话</th>
                            <th style="width:270px;">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in users">
                            <td>{{item.time}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.phone}}</td>
                            <td>
                                <a class="bk-icon-button bk-warning bk-button-mini" title="修改" @click="handleEdit()">
                                    <i class="bk-icon icon-edit bk-icon"></i>
                                    <i class="bk-text">修改</i>
                                </a>
                                <a class="bk-icon-button bk-danger bk-button-mini" title="关闭" @click="handleDel()">
                                    <i class="bk-icon icon-close bk-icon"></i>
                                    <i class="bk-text">删除</i>
                                </a>
                            </td>
                        </tr> 
                    </tbody>
                </table>
                <!--列表-->
                <!--工具条-->
                <el-col :span="24" class="toolbar mt20">
                    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
                    </el-pagination>
                </el-col>
            </div>
        </div>
        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="editForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="editForm.addr"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>  
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="addForm.addr"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
//import util from '../../common/js/util'
//import NProgress from 'nprogress'
//import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

export default {
    data() {
            return {
                filters: {
                    name: ''
                },
                users: [{
                    id: '1',
                    name: '王尼玛',
                    phone: '18686868866',
                    time: '2015-09-20'
                }, {
                    id: '2',
                    name: '王尼玛',
                    phone: '18686868866',
                    time: '2015-09-20'
                }, {
                    id: '3',
                    name: '王尼玛',
                    phone: '18686868866',
                    time: '2015-09-20'
                }, {
                    id: '4',
                    name: '王尼玛',
                    phone: '18686868866',
                    time: '2015-09-20'
                }, {
                    id: '5',
                    name: '王尼玛',
                    phone: '18686868866',
                    time: '2015-09-20'
                }],
                total: 100,
                page: 1,
                listLoading: false,
                sels: [], //列表选中列

                editFormVisible: false, //编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                },

                addFormVisible: false, //新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }]
                },
                //新增界面数据
                addForm: {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                }

            }
        },
        methods: {
            //性别显示转换
            formatSex: function(row, column) {
                return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                //this.listLoading = true; 
                // getUserListPage(para).then((res) => {
                //     this.total = res.data.total;
                //     this.users = res.data.users;
                //     this.listLoading = false; 
                // });
            },
            //删除
            handleDel: function(index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {
                        id: row.id
                    };
                    // removeUser(para).then((res) => {
                    //     this.listLoading = false;
                    //     //NProgress.done();
                    //     this.$message({
                    //         message: '删除成功',
                    //         type: 'success'
                    //     });
                    //     this.getUsers();
                    // });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function(index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function() {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                };
            },
            //编辑
            editSubmit: function() {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {

                            //NProgress.start();
                            let para = Object.assign({}, this.editForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            // editUser(para).then((res) => {

                            //     //NProgress.done();
                            //     this.$message({
                            //         message: '提交成功',
                            //         type: 'success'
                            //     });
                            //     this.$refs['editForm'].resetFields();
                            //     this.editFormVisible = false;
                            //     this.getUsers();
                            // });
                        });
                    }
                });
            },
            //新增
            addSubmit: function() {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.addForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            // addUser(para).then((res) => {
                            //     this.addLoading = false;
                            //     //NProgress.done();
                            //     this.$message({
                            //         message: '提交成功',
                            //         type: 'success'
                            //     });
                            //     this.$refs['addForm'].resetFields();
                            //     this.addFormVisible = false;
                            //     this.getUsers();
                            // });
                        });
                    }
                });
            },
            selsChange: function(sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function() {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {
                        ids: ids
                    };
                    // batchRemoveUser(para).then((res) => {
                    //     this.listLoading = false;
                    //     //NProgress.done();
                    //     this.$message({
                    //         message: '删除成功',
                    //         type: 'success'
                    //     });
                    //     this.getUsers();
                    // });
                }).catch(() => {

                });
            }
        },
        mounted() {
            this.getUsers();
        }
}
</script>
<style scoped>
</style>
