<template>
    <section>
        <div class="bk-panel mb20">
            <div class="bk-panel-body p25">
                <form class="bk-form">
                    <div class="row">
                        <!-- 交互说明: 选中条件后给A标签添加类 on -->
                        <div id="time" class="col-md-12 col-lg-12 col-xs-12 mb10">
                            <label class="bk-label pr15" style="width:100px;">提交时间：</label>
                            <a class="bk-button bk-default bk-button-small check-list-button on" title=""><span>全部</span></a>
                            <a class="bk-button bk-default bk-button-small check-list-button" title=""><span>最近一小时</span></a>
                            <a class="bk-button bk-default bk-button-small check-list-button" title=""><span>最近一天</span></a>
                        </div>
                        <div id="status" class="col-md-12 col-lg-12 col-xs-12">
                            <label class="bk-label pr15" style="width:100px;">当前状态：</label>
                            <a class="bk-button bk-default bk-button-small check-list-button on" title=""><span>全部</span></a>
                            <a class="bk-button bk-default bk-button-small check-list-button" title=""><span>发起请求</span></a>
                            <a class="bk-button bk-default bk-button-small check-list-button" title=""><span>待指派面签员</span></a>
                            <a class="bk-button bk-default bk-button-small check-list-button" title=""><span>待审核并生成账单</span></a>
                            <a class="bk-button bk-default bk-button-small check-list-button" title=""><span>用户确认重组</span></a>
                            <a class="bk-button bk-default bk-button-small check-list-button" title=""><span>我方代偿中</span></a>
                            <a class="bk-button bk-default bk-button-small check-list-button" title=""><span>用户还款中</span></a>
                            <a class="bk-button bk-default bk-button-small check-list-button" title=""><span>已还清</span></a>
                            <a class="bk-button bk-default bk-button-small check-list-button" title=""><span>关闭</span></a>
                        </div>
                    </div>
                    <div class="row more-query-cont mt15">
                        <div class="col-md-4 col-lg-4 col-xs-4">
                            <div class="bk-form-item mb20">
                                <label class="bk-label pr15" style="width:100px;">身份证：</label>
                                <div class="bk-form-content" style="margin-left:100px;">
                                    <input type="text" class="bk-form-input" placeholder="请输入身份证号码" style="width:100%;">
                                </div>
                            </div>
                            <div class="bk-form-item mb20">
                                <label class="bk-label pr15" style="width:100px;">手机号：</label>
                                <div class="bk-form-content" style="margin-left:100px;">
                                    <input type="text" class="bk-form-input" placeholder="请输入手机号码" style="width:100%;">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-lg-4 col-xs-4">
                            <div class="bk-form-item mb20">
                                <label class="bk-label pr15" style="width:100px;">面签员姓名：</label>
                                <div class="bk-form-content" style="margin-left:100px;">
                                    <input type="text" class="bk-form-input" placeholder="请输入面签员姓名" style="width:100%;">
                                </div>
                            </div>
                            <div class="bk-form-item mb20">
                                <label class="bk-label pr15" style="width:100px;">面签员手机：</label>
                                <div class="bk-form-content" style="margin-left:100px;">
                                    <input type="text" class="bk-form-input" placeholder="请输入面签员手机" style="width:100%;">
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
                                    <input type="text" class="bk-form-input" placeholder="请输入关键字" style="width:100%;">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-12 col-xs-12">
                            <div class="bk-form-item mb20">
                                <label class="bk-label pr15" style="width:100px;">所在地区：</label>
                                <div class="bk-form-content" style="margin-left:100px;">
                                    <input type="text" class="bk-form-input" placeholder="省" style="width:10%;">
                                    <input type="text" class="bk-form-input" placeholder="市" style="width:10%;">
                                    <input type="text" class="bk-form-input" placeholder="区" style="width:10%;">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-12 col-xs-12">
                            <div class="bk-form-content" style="margin-left:100px;">
                                <button class="bk-button bk-success">查询</button>
                            </div>
                        </div>
                    </div>
                    <!-- 交互说明 ：收起时更改文案为 展开更多查询条件，同时隐藏 more-query-cont -->
                    <a class="more-query-link" href="#none">收起更多查询条件</a>
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
            <div class="bk-panel-body p0">
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
                        <tr>
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
                                <!-- <a class="bk-icon-button bk-warning bk-button-mini" title="查看" href="#/order-info">
                                    <i class="bk-icon icon-eye bk-icon"></i>
                                    <i class="bk-text">查看详情</i>
                                </a> -->
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" name="checkall" value="">
                            </td>
                            <td>XY20170303254541</td>
                            <td>李二</td>
                            <td>广东省深圳市南山区</td>
                            <td>王五</td>
                            <td>审核并生成账单</td>
                            <td>36分钟前</td>
                            <td>
                                <a class="bk-icon-button bk-warning bk-button-mini" title="查看" href="#/order-info">
                                    <i class="bk-icon icon-eye bk-icon"></i>
                                    <i class="bk-text">查看详情</i>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" name="checkall" value="">
                            </td>
                            <td>XY20170303254541</td>
                            <td>李二</td>
                            <td>广东省深圳市南山区</td>
                            <td>王五</td>
                            <td>用户确认重组</td>
                            <td>36分钟前</td>
                            <td>
                                <a class="bk-icon-button bk-warning bk-button-mini" title="查看" href="#/order-info">
                                    <i class="bk-icon icon-eye bk-icon"></i>
                                    <i class="bk-text">查看详情</i>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" name="checkall" value="">
                            </td>
                            <td>XY20170303254541</td>
                            <td>李二</td>
                            <td>广东省深圳市南山区</td>
                            <td>王五</td>
                            <td>代偿</td>
                            <td>36分钟前</td>
                            <td>
                                <a class="bk-icon-button bk-warning bk-button-mini" title="查看" href="#/order-info">
                                    <i class="bk-icon icon-eye bk-icon"></i>
                                    <i class="bk-text">查看详情</i>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" name="checkall" value="">
                            </td>
                            <td>XY20170303254541</td>
                            <td>李二</td>
                            <td>广东省深圳市南山区</td>
                            <td>王五</td>
                            <td>已还清</td>
                            <td>36分钟前</td>
                            <td>
                                <a class="bk-icon-button bk-warning bk-button-mini" title="查看" href="#/order-info">
                                    <i class="bk-icon icon-eye bk-icon"></i>
                                    <i class="bk-text">查看详情</i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="bk-panel-footer p10">
                <div class="bk-page bk-compact-page fr">
                    <ul>
                        <li class="page-item">
                            <a href="javascript:void(0);" class="page-button">
                                <i class="bk-icon icon-angle-left"></i>
                            </a>
                        </li>
                        <li class="page-item">
                            <a href="javascript:void(0);" class="page-button">1</a>
                        </li>
                        <li class="page-item cur-page">
                            <a href="javascript:void(0);" class="page-button">2</a>
                        </li>
                        <li class="page-item">
                            <a href="javascript:void(0);" class="page-button">3</a>
                        </li>
                        <li class="page-item">
                            <a href="javascript:void(0);" class="page-button">4</a>
                        </li>
                        <li class="page-item">
                            <a href="javascript:void(0);" class="page-button">5</a>
                        </li>
                        <li class="page-item">
                            <a href="javascript:void(0);" class="page-button">6</a>
                        </li>
                        <li class="page-item">
                            <a href="javascript:void(0);" class="page-button">
                                <i class="bk-icon icon-angle-right"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {}
</script>
<style scoped>
</style>
