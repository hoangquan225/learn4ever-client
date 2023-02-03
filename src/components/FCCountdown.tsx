import { memo } from "react";
import Countdown from "antd/es/statistic/Countdown";

const CountDownRender = ({ count }: any) => {
  console.log("re-render");

  return <Countdown value={Date.now() + count * 1000 * 60} />;
};

export default memo(CountDownRender);
