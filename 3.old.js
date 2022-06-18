
let React = require('react');
let element = React.createElement("h1", {
    id: "id1",
    ref: "ref2"
  }, "hello");
console.log(JSON.stringify(element,replacer,2));
function replacer(key,value){
    if(!["_owner","_store"].includes(key)){
        return value;
    }
}
