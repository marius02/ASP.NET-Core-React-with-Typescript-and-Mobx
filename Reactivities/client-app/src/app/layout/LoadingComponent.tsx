import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
  inverted?: boolean;
  message?: string;
}
export default function LoadingComponent({
  inverted = true,
  message = "Loading...",
}: Props) {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader content={message} />
    </Dimmer>
  );
}
