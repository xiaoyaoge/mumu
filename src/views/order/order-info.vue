<template>
    <section>
        <div class="king-page-topbar pr20 mb15">
            <h3 class="king-topbar-title mb0"><span>订单号：XY20170303254541</span></h3>
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
                        <li class="list-group-item"><span class="fl">用户姓名：</span><span class="name">赵四</span></li>
                        <li class="list-group-item"><span class="fl">订单号：</span><span class="order">XY20170303254541</span></li>
                        <!-- <li class="list-group-item"><span class="fl">UID：</span><span class="fr">26556</span></li> -->
                    </ul>
                </div>
                <div class="info-btn">
                    <a class="bk-button bk-default ml25" title="关闭申请"><span>关闭申请</span></a>
                    <a class="bk-button bk-default ml25" title="回到重组状态"><span>回到重组状态</span></a>
                    <a class="bk-button bk-primary ml25" title="指派面签"><span>指派面签</span></a>
                    <a class="bk-button bk-primary ml25" title="信息确认"><span>信息确认</span></a>
                    <a class="bk-button bk-primary ml25" title="修改信息"><span>修改信息</span></a>
                    <a class="bk-button bk-primary ml25" title="代偿完成"><span>代偿完成</span></a>
                    <a class="bk-button bk-primary ml25" title="更新账单"><span>更新账单</span></a>
                    <div class="info-close">
                        <span class="ml15">订单已关闭</span>
                        <a class="bk-button bk-default ml25" title="重新开启"><span>重新开启</span></a>
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
                        <a class="bk-text-button bk-primary edit-btn" title="修改">修改</a>
                        <a class="bk-text-button bk-primary cancel-btn" title="取消">取消</a>
                        <a class="bk-text-button bk-primary affirm-btn" title="确认">确认</a>
                    </div>
                    <div class="nodata-cont">无个人信息</div>
                    <div class="label-cont mt15">
                        <form class="bk-form" id="validate_form" method="POST" action="javascript:;">
                            <div class="bk-form-item">
                                <label class="bk-label ta-l" style="width:150px;">姓名：</label>
                                <div class="bk-form-content" style="margin-left:150px;">
                                    <input type="text" class="bk-form-input" name="" placeholder="" value="王小妹" readonly>
                                </div>
                            </div>
                            <div class="bk-form-item mt5">
                                <label class="bk-label ta-l" style="width:150px;">身份证号：</label>
                                <div class="bk-form-content" style="margin-left:150px;">
                                    <input type="text" class="bk-form-input" name="" placeholder="" value="457784125412412201" readonly>
                                </div>
                            </div>
                            <div class="bk-form-item mt5">
                                <label class="bk-label ta-l" style="width:150px;">学历：</label>
                                <div class="bk-form-content" style="margin-left:150px;">
                                    <input type="text" class="bk-form-input" name="" placeholder="" value="本科" readonly>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-md-4 col-lg-4 col-xs-4 info-label edit">
                    <!-- 交互说明 : 
						 无数据则给 info-label 添加类 nodata
						 编辑状态则添加类 edit ,同时删除input的readonly
					-->
                    <div class="label-title">
                        <h4>联系人信息</h4>
                        <a class="bk-text-button bk-primary edit-btn" title="修改">修改</a>
                        <a class="bk-text-button bk-primary cancel-btn" title="取消">取消</a>
                        <a class="bk-text-button bk-primary affirm-btn" title="确认">确认</a>
                    </div>
                    <div class="nodata-cont">无联系人细信息</div>
                    <div class="label-cont mt15">
                        <form class="bk-form" id="validate_form" method="POST" action="javascript:;">
                            <div class="bk-form-item">
                                <label class="bk-label ta-l" style="width:150px;">爸爸：</label>
                                <div class="bk-form-content" style="margin-left:150px;">
                                    <input type="text" class="bk-form-input" name="" placeholder="" value="王尼玛/13634340013">
                                </div>
                            </div>
                            <div class="bk-form-item mt5">
                                <label class="bk-label ta-l" style="width:150px;">妈妈：</label>
                                <div class="bk-form-content" style="margin-left:150px;">
                                    <input type="text" class="bk-form-input" name="" placeholder="" value="王尼玛/13634340013">
                                </div>
                            </div>
                            <div class="bk-form-item mt5">
                                <label class="bk-label ta-l" style="width:150px;">爷爷：</label>
                                <div class="bk-form-content" style="margin-left:150px;">
                                    <input type="text" class="bk-form-input" name="" placeholder="" value="王尼玛/13634340013">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-md-4 col-lg-4 col-xs-4 info-label">
                    <!-- 交互说明 : 
						 无数据则给 info-label 添加类 nodata
						 编辑状态则添加类 edit
					-->
                    <div class="label-title">
                        <h4>担保人信息</h4>
                        <a class="bk-text-button bk-primary edit-btn" title="修改">修改</a>
                        <a class="bk-text-button bk-primary cancel-btn" title="取消">取消</a>
                        <a class="bk-text-button bk-primary affirm-btn" title="确认">确认</a>
                    </div>
                    <div class="nodata-cont">无联系人细信息</div>
                    <div class="label-cont mt15">
                        <form class="bk-form" id="validate_form" method="POST" action="javascript:;">
                            <div class="bk-form-item">
                                <label class="bk-label ta-l" style="width:150px;">姓名：</label>
                                <div class="bk-form-content" style="margin-left:150px;">
                                    <input type="text" class="bk-form-input" name="" placeholder="" value="王小妹" readonly>
                                </div>
                            </div>
                            <div class="bk-form-item mt5">
                                <label class="bk-label ta-l" style="width:150px;">身份证号：</label>
                                <div class="bk-form-content" style="margin-left:150px;">
                                    <input type="text" class="bk-form-input" name="" placeholder="" value="457784125412412201" readonly>
                                </div>
                            </div>
                            <div class="bk-form-item mt5">
                                <label class="bk-label ta-l" style="width:150px;">学历：</label>
                                <div class="bk-form-content" style="margin-left:150px;">
                                    <input type="text" class="bk-form-input" name="" placeholder="" value="本科" readonly>
                                </div>
                            </div>
                        </form>
                    </div>
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
                        <tr>
                            <td>分期乐</td>
                            <td class="text-r">35000</td>
                            <td>未逾期</td>
                            <td>0</td>
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
                        <tr>
                            <td>分期乐</td>
                            <td class="text-r">35000</td>
                            <td>未逾期</td>
                            <td>0</td>
                            <td><a href="#none">查看图片</a></td>
                            <td>
                                <a class="bk-text-button" href="#none">编辑</a>
                                <a class="bk-text-button" href="#none">删除</a>
                            </td>
                        </tr>
                        <tr>
                            <td>分期乐</td>
                            <td class="text-r">35000</td>
                            <td>未逾期</td>
                            <td>0</td>
                            <td><a href="#none">查看图片</a></td>
                            <td>
                                <a class="bk-text-button" href="#none">编辑</a>
                                <a class="bk-text-button" href="#none">删除</a>
                            </td>
                        </tr>
                        <tr>
                            <td>分期乐</td>
                            <td class="text-r">35000</td>
                            <td>未逾期</td>
                            <td>0</td>
                            <td><a href="#none">查看图片</a></td>
                            <td>
                                已偿还 2017-6-1
                            </td>
                        </tr>
                        <tr class="total">
                            <td>债务总数</td>
                            <td class="text-r">待还金额 75000</td>
                            <td>债务个数：2</td>
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
        <div class="bk-panel mt20">
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
                        <tr>
                            <td>2017\7\1 10:30</td>
                            <td>吴大头</td>
                            <td>编辑债务明细\编辑重组明细</td>
                            <td>操作备注</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
<script>
export default {}
</script>
<style scoped>
</style>
