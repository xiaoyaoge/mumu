<template>
    <section v-loading="infoLoading">
        <div class="king-page-topbar pr20 mb15">
            <h3 class="king-topbar-title mb0"><span>订单号：{{orderInfo.orderId}}</span></h3>
            <ul class="breadcrumb king-breadcrumb pl0 bg-transparent">
                <li>用户订单</li>
                <li class="active">订单详情</li>
            </ul>
        </div>
        <div class="bk-panel">
            <div class="bk-panel-body main-operating">
                <div class="info-user">
                    <!-- <h4>订单信息<span class="label label-primary fr">未审核</span></h4> -->
                    <ul class="list-group m0">
                        <li class="list-group-item"><span class="fl">用户姓名：</span><span class="name">{{orderInfo.name}}</span></li>
                        <li class="list-group-item"><span class="fl">订单号：</span><span class="order">{{orderInfo.orderId}}</span></li>
                        <!-- <li class="list-group-item"><span class="fl">UID：</span><span class="fr">26556</span></li> -->
                    </ul>
                </div>
                <div class="info-btn">
                    <a v-if="orderInfo.orderState!==20" @click="remarkOrder('关闭订单','close')" class="bk-button bk-default ml25" title="关闭申请"><span>关闭申请</span></a>
                    <a v-if="orderInfo.orderState==330" @click="chongzuSubmit" class="bk-button bk-default ml25" title="回到重组状态"><span>回到重组状态</span></a>
                    <a v-if="orderInfo.orderState" @click="deliveryFormVisible = true" class="bk-button bk-primary ml25" title="指派面签"><span>指派面签</span></a>
                    <a v-if="orderInfo.orderState==330" @click="remarkOrder('订单信息确认','isOkOrder')" class="bk-button bk-primary ml25" title="信息确认"><span>信息确认</span></a>
                    <a v-if="orderInfo.orderState" @click="changeUserInfo" class="bk-button bk-primary ml25" title="修改信息"><span>修改信息</span></a>
                    <a v-if="orderInfo.orderState==430" @click="remarkOrder('代偿完成','finishOrder')" class="bk-button bk-primary ml25" title="代偿完成"><span>代偿完成</span></a>
                    <a v-if="orderInfo.orderState==360" @click="remarkOrder('更新账单','updateOrder')" class="bk-button bk-primary ml25" title="更新账单"><span>更新账单</span></a>
                    <div class="info-close none">
                        <span class="ml15">订单已关闭</span>
                        <a class="bk-button bk-default ml25" @click="remarkOrder('重新开启账单','open')" title="重新开启"><span>重新开启</span></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="bk-panel mt20">
            <div class="bk-panel-body row">
                <div class="col-md-4 col-lg-4 col-xs-4 info-label nodata">
                    <!-- 交互说明 : 
                         无数据则给 info-label 添加类 nodata
                         编辑状态则添加类 edit ,同时删除input的readonly
                    -->
                    <div class="label-title">
                        <h4>个人信息</h4>
                        <a class="bk-text-button bk-primary edit-btn" :class="userInfoType.eUinf?'':'none'" title="修改" @click="changeUsers">修改</a>
                        <a class="bk-text-button bk-primary cancel-btn" :class="userInfoType.uinf?'':'none'" title="取消" @click="notChangUser">取消</a>
                        <a class="bk-text-button bk-primary affirm-btn" :class="userInfoType.uinf?'':'none'" title="确认" @click="isOkChangUser">确认</a>
                    </div>
                    <div v-if="(userForm.name!=''||userForm.idCard!=''||orderInfo.userDegree!='')" class="label-cont mt15">
                        <el-form :model="userForm" class="bk-form" label-textAlign="left" label-width="150px" ref="userForm">
                            <div class="bk-form-item">
                                <label class="bk-label ta-l" style="width:150px;">姓名：</label>
                                <div class="bk-form-content" style="margin-left:150px;">
                                    <input type="text" class="bk-form-input" v-model="userForm.name" placeholder="" :readonly="userInfoType.ceUinf">
                                </div>
                            </div>
                            <div class="bk-form-item mt5">
                                <label class="bk-label ta-l" style="width:150px;">身份证号：</label>
                                <div class="bk-form-content" style="margin-left:150px;">
                                    <input type="text" class="bk-form-input" v-model="userForm.idCard" placeholder="" :readonly="userInfoType.ceUinf">
                                </div>
                            </div>
                            <div class="bk-form-item mt5">
                                <label class="bk-label ta-l" style="width:150px;">学历：</label>
                                <div class="bk-form-content" style="margin-left:150px;">
                                    <el-select v-model="userForm.userDegree" :class="userInfoType.ceUinf?'none':''">
                                        <el-option label="大专" value="1"></el-option>
                                        <el-option label="本科" value="2"></el-option>
                                        <el-option label="硕士" value="4"></el-option>
                                    </el-select>
                                    <!-- <input type="text" class="bk-form-input" v-model="orderInfo.degree" placeholder="" value="本科" :class="userInfoType.ceUinf?'none':''"> -->
                                    <span :class="userInfoType.ceUinf?'':'none'" style=" float: left; width:100%; color: #666;text-align:right">{{degreeType(orderInfo.degree)}}</span>
                                </div>
                            </div>
                            </form>
                        </el-form>
                    </div>
                    <div v-else class="nodata-cont">无个人信息</div>
                </div>
                <div class="col-md-4 col-lg-4 col-xs-4 info-label edit">
                    <!-- 交互说明 : 
                         无数据则给 info-label 添加类 nodata
                         编辑状态则添加类 edit ,同时删除input的readonly
                    -->
                    <div class="label-title">
                        <h4>联系人信息</h4>
                        <a class="bk-text-button bk-primary edit-btn" :class="userInfoType.leUinf?'':'none'" title="修改" @click="changeContact">修改</a>
                        <a class="bk-text-button bk-primary cancel-btn" :class="userInfoType.luinf?'':'none'" title="取消" @click="notChangContact">取消</a>
                        <a class="bk-text-button bk-primary affirm-btn" :class="userInfoType.luinf?'':'none'" title="确认" @click="isOkContact">确认</a>
                        <a class="bk-text-button bk-primary add-btn" :class="userInfoType.luinf?'':'none'" title="添加" @click="addContact">添加</a>
                    </div>
                    <div class="label-cont mt15" :class="userContact.length>0?'':'none'">
                        <form class="bk-form" id="validate_form" method="POST" action="javascript:;">
                            <div v-for="(item,key) in userContact" class="bk-form-item">
                                <label class="bk-label ta-l" style="width:150px; padding-top:0;padding-bottom:0;  ">
                                    <input type="text" class="bk-form-input" style="width:85px;" placeholder="输入关系" v-model="item.relation" :readonly="userInfoType.cleUinf">：</label>
                                <div class="bk-form-content" style="margin-left:150px;">
                                    <input type="text" class="bk-form-input" placeholder="输入如：李四／13700000000" v-model="item.value" :readonly="userInfoType.cleUinf">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="nodata-cont" :class="userContact.length>0?'none':''">无联系人细信息</div>
                </div>
                <div class="col-md-4 col-lg-4 col-xs-4 info-label">
                    <!-- 交互说明 : 
                         无数据则给 info-label 添加类 nodata
                         编辑状态则添加类 edit
                    -->
                    <div class="label-title">
                        <h4>担保人信息</h4>
                        <a class="bk-text-button bk-primary edit-btn" :class="userInfoType.deUinf?'':'none'" title="修改" @click="changeGuarantor">修改</a>
                        <a class="bk-text-button bk-primary cancel-btn" :class="userInfoType.duinf?'':'none'" title="取消" @click="notChangGuarantor">取消</a>
                        <a class="bk-text-button bk-primary affirm-btn" :class="userInfoType.duinf?'':'none'" title="确认" @click="isOkGuarantor">确认</a>
                        <a class="bk-text-button bk-primary add-btn" :class="userInfoType.duinf?'':'none'" title="添加" @click="addGuarantor">添加</a>
                    </div>
                    <div v-if="userGuarantor.length>0" class="label-cont mt15">
                        <form class="bk-form" id="validate_form" method="POST" action="javascript:;">
                            <div v-for="(item,key) in userGuarantor" class="mt20">
                                <div class="bk-form-item">
                                    <label class="bk-label ta-l" style="width:150px;">姓名：</label>
                                    <div class="bk-form-content" style="margin-left:150px;">
                                        <input type="text" class="bk-form-input" v-model="item.name" placeholder="" :readonly="userInfoType.cdeUinf">
                                    </div>
                                </div>
                                <div class="bk-form-item mt5">
                                    <label class="bk-label ta-l" style="width:150px;">身份证号：</label>
                                    <div class="bk-form-content" style="margin-left:150px;">
                                        <input type="text" class="bk-form-input" v-model="item.idCard" placeholder="" :readonly="userInfoType.cdeUinf">
                                    </div>
                                </div>
                                <div class="bk-form-item mt5">
                                    <label class="bk-label ta-l" style="width:150px;">抵押物：</label>
                                    <div class="bk-form-content" style="margin-left:150px;">
                                        <input type="text" class="bk-form-input" v-model="item.pawns" placeholder="" :readonly="userInfoType.cdeUinf">
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div v-else class="nodata-cont">无联系人细信息</div>
                </div>
            </div>
        </div>
        <!-- 主要表格 -->
        <div class="bk-panel mt20">
            <div class="bk-panel-header" role="tab">
                <div class="bk-panel-info fl">
                    <div class="panel-title">债务明细</div>
                    <!-- <div class="panel-subtitle">(待审核前可以修改)</div> -->
                </div>
                <div class="bk-panel-action fr">
                    <div class="bk-form bk-inline-form bk-form-small">
                        <button class="bk-button bk-primary bk-button-small" title="增加债务">增加债务</button>
                    </div>
                </div>
            </div>
            <div class="bk-panel-body p0">
                <table class="bk-table details-table has-thead-bordered">
                    <thead>
                        <tr>
                            <th>债务平台</th>
                            <th style="width:200px" class="text-r">待还款金额</th>
                            <th>逾期情况</th>
                            <th>逾期天数</th>
                            <th>图片资料</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in debtList">
                            <td>{{item.platform}}</td>
                            <td class="text-r">{{item.amount}}</td>
                            <td>{{item.overdueStatus}}</td>
                            <td>{{item.overdueDays}}</td>
                            <td><a class="bk-text-button" href="#none">查看图片</a></td>
                            <td>
                                <a class="bk-text-button" href="#none">编辑</a>
                                <a class="bk-text-button" href="#none">删除</a>
                                <select name="" id="" class="select">
                                    <option value="">未代偿</option>
                                    <option value="">代偿中</option>
                                    <option value="">已代偿</option>
                                </select>
                            </td>
                        </tr>
                        <tr class="total">
                            <td>债务总数</td>
                            <td class="text-r">待还金额：{{count}}</td>
                            <td>债务个数：{{debtList.length}}</td>
                            <td>&nbsp</td>
                            <td>&nbsp</td>
                            <td>&nbsp</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="bk-panel mt20">
            <div class="bk-panel-header" role="tab">
                <div class="bk-panel-info fl">
                    <div class="panel-title">重组明细</div>
                </div>
                <div class="bk-panel-action fr">
                    <div class="bk-form bk-inline-form bk-form-small">
                        <button class="bk-button bk-primary bk-button-small" title="修改">修改</button>
                    </div>
                </div>
            </div>
            <div class="bk-panel-body p0">
                <table class="bk-table details-table has-thead-bordered">
                    <thead>
                        <tr>
                            <th class="text-r">重组金额</th>
                            <th class="text-r">手续费</th>
                            <th>还款期数</th>
                            <th>逾期天数</th>
                            <th>还款方式</th>
                            <th style="width:360px;">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in repayInfo">
                            <td class="text-r">{{item.capital}}</td>
                            <td class="text-r">{{item.monFee}}</td>
                            <td>{{item.fqNum}}</td>
                            <td>{{item.overDueDays}}</td>
                            <td>{{item.repayType}}</td>
                            <td>
                                <a class="bk-text-button" href="#none">查看详情</a>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-r">70,000</td>
                            <td class="text-r">500</td>
                            <td>80</td>
                            <td>0</td>
                            <td>等额本息按日计息</td>
                            <td>
                                <a class="bk-text-button" href="#none">查看详情</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="bk-panel mt20 none">
            <div class="bk-panel-header" role="tab">
                <div class="bk-panel-info fl">
                    <div class="panel-title">操作日志</div>
                </div>
            </div>
            <div class="bk-panel-body p0">
                <table class="bk-table details-table has-thead-bordered">
                    <thead>
                        <tr>
                            <th>操作时间</th>
                            <th>操作人</th>
                            <th>操作内容</th>
                            <th style="width:360px;">操作备注</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in logList">
                            <td>{{item.createTime}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.remark}}</td>
                            <td>{{item.description}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 指派面签员 [[-->
        <el-dialog title="指派面签员" v-model="deliveryFormVisible" :close-on-click-modal="false">
            <el-form :model="deliveryForm" label-width="80px" :rules="deliveryFormRules" ref="deliveryForm">
                <div style="width: 90%; margin: 0 auto;">
                    <el-form-item label="面签员" prop="mid">
                        <el-select v-model="deliveryForm.mid" placeholder="请选择面签员">
                            <el-option v-for="item in deliveryList" :label="item.name" :value="item.mid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <textarea style="height: 160px" class="bk-form-textarea" v-model="deliveryForm.remark" placeholder="请填写备注信息"></textarea>
                        <!-- <el-input type="textarea" style="height: 160px" class="bk-form-textarea" v-model="deliveryForm.desc" placeholder="请填写备注信息"></el-input> -->
                    </el-form-item>
                </div>
            </el-form>
            <div class="dialog-btns">
                <a class="bk-button bk-default" @click="deliveryFormVisible = false" title="点错了">点错了</a>
                <a class="bk-button bk-primary mr10" @click="createDelivery" title="确认">确认</a>
            </div>
        </el-dialog>
        <!-- 指派面签员 ]]-->
        <!-- 关闭用户申请 其他同类的可复用该弹层 [[-->
        <el-dialog :title="descTitle" v-model="descFormVisible" :close-on-click-modal="false">
            <el-form :model="descForm" label-width="80px" :rules="descFormRules" ref="descForm">
                <div style="width: 90%; margin: 0 auto;">
                    <el-form-item label="备注">
                        <textarea style="height: 160px" class="bk-form-textarea" v-model="descForm.remark" placeholder="请填写备注信息"></textarea>
                        <!-- <el-input type="textarea" style="height: 160px" class="bk-form-textarea" v-model="deliveryForm.desc" placeholder="请填写备注信息"></el-input> -->
                    </el-form-item>
                </div>
            </el-form>
            <div class="dialog-btns">
                <a class="bk-button bk-default" @click="descFormVisible = false" title="点错了">点错了</a>
                <a class="bk-button bk-primary mr10" @click="remarkOrderSubmit(descRemarkType)" title="确认">确认</a>
            </div>
        </el-dialog>
        <!-- 关闭用户申请 ]]-->
    </section>
</template>
<script>
export default {
    data() {
            return {
                userInfoType: {
                    ceUinf: true, //点击编辑
                    eUinf: false, //个人信息显示修改
                    uinf: false, //个人显示 确认取消
                    cleUinf: true, //点击编辑
                    leUinf: false, //联系人信息显示修改
                    luinf: false, //个人显示 确认取消
                    cdeUinf: true, //点击编辑
                    deUinf: false, //联系人信息显示修改
                    duinf: false, //个人显示 确认取消 
                    type: false //修改按钮的显示
                },
                userContact: [], //联系人信息
                userGuarantor: [], //担保人信息
                userForm: {
                    orderId: '',
                    name: '',
                    idCard: '',
                    degree: '',
                    userDegree: '',
                },
                userFormRules: {
                    name: [{
                        required: true,
                        message: '请选择面签员',
                        trigger: 'blur'
                    }],
                    idCard: [{
                        required: true,
                        message: '请填写备注信息',
                        trigger: 'blur'
                    }]
                },
                deliveryList: [{
                    name: 'owen',
                    mid: '7'
                }, {
                    name: '嗡嗡嗡1111',
                    mid: '26'
                }],
                deliveryFormVisible: false,
                deliveryForm: {
                    orderId: '',
                    mid: '',
                    name: '',
                    remark: ''
                },
                deliveryMid: '',
                deliveryFormRules: {
                    mid: [{
                        required: true,
                        message: '请选择面签员',
                        trigger: 'change'
                    }],
                    remark: [{
                        required: true,
                        message: '请填写备注信息',
                        trigger: 'blur'
                    }]
                },
                descFormVisible: false,
                descTitle: '填写备注',
                descRemarkType: '',
                descForm: {
                    orderId: '',
                    remark: ''
                },
                descFormRules: {
                    remark: [{
                        required: true,
                        message: '请填写备注信息',
                        trigger: 'blur'
                    }]
                },
                infoLoading: false,
                orderInfo: {}, //订单信息
                logList: [], //操作日志
                debtList: [], //债务明细 
                repayInfo: [], //重组明细
                count: 0,
            }
        },
        methods: {
            countFun() { //账单总金额
                for (let i = 0; i < this.debtList.length; i++) {
                    this.count += this.debtList[i].amount;
                }
            },
            deliveryName(opts) { //根据面签员mid 获取面签员name
                var name = '';
                for (let i = 0; i < this.deliveryList.length; i++) {
                    if (parseInt(opts) == parseInt(this.deliveryList[i].mid)) {
                        name = this.deliveryList[i].name;
                    }
                }
                return name;
            },
            degreeType(val) {
                switch (val) {
                    case 1:
                        return '专科';
                    case 2:
                        return '本科';
                    case 3:
                        return '';
                    case 4:
                        return '硕士';
                    case 5:
                        return ' ';
                    case 6:
                        return ' ';
                    case 7:
                        return ' ';
                    default:
                        return ' ';
                }
            },
            getDataList() { //获取订单详情
                let params = {};
                params = {
                    orderId: this.orderInfo.orderId,

                }
                this.infoLoading = true;
                this.$http.ajaxPost({
                    url: 'order/getOrderInfo',
                    params: params
                }, (res) => {
                    this.$http.aop(res, () => {
                        this.orderInfo = res.body.data.order;
                        this.repayInfo = res.body.data.repayInfo;
                        //this.logList = res.body.data.logList;
                        this.debtList = res.body.data.debtList;
                        this.userForm.orderId = this.orderInfo.orderId;
                        this.userForm.userDegree = this.orderInfo.degree + '';
                        this.userForm.idCard = this.orderInfo.idCard;
                        this.userForm.name = this.orderInfo.name;
                        this.countFun()
                        this.infoLoading = false;
                        this.gitUserContact();
                        this.gitUserGuarantor();
                    });
                });
            },
            gitUserGuarantor() {
                let params = {};
                params = {
                    uid: this.orderInfo.uid,

                }
                this.infoLoading = true;
                this.$http.ajaxPost({
                    url: 'order/queryGuarantor',
                    params: params
                }, (res) => {
                    this.$http.aop(res, () => {
                        this.userGuarantor = res.body.data.userGuarantor || [];
                        this.infoLoading = false;
                    });
                });
            },
            addGuarantor() {
                var guarantor = {
                    gid: '',
                    idCard: '',
                    name: '',
                    pawns: '',
                };
                this.userGuarantor.push(guarantor);
            },
            addContact() {
                var contact = {
                    cid: '',
                    mobile: '',
                    name: '',
                    relation: '',
                    value: ''
                }
                this.userContact.push(contact);
            },
            gitUserContact() {
                let params = {};
                params = {
                    uid: this.orderInfo.uid,

                }
                this.$http.ajaxPost({
                    url: 'order/queryContact',
                    params: params
                }, (res) => {
                    this.$http.aop(res, () => {
                        this.userContact = res.body.data.contactList || [];
                        for (let i = 0; i < this.userContact.length; i++) {
                            this.userContact[i].value = this.userContact[i].name + '／' + this.userContact[i].mobile;
                        }
                    });
                });

            },
            isOkChangUser() { // 确认修个人信息
                this.$confirm('是否确认，修改当前用户信息？', '提示', {}).then(() => {
                    let para = Object.assign({}, this.userForm);
                    delete(para['userDegree']);
                    this.$http.ajaxPost({
                        url: 'order/modifyUser',
                        params: para
                    }, (res) => {
                        this.$http.aop(res, () => {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.pageNum = 1;
                            this.getDataList();
                        })
                    });

                });
            },
            isOkContact() {
                var params = {
                    contactList: [],
                    uid: this.orderInfo.uid
                };
                for (let i = 0; i < this.userContact.length; i++) {
                    let aVal = this.userContact[i].value.split('／');
                    let val = {
                        cid: this.userContact[i].cid,
                        name: aVal[0],
                        mobile: aVal[1],
                        relation: this.userContact[i].relation

                    }
                    params.contactList.push(val);


                }
                this.$confirm('是否确认，修改联系人信息？', '提示', {}).then(() => {
                    this.$http.ajaxPost({
                        url: 'order/modifyGuarantor',
                        params: params
                    }, (res) => {
                        this.$http.aop(res, () => {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.pageNum = 1;
                            this.getDataList();
                        })
                    });

                });
            },
            isOkGuarantor() {
                var params = {
                    guarantorList: [],
                    uid: this.orderInfo.uid
                };
                for (let i = 0; i < this.userGuarantor.length; i++) {

                    let val = {
                        gid: this.userGuarantor[i].gid || 0,
                        name: this.userGuarantor[i].name,
                        mobile: this.userGuarantor[i].idCard,
                        pawns: this.userGuarantor[i].pawns
                    }
                    params.guarantorList.push(val);

                }
                this.$confirm('是否确认，修改担保信息？', '提示', {}).then(() => {
                    this.$http.ajaxPost({
                        url: 'order/modifyContact',
                        params: params
                    }, (res) => {
                        this.$http.aop(res, () => {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.pageNum = 1;
                            this.getDataList();
                        })
                    });

                });
            },
            notChangContact() { //取消修改联系人信息
                this.gitUserContact();
                this.userInfoType.cleUinf = true;
                this.userInfoType.leUinf = true;
                this.userInfoType.luinf = false;

            },
            notChangGuarantor() { //取消修改担保人信息
                this.gitUserGuarantor();
                this.userInfoType.cdeUinf = true;
                this.userInfoType.deUinf = true;
                this.userInfoType.duinf = false;

            },
            notChangUser() { //取消修改个人信息
                this.userInfoType.ceUinf = true;
                this.userInfoType.eUinf = true;
                this.userInfoType.uinf = false;
                this.userForm.userDegree = this.orderInfo.degree + '';
                this.userForm.idCard = this.orderInfo.idCard;
                this.userForm.name = this.orderInfo.name;
            },
            changeGuarantor() { //修改担保人信息
                this.userInfoType.cdeUinf = false;
                this.userInfoType.deUinf = false;
                this.userInfoType.duinf = true;
            },
            changeContact() { //修改联系人信息
                this.userInfoType.cleUinf = false;
                this.userInfoType.leUinf = false;
                this.userInfoType.luinf = true;
            },
            changeUsers() { //修改个人信息
                this.userInfoType.ceUinf = false;
                this.userInfoType.eUinf = false;
                this.userInfoType.uinf = true;
            },
            changeUserInfo() { //修改信息 按钮
                if (!this.userInfoType.type) {
                    this.userInfoType.eUinf = true;
                    this.userInfoType.leUinf = true;
                    this.userInfoType.deUinf = true;
                    this.userInfoType.type = true;
                } else {
                    this.userInfoType.type = false;
                    this.userInfoType.ceUinf = true; //点击编辑
                    this.userInfoType.eUinf = false; //个人信息显示修改
                    this.userInfoType.uinf = false; //个人显示 确认取消
                    this.userInfoType.cleUinf = true; //点击编辑
                    this.userInfoType.leUinf = false; //联系人信息显示修改
                    this.userInfoType.luinf = false; //个人显示 确认取消
                    this.userInfoType.cdeUinf = true; //点击编辑
                    this.userInfoType.deUinf = false; //联系人信息显示修改
                    this.userInfoType.duinf = false; //个人显示 确认取消 
                    this.userInfoType.type = false; //修改按钮的显示 
                }
            },
            createDelivery() { //指派面签员
                this.$refs.deliveryForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('是否确认', '提示', {}).then(() => {
                            let para = Object.assign({}, this.deliveryForm);
                            para.orderId = this.orderInfo.orderId;
                            para.name = this.deliveryName(para.mid);
                            console.log(para.name);
                            this.$http.ajaxPost({
                                url: 'order/createDelivery',
                                params: para
                            }, (res) => {
                                this.$http.aop(res, () => {
                                    this.$message({
                                        message: '开启成功',
                                        type: 'success'
                                    });
                                    this.pageNum = 1;

                                    this.getDataList();
                                });
                            });
                            this.deliveryFormVisible = false;

                        });
                    }
                })
            },
            chongzuSubmit() { //回到重组状态
                this.$confirm('是否确认，当前用户账单回到重组状态？', '提示', {}).then(() => {});
            },
            remarkOrder(str, type) { //状态操作按钮
                this.descTitle = str;
                this.descRemarkType = type
                this.descFormVisible = true;
            },
            openOrder() { //重新开启账单
                this.$confirm('是否确认，重新开启当前订单？', '提示', {}).then(() => {
                    let para = Object.assign({}, this.descForm);
                    para.orderId = this.orderInfo.orderId;
                    this.$http.ajaxPost({
                        url: 'order/openOrder',
                        params: para
                    }, (res) => {
                        this.$http.aop(res, () => {
                            this.$message({
                                message: '开启成功',
                                type: 'success'
                            });
                            this.pageNum = 1;

                            this.getDataList();
                        });
                    });
                    this.descFormVisible = false;
                });
            },
            closeOrderSubmit() { //关闭订单
                this.$confirm('是否确认，关闭当前账单？', '提示', {}).then(() => {
                    let para = Object.assign({}, this.descForm);
                    para.orderId = this.orderInfo.orderId;
                    this.$http.ajaxPost({
                        url: 'order/closeOrder',
                        params: para
                    }, (res) => {
                        this.$http.aop(res, () => {
                            this.$message({
                                message: '关闭成功成功',
                                type: 'success'
                            });

                            this.getDataList();
                        })
                    });
                    this.descFormVisible = false;
                });
            },
            isOKSubmit() { //确认 信息
                this.$confirm('是否确认，当前用户信息？', '提示', {}).then(() => {
                    let para = Object.assign({}, this.descForm);
                    para.orderId = this.orderInfo.orderId;
                    this.$http.ajaxPost({
                        url: 'order/confirmOrder',
                        params: para
                    }, (res) => {
                        this.$http.aop(res, () => {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.getDataList();
                        })
                    });
                    this.descFormVisible = false;
                });
            },
            overSubmit() { //代偿完成
                this.$confirm('是否确认，当前用户账单代偿完成？', '提示', {}).then(() => {
                    let para = Object.assign({}, this.descForm);
                    para.orderId = this.orderInfo.orderId;
                    this.$http.ajaxPost({
                        url: 'order/finishOrder',
                        params: para
                    }, (res) => {
                        this.$http.aop(res, () => {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.getDataList();
                        })
                    });
                    this.descFormVisible = false;

                });
            },
            updateOrder() { // 更新账单
                this.$confirm('是否确认，是否更新账单？', '提示', {}).then(() => {
                    let para = Object.assign({}, this.descForm);
                    para.orderId = this.orderInfo.orderId;
                    this.$http.ajaxPost({
                        url: 'order/modifyOrder',
                        params: para
                    }, (res) => {
                        this.$http.aop(res, () => {
                            this.$message({
                                message: '更新账单',
                                type: 'success'
                            });
                            this.getDataList();
                        })
                    });
                    this.descFormVisible = false;
                });
            },
            remarkOrderSubmit(type) { //填写备注  
                switch (type) {
                    case 'close': //关闭订单
                        this.closeOrderSubmit();
                        return;
                    case 'open': //重新开启点单
                        this.openOrder();
                        return '本科';
                    case 'isOkOrder':
                        this.isOKSubmit();
                        return;
                    case 'finishOrder':
                        this.overSubmit();
                        return;
                    case 'updateOrder':
                        this.updateOrder();
                        return;

                    default:
                        return;
                }
            }
        },
        mounted() {
            this.orderInfo.orderId = this.$route.params.id;
            this.getDataList();
        }
}
</script>
<style scoped>
</style>
