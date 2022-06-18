
const pluginSyntaxJsx = require('@babel/plugin-syntax-jsx').default;
let types = require('@babel/types');
const pluginTransformReactJsx = {
    inherits:pluginSyntaxJsx,
    visitor:{
        //这里写一个AST语法树节点的类型名
        //在babel遍历语法树的时候，如果发现当前遍历 的节点的类型和JSXElement一样，那么会把那个路径传过来
        JSXElement(path){
            //_jsx("h1", {id: "id1",ref: "ref2",children: "hello"});
            let callExpression = buildJSXElementCall(path);
            //用新的节点替换掉当前路径上的面老的节点
            path.replaceWith(callExpression);
        }
    }
}
function buildJSXElementCall(path){
    //获取 openingElement的子路径
    const openingElementPath = path.get('openingElement');
    const {name}= openingElementPath.node.name;//h1
    const tag = types.stringLiteral(name);//{type:'stringLiteral',value:'h1'}
    const args = [tag];
    let attributes = [];
    //把二个老的属性节点放到attributes数组里
    for(const attrPath of openingElementPath.get('attributes')){
        attributes.push(attrPath.node);//JSXAttribute
    }
    const children = buildChildren(path.node);
    const props = attributes.map(convertAttribute);
    //如果有儿子的话
    if(children.length>0){
        props.push(buildChildrenProperty(children));
    }
    //创建参数对象{id: "id1",ref: "ref2"}
    const propsObject = types.objectExpression(props);
    args.push(propsObject);
    return call(path,'jsx',args);
}
function buildChildrenProperty(children){
  let childrenNode;
  if(children.length==1){
    childrenNode=children[0];
  }else if(children.length>1){
    childrenNode=types.arrayExpression(children);
  }
  return types.objectProperty(types.identifier('children'),childrenNode);
}
function buildChildren(node){
    const elements = [];
    for(let i=0;i<node.children.length;i++){
        let child = node.children[i];
        elements.push(types.stringLiteral(child.value));
    }
    return elements;
}
/**
 * 把JSXAttribute对象映射成objectProperty对象
 * @param {把} node 
 */
function convertAttribute(node){//JSXAttribute
    node.name.type = 'Identifier';
    let objectProperty = types.objectProperty(node.name,node.value);
    return objectProperty;
}
function call(path,name,args){
    const importSource = 'react/jsx-runtime';
    const callee = addImport(path,name,importSource);
  //先创建一个_jsx标识符节点
  //const callee = types.identifier('_jsx');
  //再创建一个callExpression节点 callee方法名 args方法的参数
  const callExpression = types.callExpression(callee,args);
  return callExpression;
}
/**
 * import { jsx as _jsx } from "react/jsx-runtime";
 * @param {*} path 
 * @param {*} importName 导入的名称 jsx
 * @param {*} importSource 导入的模块名
 */
function addImport(path,importName,importSource){
    //从当前的路径向上查找，找到Program路径
    const programPath = path.find(p=>p.isProgram());
    //获取作用域
    const programScope = programPath.scope;
    //在当前program使用域 内生成不会与作用域内变量冲突的变量名
    const localName = programScope.generateUidIdentifier(importName);//jsx=>_jsx
    //创建导入语句
    const importSpecifier = types.importSpecifier(localName,types.identifier(importName));
    const specifiers = [importSpecifier];
    const importDeclaration = types.importDeclaration(specifiers,types.stringLiteral(importSource));
    programPath.unshiftContainer('body',[importDeclaration]);
    return localName;
}

module.exports = pluginTransformReactJsx;

/**
 * Support for the experimental syntax 'jsx' isn't currently enabled (1:1):
 */