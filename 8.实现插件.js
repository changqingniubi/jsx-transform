const babel = require('@babel/core');
const sourceCode = '<h1 id="id1"  ref="ref2">hello</h1>';
const pluginTransformReactJsx = require('./plugin-transform-react-jsx');
//'@babel/plugin-transform-react-jsx'
/**
 * transform是用来把源代码通过插件转成目标代码
 * 1.先把sourceCode转换AST老的抽象语法树
 * 2.遍历语法树，应用插件处理语法树
 * 3.再根据新的语法树生成新代码
 */
const output = babel.transform(sourceCode,{
    plugins:[
        [pluginTransformReactJsx,{runtime:'automatic'}]
    ]
});
console.log(output.code);
/**
import { jsx as _jsx } from "react/jsx-runtime";
_jsx("h1", {
    id: "id1",
    ref: "ref2",
    children: "hello"
  });
  jsx是facebook自已发明的语法
  标准的ecmaScript肯定不认识 
*/