## 纯js弹框插件

#### 1. 用法

第一步：引入js和css

```
<link rel="stylesheet" href="layer.css">
<script src="layer.js"></script>
```
第二步：将弹框HTML放到body中
```
<div class="layer-shade"></div>
<div class="layer">
    <div class="layer-title">
        标题
    </div>
    <span class="layer-close">+</span>
    <div class="layer-content">
        上弹出
    </div>
    <div class="layer-btns">
        <span class="layer-btn-ok">确认</span>
        <span class="layer-btn-cancel">取消</span>
    </div>
</div>
```
第三步：初始化
```
var layer = new Layer("layer");
```
第四步：显示弹框：
```
layer.show();
```
#### 2. 当确认按钮点击后，执行其他操作

第一种方法：

```
new Layer("layer",{
    confirm: function() {
        // 执行你想执行的操作
    }
})
```
第二种方法:

```
layer.on('confirm', function() {
    // 执行你想执行的操作
    console.log('确认操作...')
})
```

移除通过 on 监听的事件：

```
layer.unbind('confirm');
```

> 注意:两种方法同时使用，只有第一种方法起作用

#### 3. 设置弹框宽高

```
new Layer("layer",{
    size: {width: "400px", height: "300px"}
})
```

## API

- layer.show();显示弹框
- layer.hide();隐藏弹框

## 支持

1）插件自身的作用域与用户当前的作用域相互独立，也就是插件内部的私有变量不能影响使用者的环境变量；
2）插件需具备默认设置参数；
3）插件除了具备已实现的基本功能外，需提供部分API，使用者可以通过该API修改插件功能的默认参数，从而实现用户自定义插件效果；
4）插件支持链式调用；
5）插件需提供监听入口，及针对指定元素进行监听，使得该元素与插件响应达到插件效果。

## 不支持模块化

本插件只是学习使用，没有添加模块化支持，如果需要，可在源码中：

将

```
win.Layer = Layer;
```
替换为：
```
// 最后将插件对象暴露给全局对象
var _global = (function(){ return this || (0, eval)('this'); }());
if (typeof module !== "undefined" && module.exports) {
    module.exports = Layer;
} else if (typeof define === "function" && define.amd) {
    define(function(){return Layer;});
} else {
    !('Layer' in _global) && (_global.Layer = Layer);
}
```
## 不支持错误回显

如果需要可自行尝试；







