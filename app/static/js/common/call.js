// 弹窗页面回调函数
var SelfCall = {
    Layer: function (obj) {
        var defaults = {
            area: ["100%", "100%"]
        };
        var index = layer.open({
            type: 2,
            title: obj.title, //弹框的标题
            zIndex: 100,
            id: "call_order",
            shadeClose: false,
            scrollbar: false,
            moveOut: true,
            maxmin: true,
            offset: obj.offset, //
            area: obj.area || defaults.area, //面积
            content: obj.content, //弹窗的页面地址
            // content: obj.content + "?id=" + data,
            success: function () {
                //弹屏成功的回调
                if (obj.success && Object.prototype.toString.call(obj.success).slice(8, -1) == 'Function') {
                    obj.success();
                }
            },
            end: function () {
                //关闭弹屏之后
                if (obj.end && Object.prototype.toString.call(obj.end).slice(8, -1) == 'Function') {
                    obj.end();
                }
            }
        });
        if (obj.inlet == 'recall') {
            layer.full(index)
        }
    }
};