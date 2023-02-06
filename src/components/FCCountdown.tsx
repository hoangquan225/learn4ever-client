import { memo } from "react";
import Countdown from "antd/es/statistic/Countdown";
import moment from "moment";
import TTCSconfig from "../submodule/common/config";
import { requestUpdateStudiedForUser } from "../redux/slices/userSlice";
import { useAppDispatch } from "../redux/hook";
import { unwrapResult } from "@reduxjs/toolkit";

const CountDownRender = (props: {
  count: number;
  onFinish: (time: any) => void;
}) => {
  const { count, onFinish } = props;

  return (
    <Countdown
      value={count}
      onFinish={() => {
        onFinish(0);
      }}
      onChange={onFinish}
    />
  );
};

export default memo(CountDownRender);
