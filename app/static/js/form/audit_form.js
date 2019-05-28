// 测试
$(function () {
    var _sope = {
        init: function () {
            this.eventInit();
            // 初始化select的样式

            // $(".chosen-select").chosen({
            //     max_selected_options: 2,
            // });

        },
        eventInit: function () {
            this.methods.bindHandleButton();
            /*
            this.methods.bindInitTimer();
            this.methods.bindSubmitButton();
            this.methods.bindAudioPlay();
            this.methods.bindCall();
            this.methods.bindPageInputBlur();
            this.methods.bindSlectTime();
            this.methods.bindTopTab();
            this.methods.bindPage();
            */

            //订单查询页的事件
            this.methods.bindAddProject();
            /*
            this.methods.bindStatusMulti();
            this.methods.bindSelectAll();
            this.methods.bindEditPhone();
            this.methods.bindLiCheckbox();
            this.methods.bindDistriService();
            this.methods.clickMore();
            */
        },
        common: {
            // 弹窗公共用的方法
            modal: function (obj) {

                var container = $(obj.el),
                    close = container.find('.alert-title .cancel'), //取消按键
                    cancel = container.find('.alert-bottom .alert-close'), //取消按键
                    confirm = container.find('.alert-bottom .confirm'); //quren

                container.css('display', 'block'), container.find('.alert-mian').fadeIn();

                //关闭
                close.unbind('click').click(function () {
                    container.find('.alert-mian').fadeOut(function () {
                        container.css('display', 'none');
                    });

                });
                //取消
                cancel.unbind('click').click(function () {
                    close.trigger('click');
                });
                //确认
                confirm.unbind('click').click(function () {
                    obj.callback_confirm && Object.prototype.toString.call(obj.callback_confirm).slice(8, -1) == 'Function' && obj.callback_confirm(this);
                })

            },
            // 修改手机方法
            modifyPhone: function (obj) {
                var container = $('#modify_phone'),
                    close = container.find('.alert-bottom .alert-close');
                container.find('input[name="orderid"]').val(obj.id);
                container.find('input[name="old_phone"]').val(obj.phone);


                new _sope.common.modal({
                    el: '#modify_phone',
                    callback_confirm: function (self) {
                        var form = $(self).parents('form'),
                            data = form.serialize();

                        close.trigger('click');

                        $.post('/order/process/ajaxModifyPhoneByOid', data, function (res) {
                            alert(res.msg);
                            if (res.error_code == 0) location.reload();
                        });
                    }
                });

            }
        },
        methods: {
            /*
            clickMore: function () {
                $('.click-more').on('click', function () {
                    var _this = $(this);
                    _this.parent().hide();
                    _this.parent().next().show();
                })
                $('.click-put-away').on('click', function () {
                    var _this = $(this);
                    _this.parent().hide();
                    _this.parent().prev().show();
                })
            },
            bindTopTab: function () {
                $('#au_form .audit_search_title label').on('click', function () {
                    var _this = $(this),
                        form = _this.parents('form'),
                        state = _this.data('state');

                    form.find('input[name="state"]').val(state);
                    form.find('input[name="page"]').val(1);

                    form.submit();
                });
            },
            //搜索快速选择时间
            bindSlectTime: function () {
                $('.fast_select select').change(function () {
                    var _this = $(this),
                        value = +_this.val();

                    // 今天 昨天 最近3天  最近7天  最近一个月    最近半年 最近一年
                    function getNearTime(day) {
                        var cur = new Date(),
                            nearTime = cur.getTime() - day * 24 * 3600 * 1000;
                        day == 1 ? nearTime = ((nearTime / 1000) - 1) * 1000 : nearTime;
                        var n_time = new Date(nearTime),
                            y_m_d = n_time.getFullYear() + '-' + ((n_time.getMonth() + 1) < 10 ? '0' + (n_time.getMonth() + 1) : (n_time.getMonth() + 1)) + '-' + (n_time.getDate() < 10 ? '0' + n_time.getDate() : n_time.getDate());

                        function f(d, x) {
                            return d < x ? '0' + d : d;
                        }

                        if (arguments.length == 2) {
                            return day == 1 ? (y_m_d + ' 23:59:59') : (y_m_d + ' ' + f(cur.getHours(), 10) + ':' + f(cur.getMinutes(), 10) + ':' + f(cur.getSeconds(), 10))
                        }
                        return y_m_d + ' 00:00:00';

                    }

                    //1.填充开始的时间
                    $('#begin_time').val(getNearTime(value));
                    //2.填充结束的时间
                    value == 1 ? $('#end_time').val(getNearTime(1, 566)) : $('#end_time').val(getNearTime(0, 66));
                });
            },
            //初始化时间控件
            bindInitTimer: function () {
                function timer(elId) {
                    laydate.render({
                        elem: elId, //指定元素
                        theme: '#1e99c7', //颜色
                        type: "datetime"
                    });
                };
                timer('#begin_time');
                timer('#end_time');
            },
            //提交按钮
            bindSubmitButton: function () {
                $('#au_form').on('click', 'button', function (e) {
                    e.preventDefault();
                    var _this = $(this),
                        form = _this.parents('form'),
                        b_time = $('#begin_time').val(),
                        e_time = $('#end_time').val();


                    function format(time) {
                        return new Date(time).getTime() / 1000
                    };

                    if (format(b_time) > format(e_time)) return alert('开始时间应该小于结束时间!');

                    form.find('input[name="page"]').val(1);

                    form.submit();
                });
            },
            */
            //操作栏几个按钮
            bindHandleButton: function () {
                $('table .handle a').on('click', function () {
                    var _this = $(this),
                        type = _this.data('type'),
                        inlet = _this.data('inlet'),
                        table = _this.parents('table'),
                        id = +table.find('.orderId b').html();
                    ;
                    switch (type) {
                        case 'record': {
                            var empty = _this.hasClass('empty'),
                                active = _this.hasClass('active'),
                                tr = table.find('tr.record_info'),
                                flag = +tr.attr('flag');

                            if (empty) return;

                            if (flag) {
                                active ? (_this.removeClass('active'), table.find('tr.record_info td').slideUp(200)) : (_this.addClass('active'), table.find('tr.record_info td').slideDown(200));
                            } else {
                                //请求生成回访记录
                                $.get('/order/orderSearchInfo/ajaxGetRecord?orderid=' + id, {}, function (res) {
                                    active ? (_this.removeClass('active'), table.find('tr.record_info td').slideUp(200)) : (_this.addClass('active'), table.find('tr.record_info td').slideDown(200));
                                    //标识已经请求且已经有内容
                                    tr.attr('flag', 1);

                                    if (!res.error_code) {
                                        var msg = res.msg,
                                            com_list = [],
                                            re_list = [];

                                        com_list.push('<h3>该订单分给 :</h3>');

                                        if (msg.com_list) {
                                            for (var k in msg.com_list) {
                                                if (msg.com_list[k]['is_give'] == 1) {
                                                    com_list.push('<p>【' + msg.com_list[k]['comname'] + '】<span style="color: #19aa8d;">【赠送】</span></p>')
                                                } else {
                                                    com_list.push('<p>【' + msg.com_list[k]['comname'] + '】</p>')
                                                }
                                            }
                                        } else {
                                            com_list.push('<p>【暂未分配公司】</p>')
                                        }
                                        ;
                                        //1.装修公司列表
                                        tr.find('.com_list').html(com_list.join(""));
                                        //2.装修公司的回访记录
                                        msg.visit.forEach(function (i) {
                                            // var audio = i.tbs_voice_url ? '<div class="audio"><i></i><span class="current">0:00</span>/ <span class="duration">00:00</span><audio>' +
                                            //     ' <source  src="' + i.tbs_voice_url + '" type="audio/mp3"></audio></div>' : '',

                                            if (i.recall_ontime_type == "1") {
                                                var audio = i.tbs_voice_url ? '<audio controls="controls"> <source  src="' + i.tbs_voice_url + '" type="audio/mp3"> </audio>' : '',
                                                    start_time = i.start_time ? '<p class="record_status color_o">下次回访 : ' + i.start_time + '</p>' : '',
                                                    order_status = i.order_change_state ? '<p class="record_status color_o">订单状态 : ' + i.order_change_state + '</p>' : '',
                                                    str = '<li><div class="record_name"><i class="fa fa-user"></i>' +
                                                        i.opp_realname + ' <span class="record_time">' + i.addtime + '</span><span class="icon-area">准时</span>' + audio +
                                                        '</div><div class="record-content">' + i.contents + ' </div>' + start_time + order_status + '</li>';
                                            } else {
                                                var audio = i.tbs_voice_url ? '<audio controls="controls"> <source  src="' + i.tbs_voice_url + '" type="audio/mp3"> </audio>' : '',
                                                    start_time = i.start_time ? '<p class="record_status color_o">下次回访 : ' + i.start_time + '</p>' : '',
                                                    order_status = i.order_change_state ? '<p class="record_status color_o">订单状态 : ' + i.order_change_state + '</p>' : '',
                                                    str = '<li><div class="record_name"><i class="fa fa-user"></i>' +
                                                        i.opp_realname + ' <span class="record_time">' + i.addtime + '</span>' + audio +
                                                        '</div><div class="record-content">' + i.contents + ' </div>' + start_time + order_status + '</li>';
                                            }

                                            re_list.push(str);
                                        });
                                        tr.find('.record_list ul').html(re_list.join(""));


                                        var audios = $('audio');

                                        setTimeout(function () {

                                            function format(num) {
                                                return Math.floor(num / 60) + ':' + (Math.floor(num % 60) < 10 ? '0' + Math.floor(num % 60) : Math.floor(num % 60));
                                            };
                                            for (var i = 0; i < audios.length; i++) {
                                                $(audios[i]).siblings('.duration').html(format(audios[i].duration));
                                            }
                                            ;

                                        }, 1000);


                                    }
                                });
                            }
                            ;

                        }
                            break;
                        case 'add': {
                            layer.open({
                                type: 2,
                                title: '添加回访', //弹框的标题
                                zIndex: 100,
                                id: "call_order",
                                shadeClose: true,
                                scrollbar: false,
                                moveOut: true,
                                maxmin: true,
                                area: ["700px", "650px"], //面积
                                content: '/order/Comment/order_status?orderid=' + id, //弹窗的页面地址
                                success: function () {
                                    //弹屏成功的回调
                                    // console.log('成功弹屏');
                                },
                                end: function () {
                                    //关闭弹屏之后
                                    // console.log('关闭');
                                }
                            });
                        }
                            break;
                        case 'details': {
                            SelfCall.Layer({
                                inlet: inlet,
                                title: '详情',
                                area: ["95%", "95%"],
                                content: _this.data('href'),
                                success: function () {
                                    //防止刷新页面拨打电话!
                                    if (getSection("isAlert")) return;
                                    //弹屏成功的回调
                                    setSection("isAlert", 1);
                                },
                                end: function () {
                                    removeSection("isAlert");
                                    window.parent.isPost = null;
                                    //关闭弹屏之后
                                    //弹屏结束之后要示闲
                                    // window.parent.application.oJVccBar.tobosu.closeAlert();
                                    if (window.parent.application == undefined) return;
                                    window.parent.application.oJVccBar.SetBusy();
                                    //如果是回拨 打完电话要告诉后台订单处理完毕并且将属性变为默认的0
                                }
                            });
                        }
                            break;
                        case 'newPage': {
                            if (window.parent.J_menu) {
                                window.parent.J_menu({
                                    title: _this.text(),
                                    url: _this.data('href')
                                });
                            } else {
                                layer.open({
                                    type: 2,
                                    title: _this.text(), //弹框的标题
                                    shadeClose: true,
                                    area: ['90%', '90%'], //面积
                                    content: _this.data('href'), //弹窗的页面地址
                                });
                            }
                        }
                            break;
                        case 'followup': {
                            type = _this.data("ordertype");
                            layer.open({
                                type: 2,
                                title: '要求跟进', //弹框的标题
                                zIndex: 100,
                                id: "call_order",
                                shadeClose: true,
                                scrollbar: false,
                                moveOut: true,
                                maxmin: true,
                                area: ["600px", "550px"], //面积
                                content: '/order/Comment/order_task?type=' + type + '&orderid=' + id, //弹窗的页面地址
                                success: function () {
                                },
                                end: function () {
                                }
                            });
                        }
                            break;
                    }
                });

            },
            /*
            //音乐播放
            bindAudioPlay: function () {
                $('.search_result .record_list .audio i').on('click', function () {
                    var _this = $(this),
                        flag = _this.hasClass('active'),
                        audio = _this.siblings('audio')[0],

                        total = audio.duration, //歌曲的长度
                        cur_span = _this.siblings('.current'),
                        duration_span = _this.siblings('.duration'),
                        timer = null;

                    function format(num) {
                        return Math.floor(num / 60) + ':' + (Math.floor(num % 60) < 10 ? '0' + Math.floor(num % 60) : Math.floor(num % 60));
                    };
                    //1.给当前的总长度复制
                    duration_span.html(format(total));
                    if (flag) {
                        //暂停
                        _this.removeClass('active');
                        audio.pause();
                        clearInterval(timer);
                    } else {
                        //播放
                        _this.addClass('active');
                        audio.play();
                        //设置定时器改变当前的播放进度
                        timer = setInterval(function () {
                            current = audio.currentTime; //当前播放的事件
                            if (format(current) == format(total)) {
                                _this.removeClass('active');
                                cur_span.html('0:00');
                                return clearInterval(timer);
                            }
                            ;
                            cur_span.html(format(current));
                        }, 1000);

                    }

                });
            },
            //点击回拨电话
            bindCall: function () {
                $('.search_result tbody .call').on('click', function () {
                    var _this = $(this);
                    phone = +_this.data('phone');
                    var id = +_this.data('id'),
                        button = _this.parents('table').find('button[data-type="details"]');

                    button.trigger('click');
                    $.get("/order/process/getPhone", {id: id}, function (res) {
                        if (!res.error_code) return alert("号码为空!");
                        tel = res.msg;
                        tbsCompatCall({
                            oJVccBar: function () {
                                window.parent.application.oJVccBar.MakeCall(tel + "", 3);
                                window.parent.application.oJBarDisplayer.callInfo.id = id;
                            },
                            superCall: function () {
                                window.parent.cti.callInfo.orderId = id;
                                window.parent.cti.callInfo.phone = tel;
                                typeof tel == "number" && window.parent.cti.onCallRing();
                            }
                        })
                    })

                });
            },
            //页码光标离开事件
            bindPageInputBlur: function () {
                $('.pageNum input').blur(function () {
                    var _this = $(this),
                        value = _this.val(),
                        form = $('.query_order_list');

                    form.find('input[name="pageSize"]').val(value);
                    form.submit();
                });
            },
            //点击对应页码
            bindPage: function () {
                $('.PageContent a').click(function () {
                    var _this = $(this),
                        form = $('.query_order_list'),
                        value = _this.data('page');


                    //改变请求的页码
                    form.find('input[name="page"]').val(value);

                    form.submit();
                });
            },
            */
            //添加表单
            bindAddProject: function () {
                /*
                $('#query_form button.search').click(function (e) {
                    e.preventDefault();
                    var form = $(this).parents('form');
                    form.find('input[name="page"]').val(1);

                    form.submit();
                });
                */
                $('button.add_project').click(function (e) {
                    e.preventDefault();

                    layer.open({
                        type: 2,           //iframe页面
                        title: '添加项目', //弹框的标题
                        zIndex: 100,
                        id: "call_order",
                        shadeClose: true,
                        scrollbar: false,
                        moveOut: true,
                        maxmin: true,
                        //  offset: obj.offset, //
                        area: ['90%', '90%'], //面积
                        content: '/project/create', //弹窗的页面地址
                    });
                });
            },
            /*
            bindStatusMulti: function () {
                $('.query_order_list .order_status').on('click', 'label', function () {
                    $(this).toggleClass('active');
                });
            },
            //编辑手机
            bindEditPhone: function () {
                $('.search_result li .pen').click(function () {
                    var _this = $(this),
                        phone = _this.siblings('.phone').html(),
                        id = _this.parents('table').find('.orderId b').html();
                    _sope.common.modifyPhone({id: id, phone: phone});

                });
            },
            bindSelectAll: function () {
                $('.search_result .select-all input[type="checkbox"]').click(function () {
                    var _this = $(this),
                        flag = _this.prop('checked'),
                        checkbox = $('.search_result  li .check_box input');

                    checkbox.each(function (v, i) {
                        $(i).prop('checked', flag);
                    });

                    //写入提交的订单数据
                    if (flag) {
                        //全选
                        var arr = []
                        checkbox.each(function (v, i) {
                            var id = $(i).parents('li').find('.orderId b').html();
                            arr.push(id);
                        });
                        $('#custom_service').find('input[name="oids"]').val(JSON.stringify(arr));
                    } else {
                        //清空
                        $('#custom_service').find('input[name="oids"]').val('[]');
                    }

                });
            },
            //订单列表上的单选
            bindLiCheckbox: function () {
                $('.search_result  li .check_box input').on('click', function () {

                    var _this = $(this),
                        check = _this.prop('checked'),
                        index = _this.parents('li').index(),
                        id = _this.parents('li').find('.orderId b').html(),
                        oids = JSON.parse($('#custom_service').find('input[name="oids"]').val() || '[]');

                    if (check) { //选中
                        oids.push(id);
                        //写入新数据
                        $('#custom_service').find('input[name="oids"]').val(JSON.stringify(oids));
                    } else {

                        oids.map(function (v, i) {
                            if (v == id) {
                                oids.splice(i, 1)
                                return;
                            }
                        });
                        //写入新数据
                        $('#custom_service').find('input[name="oids"]').val(JSON.stringify(oids));
                    }
                    ;

                });
            },
            //绑定分配客服
            bindDistriService: function () {
                $('.search_result .select-all button').on('click', function () {
                    //1先判定是否有数据 没有提示
                    var oids = JSON.parse($('#custom_service').find('input[name="oids"]').val() || '[]');

                    if (!oids.length) {
                        return alert('请先选择订单!');
                    }
                    //2.弹窗分配客服
                    layer.open({
                        type: 2,
                        title: '添加订单', //弹框的标题
                        zIndex: 100,
                        id: "call_order",
                        shadeClose: true,
                        scrollbar: false,
                        moveOut: true,
                        maxmin: true,
                        //  offset: obj.offset, //
                        area: ['600px', '470px'], //面积
                        content: '/Order/Process/OrdeGiveUser?oids=' + oids.join(',') //弹窗的页面地址
                    });

                });
            },
            */
        }
    };

    _sope.init();
});