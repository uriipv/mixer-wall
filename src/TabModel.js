import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

function TabGroup() {
  const depositString = "Deposit";
  const withdrawString = "Withdraw";

  const [isDepositActive, setIsDepositActive] = useState(false);
  const dispatch = useDispatch();
  const [claimingNft, setClaimingNft] = useState(false);
  const blockchain = useSelector((state) => state.blockchain);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    GAS_LIMIT: 0,
    SHOW_BACKGROUND: false,
  });

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };
  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <>
      <s.Container
        flex={2}
        jc={"top"}
        ai={"center"}
        style={{
          backgroundColor: "var(--accent)",
          padding: 24,
          borderRadius: 24,
          border: "4px dashed var(--secondary)",
          boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
        }}
      >
        <s.ButtonGroup>
          <s.Tab
            active={isDepositActive}
            onClick={() => setIsDepositActive(!isDepositActive)}
            style={{
              borderTopLeftRadius: 5,
            }}
          >
            {depositString}
          </s.Tab>
          <s.Tab
            active={!isDepositActive}
            onClick={() => setIsDepositActive(!isDepositActive)}
            style={{
              borderTopRightRadius: 5,
            }}
          >
            {withdrawString}
          </s.Tab>
        </s.ButtonGroup>
        <p />
        <p
          style={{
            backgroundColor: "blue",
          }}
        >
          Your payment selection: {isDepositActive ? "OK" : "JUAS"}
        </p>
        {blockchain.account === "" || blockchain.smartContract === null ? (
          <s.Container ai={"center"} jc={"center"}>
            <s.TextDescription
              style={{
                textAlign: "center",
                color: "var(--accent-text)",
              }}
            >
              Connect to the {CONFIG.NETWORK.NAME} network
            </s.TextDescription>
            <s.SpacerSmall />
            <s.StyledButton
              onClick={(e) => {
                e.preventDefault();
                dispatch(connect());
                getData();
              }}
            >
              CONNECT
            </s.StyledButton>
            {blockchain.errorMsg !== "" ? (
              <>
                <s.SpacerSmall />
                <s.TextDescription
                  style={{
                    textAlign: "center",
                    color: "var(--accent-text)",
                  }}
                >
                  {blockchain.errorMsg}
                </s.TextDescription>
              </>
            ) : null}
          </s.Container>
        ) : (
          <>
            <s.TextDescription
              style={{
                textAlign: "center",
                color: "var(--accent-text)",
              }}
            >
              {"Working Correctly"}
            </s.TextDescription>
            <s.SpacerMedium />
            <s.Container ai={"center"} jc={"center"} fd={"row"}>
              <s.StyledRoundButton
                style={{ lineHeight: 0.4 }}
                disabled={claimingNft ? 1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  //decrementMintAmount();
                }}
              >
                -
              </s.StyledRoundButton>
              <s.SpacerMedium />
              <s.TextDescription
                style={{
                  textAlign: "center",
                  color: "var(--accent-text)",
                }}
              >
                {mintAmount}
              </s.TextDescription>
              <s.SpacerMedium />
              <s.StyledRoundButton
                disabled={claimingNft ? 1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  //incrementMintAmount();
                }}
              >
                +
              </s.StyledRoundButton>
            </s.Container>
            <s.SpacerSmall />
            <s.Container ai={"center"} jc={"center"} fd={"row"}>
              <s.StyledButton
                disabled={claimingNft ? 1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  //claimNFTs();
                  getData();
                }}
              >
                {claimingNft ? "BUSY" : "DEPOSIT"}
              </s.StyledButton>
            </s.Container>
          </>
        )}
      </s.Container>
    </>
  );
}

export default TabGroup;