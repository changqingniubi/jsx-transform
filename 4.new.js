//这个import jsx是编译器帮我们引入的，我们不需要处理
//import { jsx as _jsx } from "react/jsx-runtime";
let  { jsx : _jsx } = require("react/jsx-runtime");
let element = _jsx("h1", {
  id: "id1",
  ref: "ref2",
  key: "key3",
  children: "hello"
});
console.log(JSON.stringify(element,replacer,2));
function replacer(key,value){
    if(!["_owner","_store"].includes(key)){
        return value;
    }
}
/**
{
  "type": "h1",
  "key": "key3",
  "ref": "ref2",
  "props": {
    "id": "id1",
    "children": "hello"
  }
}
 */