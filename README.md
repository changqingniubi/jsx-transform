//<h1 id="title1"  ref="title2">hello</h1>
React17之前的转换
/**
 h1元素的类型
 config 配置对象  {id:"title1",ref:"title2"}
 children以展开的方式 放在后面 有可能没有，也有可能是一个儿子，也有可能是多个儿子
**/
React.createElement("h1", {
  id: "title1",
  ref: "title2"
}, "hello");


React17这后的转换
var _jsxRuntime = require("react/jsx-runtime");
/**
h1 还是元素的类型
props 直接就是属性了 包括 所有的属性，包括 children
  undefined 一个字符串或者数字或者React元素，也可能是一个数组
**/
_jsxRuntime.jsx("h1", {
  id: "title1",
  ref: "title2",
  children: "hello"
});