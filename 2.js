//老的转换
const babel = require('@babel/core');
const sourceCode = '<h1 id="id1"  ref="ref2">hello</h1>';
const output = babel.transform(sourceCode,{
    plugins:[
        ['@babel/plugin-transform-react-jsx',{runtime:'classic'}]   // classin  automatic
    ]
});
console.log(output.code);