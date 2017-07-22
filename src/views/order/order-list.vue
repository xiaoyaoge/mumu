<template>
    <section>
        <div class="bk-panel mb20">
            <div class="bk-panel-body p25">
                <form class="bk-form" :model="form" @submit="onSubmit">
                    <div class="row">
                        <!-- 交互说明: 选中条件后给A标签添加类 on -->
                        <div id="time" class="col-md-12 col-lg-12 col-xs-12 mb10">
                            <label class="bk-label pr15" style="width:100px;">提交时间：</label>
                            <el-radio-group v-model="topTime">
                                <el-radio-button label="全部"></el-radio-button>
                                <el-radio-button label="最近一小时"></el-radio-button>
                                <el-radio-button label="最近一天"></el-radio-button>
                            </el-radio-group>
                        </div>
                        <div id="status" class="col-md-12 col-lg-12 col-xs-12">
                            <label class="bk-label pr15" style="width:100px;">当前状态：</label>
                            <el-radio-group v-model="orderType">
                                <el-radio-button label="全部"></el-radio-button>
                                <el-radio-button label="发起请求"></el-radio-button>
                                <el-radio-button label="待指派面签员"></el-radio-button>
                                <el-radio-button label="待审核并生成账单"></el-radio-button>
                                <el-radio-button label="用户确认重组"></el-radio-button>
                                <el-radio-button label="我方代偿中"></el-radio-button>
                                <el-radio-button label="用户还款中"></el-radio-button>
                                <el-radio-button label="已还清"></el-radio-button>
                                <el-radio-button label="关闭"></el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="row more-query-cont mt15" :class="collapsed?'none':''">
                        <div class="col-md-4 col-lg-4 col-xs-4">
                            <div class="bk-form-item mb20">
                                <label class="bk-label pr15" style="width:100px;">身份证：</label>
                                <div class="bk-form-content" style="margin-left:100px;">
                                    <input type="text" v-model="form.name" class="bk-form-input" placeholder="请输入身份证号码" style="width:100%;">
                                </div>
                            </div>
                            <div class="bk-form-item mb20">
                                <label class="bk-label pr15" style="width:100px;">手机号：</label>
                                <div class="bk-form-content" style="margin-left:100px;">
                                    <input type="text" v-model="form.mobile" class="bk-form-input" placeholder="请输入手机号码" style="width:100%;">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-lg-4 col-xs-4">
                            <div class="bk-form-item mb20">
                                <label class="bk-label pr15" style="width:100px;">面签员姓名：</label>
                                <div class="bk-form-content" style="margin-left:100px;">
                                    <input type="text" v-model="form.userName" class="bk-form-input" placeholder="请输入面签员姓名" style="width:100%;">
                                </div>
                            </div>
                            <div class="bk-form-item mb20">
                                <label class="bk-label pr15" style="width:100px;">面签员手机：</label>
                                <div class="bk-form-content" style="margin-left:100px;">
                                    <input type="text" v-model="form.userMobile" class="bk-form-input" placeholder="请输入面签员手机" style="width:100%;">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-lg-4 col-xs-4">
                            <!-- <div class="bk-form-item mb20">
                                <label class="bk-label pr15" style="width:100px;">用户姓名：</label>
                                <div class="bk-form-content" style="margin-left:100px;">
                                    <input type="text" class="bk-form-input" placeholder="请输入用户姓名" style="width:100%;">
                                </div>
                            </div> -->
                            <div class="bk-form-item mb20">
                                <label class="bk-label pr15" style="width:100px;">订单号：</label>
                                <div class="bk-form-content" style="margin-left:100px;">
                                    <input type="text" v-model="form.orderNumber" class="bk-form-input" placeholder="请输入关键字" style="width:100%;">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-12 col-xs-12">
                            <div class="bk-form-item mb20">
                                <label class="bk-label pr15" style="width:100px;">所在地区：</label>
                                <el-cascader size="large" :options="provinceAndCityDataPlus" v-model="selectedOptions" @change="handleChange">
                                </el-cascader>
                                <span class="none">{{CodeToText[selectedOptions[0]]}}->{{CodeToText[selectedOptions[1]]}}->{{CodeToText[selectedOptions[2]]}}</span>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-12 col-xs-12">
                            <div class="bk-form-content" style="margin-left:100px;">
                                <button class="bk-button bk-success">查询</button>
                            </div>
                        </div>
                    </div>
                    <!-- 交互说明 ：收起时更改文案为 展开更多查询条件，同时隐藏 more-query-cont -->
                    <a class="more-query-link" @click="moreQuery">{{collapsedText}}</a>
                </form>
            </div>
        </div>
        <!-- 主要表格 -->
        <div class="bk-panel bk-demo">
            <div class="bk-panel-header" role="tab">
                <div class="bk-panel-info fl">
                    <div class="panel-title">所有订单</div>
                    <!-- <div class="panel-subtitle">(最高权限)</div> -->
                </div>
                <div class="bk-panel-action fr">
                    <div class="bk-form bk-inline-form bk-form-small">
                        <div class="bk-form-item is-required">
                            <div class="bk-form-content">
                                <input type="text" class="bk-form-input" placeholder="请输入搜索关键字" style="width:290px;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bk-panel-body p0" v-loading="listLoading">
                <form>
                    <table class="bk-table has-thead-bordered">
                        <thead>
                            <tr>
                                <th style="width:25px">
                                    <input type="checkbox" name="checkall" value="">
                                </th>
                                <th>订单号</th>
                                <th>姓名</th>
                                <th>地区</th>
                                <th>面签员</th>
                                <th>状态</th>
                                <th>提交时间</th>
                                <th style="width:325px">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in table.dataList">
                                <td>
                                    <input type="checkbox" name="checkall" value="">
                                </td>
                                <td>XY20170303254541</td>
                                <td>李二</td>
                                <td>广东省深圳市南山区</td>
                                <td>王五</td>
                                <td>发起请求</td>
                                <td>36分钟前</td>
                                <td>
                                    <span>用户未提交资料</span>
                                    <a class="bk-icon-button bk-warning bk-button-mini" title="查看" href="#/orderInfo">
                                    <i class="bk-icon icon-eye bk-icon"></i>
                                    <i class="bk-text">查看详情</i>
                                </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <div class="bk-panel-footer p10">
                    <el-col :span="24" class="toolbar mt20">
                        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="table.pageSize" :total="table.total" style="float:right;">
                        </el-pagination>
                    </el-col>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import {
    regionDataPlus,
    CodeToText,
    TextToCode
} from '../../area';
export default {
    data() {
            return {
                topTime: '全部',
                orderType: '全部',
                form: {
                    name: '', //身份证
                    mobile: '', //手机号
                    userName: '', //面签员姓名
                    userMobile: '', //面签员手机号
                    orderNumber: '', //订单号 
                },
                collapsed: true,
                collapsedText: '显示更多查询条件',
                TextToCode: TextToCode,
                CodeToText: CodeToText,
                selectedOptions: ["1", "1", '1'],
                provinceAndCityDataPlus: regionDataPlus,
                table: {
                    dataList: [],
                    total: 0,
                    pageSize: 10,
                    pageNum: 1
                },
                listLoading: false,
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.table.pageNum = val;
                this.getDataList();
            },
            moreQuery() {
                if (this.collapsed) {
                    this.collapsed = false;
                    this.collapsedText = '收起更多查询条件';
                } else {
                    this.collapsed = true;
                    this.collapsedText = '显示更多查询条件';
                }

            },
            getDataList() {
                let params = {};
                params = {
                    pageSize: this.table.pageSize,
                    pageNum: this.table.pageNum
                }
                this.listLoading = true;
                this.$http.ajaxPost({
                    url: 'admin/getAdminList',
                    params: params
                }, (res) => {
                    this.$http.aop(res, () => {
                        this.table.total = res.body.data.total;
                        this.table.dataList = res.body.data.adminList;
                        this.listLoading = false;
                    });
                });
            },
            onSubmit() {
                console.log('submit!', this.form);
            },
            handleChange(value) {
                console.log(value)
            },
            convertTextToCode(provinceText, cityText, regionText) {
                let code = ''
                if (provinceText && this.TextToCode[provinceText]) {
                    const province = this.TextToCode[provinceText]
                    code += province.code + ', '
                    if (cityText && province[cityText]) {
                        const city = province[cityText]
                        code += city.code + ', '
                        if (regionText && city[regionText]) {
                            code += city[regionText].code
                        }
                    }
                }
                return code
            }
        },
        mounted() {
            this.getDataList();
            console.log(this.TextToCode['北京市'].code)
            console.log(this.TextToCode['北京市']['市辖区'].code)
            console.log(this.TextToCode['北京市']['市辖区']['朝阳区'].code)
        }
}
</script>
<style scoped>
</style>
