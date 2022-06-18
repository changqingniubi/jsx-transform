const babel = require('@babel/core');
const sourceCode = '<h1 id="id1"  ref="ref2">hello</h1>';
debugger
const output = babel.transform(sourceCode,{
    plugins:[
        ['@babel/plugin-transform-react-jsx',{runtime:'automatic'}]
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
*/