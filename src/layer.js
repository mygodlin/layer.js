
; (function (win, undefined) {
    // 将观察者放在闭包中，当页面加载就立即执行。
    var Observer = (function () {
        // 防止消息队列暴露而被篡改，故将消息容器作为静态私有变量保存
        var _messages = {};
        return {
            // 注册消息接口
            regist: function (type, fn) {
                // 如果此消息不存在则应该创建一个该消息类型并将该消息放入消息队列
                if (typeof _messages[type] === 'undefined') {
                    // 将动作推入到该消息对应的动作执行队列中
                    _messages[type] = [fn];
                }
                // 如果此消息存在
                else {
                    // 将动作方法推入该消息对应的动作执行序列中
                    _messages[type].push(fn);
                }
                return this;
            },
            // 发布信息接口
            fire: function (type, args) {
                // 如果该消息没有被注册，则返回
                if (!_messages[type]) {
                    return;
                }
                // 定义消息信息
                var events = {
                    type: type,
                    args: args || {}
                },
                    i = 0,
                    len = _messages[type].length;
                // 遍历消息动作
                for (; i < len; i++) {
                    // 依次执行注册的消息对应的动作序列
                    _messages[type][i].call(this, events);
                }
            },
            // 移除信息接口
            remove: function (type, fn) {

                if (fn === undefined && _messages[type] != undefined) {
                    delete _messages[type];
                    return;
                }
                // 如果消息动作队列存在
                if (_messages[type] instanceof Array) {
                    // 从最后一个消息动作遍历
                    var i = _messages[type].length - 1;
                    for (; i >= 0; i--) {
                        // 如果存在该动作，则在消息动作序列中移除相应动作
                        _messages[type][i] === fn && _messages[type].splice(i, 1);
                    }

                }
            },
            getMessages: function () {
                return _messages;
            },
            isMessage: function (type) {
                return _messages.hasOwnProperty(type);
            }
        }
    })();
    var Layer = function (className, options) {
        var $_w_cn = function (cn) {
            return document.getElementsByClassName(cn);
        }
        var layerShadeNode = $_w_cn("layer-shade")[0];
        var layerNode = $_w_cn(className)[0];
        var $_l_cn = function (cn) {
            return layerNode.getElementsByClassName(cn);
        }
        var closeNode = $_l_cn("layer-close")[0];
        var okNode = $_l_cn("layer-btn-ok")[0];
        var cancelNode = $_l_cn("layer-btn-cancel")[0];
        var layerContentNode = $_l_cn("layer-content")[0];
        var layerTitleNode = $_l_cn("layer-title")[0];
        var layerBtnsNode = $_l_cn("layer-btns")[0];
        // 默认参数
        var defaultOptions = {
            size: { width: "400px", height: "200px" }/* ,
            confirm: function() {}   */
        }

        // 对象合并
        function extend(o, n, override) {
            // 将n的值赋值给o（o为默认参数，n为传递的参数）
            for (var key in n) {
                if (o.hasOwnProperty(key)) {
                    o[key] = n[key];
                }
            }
            return o;
        }

        var layer = {
            options: extend(defaultOptions, options),
            init: function () {
                this.event();
                this.size();
                return this;
            },
            event: function () {
                var _this = this;
                closeNode.onclick = function () {
                    _this.hide();
                }
                okNode.onclick = function () {
                    _this.hide();
                    // 执行确认操作后执行的操作
                    _this.options.confirm ? _this.options.confirm() : Observer.fire('confirm');
                }
                cancelNode.onclick = function () {
                    _this.hide();
                }
                return this;
            },
            hide: function () {
                layerNode.style.display = 'none';
                layerShadeNode.style.display = 'none';
                return this;
            },
            show: function () {

                layerNode.style.display = 'block';
                layerShadeNode.style.display = 'block';
                return this;
            },
            size: function () {
                layerNode.style.width = this.options.size.width;
                var otherHeight = layerTitleNode.offsetHeight + layerBtnsNode.offsetHeight;
                layerContentNode.style.height = parseFloat(this.options.size.height.split("px")[0]) - otherHeight - 40 + 'px';
                return this;
            },
            on: function (type, fn) {
                Observer.regist(type, fn);
            },
            unbind: function (type) {
                Observer.remove(type);
            }
        }
        layer.init();
        return layer;
    }
    win.Layer = Layer;
})(window)