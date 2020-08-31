import React from "react";
import "./index.scss";

interface BusinessManageProps {}
interface BusinessManage {
  props: BusinessManageProps;
}
class BusinessManage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="veer-offline-businesss-no">
        <span>暂未开放，敬请期待</span>
      </div>
    );
  }
}
export default BusinessManage;
