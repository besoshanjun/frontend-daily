import React from "react";
const dataSource = {};

function withComponent(selectData = () => {}) {
  return function(WrapperComponent){

    console.log("selectData: ", selectData);
    console.log("WrapperComponent: ", WrapperComponent);
    return class extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            data: selectData(dataSource, props),
          };
        }
  
        componentDidMount() {
          console.log("hoc did mount");
        }
  
        render() {
          console.log("this.props", this.props);
          return <WrapperComponent data={this.state.data} {...this.props} />;
        }
      };
  }
}

export default withComponent;
