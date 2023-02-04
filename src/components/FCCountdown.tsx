import { memo } from "react";
import Countdown from "antd/es/statistic/Countdown";

const CountDownRender = ({ count, onFinish }: any) => {
  console.log("re-render");

  return (
    <Countdown value={Date.now() + count * 1000 * 60} onFinish={onFinish} />
  );
};

export default memo(CountDownRender);
