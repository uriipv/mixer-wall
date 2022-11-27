import * as s from "../styles/globalStyles";

function FooterView({ config }) {
  return (
    <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
      <s.TextDescription
        style={{
          textAlign: "center",
          color: "var(--primary-text)",
        }}
      >
        Please make sure you are connected to the right network (
        {config.NETWORK.NAME} Mainnet) and the correct address. Please note:
        Once you make the purchase, you cannot undo this action.
      </s.TextDescription>
      <s.SpacerSmall />
      <s.TextDescription
        style={{
          textAlign: "center",
          color: "var(--primary-text)",
        }}
      >
        We have set the gas limit to {config.GAS_LIMIT} for the contract to
        successfully mint your NFT. We recommend that you don't lower the gas
        limit.
      </s.TextDescription>
    </s.Container>
  );
}
export default FooterView;
