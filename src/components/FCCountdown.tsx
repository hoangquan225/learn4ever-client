import { memo } from "react";
import Countdown from "antd/es/statistic/Countdown";
import moment from "moment";

const CountDownRender = ({ count, onFinish }: any) => {
  console.log("re-render");

  return (
    <Countdown
      value={moment().valueOf() + count * 1000 * 60}
      onFinish={onFinish}
    />
  );
};

export default memo(CountDownRender);
