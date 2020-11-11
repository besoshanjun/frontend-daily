import React from "react";
import WithComponent from "./hoc/hoc";

// @WithComponent(
//   (data, props) => {
//     console.log('data, props: ', data, props);
//     return data['a'] = props.app
//   }
// )
// class UseHocComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     console.log('this.props use hoc' ,this.props)
//     return <div>class Component</div>;
//   }
// }

function UseHocComponent () {
  return <div>class Component</div>;
}

export default WithComponent(
  (data, props) => {
    console.log('data, props: ', data, props);
    return data['a'] = props.app
  }
)(UseHocComponent);
