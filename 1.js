let babel = require('@babel/core');//babel的核心库
let types = require('@babel/types');//类型相关的库，可以用来生成新的节点
let traverse = require('@babel/traverse').default;//遍历语法树的
let generate = require('@babel/generator').default;//用来从语法树生成源代码
//将要转换的老代码
const sourceCode = `function ast(){}`;
//通过parse方法可以把老代码转成老的语法树
const astTree = babel.parse(sourceCode);
/**
 * 是一种设计模式，用来访问的操作一个复杂对象的内部节点的
 */
let indent = 0;
const padding = ()=>" ".repeat(indent);//把空格重复多少次
//在遍历的时候会把老的语法改掉，改完之后就是新的语法树了
const visitor = {
  //代表路径 path
  //node代表此路径上的语法树的节点
  enter(path){
    console.log(padding()+'进入'+path.node.type);
    //如果当前的这个path上面挂的节点是一个函数声明节点的话
    if(types.isFunctionDeclaration(path.node)){
        path.node.id.name = 'newAst';
    }
    indent+=2;
  },
  exit(path){
    indent-=2;
    console.log(padding()+'离开'+path.node.type);
  }
}
//遍历老的语法树,以深度优先的方式遍历语法树
//遍历到每个节点的时候，会把这个节点对应的对象传给enter方法，离开的时候传给exit方法
traverse(astTree,visitor);
//根据转换后的语法树重新生成新的代码
let output = generate(astTree);
console.log(output.code);

/**
 {
     type:'Program',
     body:[
         {
             type:'FunctionDeclaration',
             id:{
                 type:'Identifier',
                 name:'ast'
             },
             body:{
                 type:'BlockStatement'
             }
         }
     ]
 }
 */