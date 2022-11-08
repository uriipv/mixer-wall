import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function TabGroup() {
  const depositString = "Deposit";
  const withdrawString = "Withdraw";

  const [isDepositActive, setIsDepositActive] = useState(true);
  const dispatch = useDispatch();
  const [claimingNft, setClaimingNft] = useState(false);
  const blockchain = useSelector((state) => state.blockchain);
  const [mintAmount, setMintAmount] = useState(1);
  const [depositValue, setDepositValue] = useState(10);
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

  const handleDepositValueChange = (event, newValue) => {
    if (newValue == 20) {
      setDepositValue(10);
    } else if (newValue == 40) {
      setDepositValue(100);
    } else if (newValue == 60) {
      setDepositValue(1000);
    } else if (newValue == 80) {
      setDepositValue(10000);
    }
  };

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

  const marks = [
    {
      value: 20,
      label: (
        <>
          10
          <br />
          $ROSE
        </>
      ),
    },
    {
      value: 40,
      label: (
        <>
          100
          <br />
          $ROSE
        </>
      ),
    },
    {
      value: 60,
      label: (
        <>
          1000
          <br />
          $ROSE
        </>
      ),
    },
    {
      value: 80,
      label: (
        <>
          10000
          <br />
          $ROSE
        </>
      ),
    },
  ];

  const claimNFTs = () => {
    let totalCostWei = blockchain.web3.utils.toWei(
      depositValue.toString(),
      "ether"
    );
    let totalGasLimit = CONFIG.GAS_LIMIT;
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, mintAmount)
      .send({
        gasLimit: totalGasLimit.toString(),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);

        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

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
            onClick={() => setIsDepositActive(true)}
            style={{
              borderTopLeftRadius: 5,
            }}
          >
            {depositString}
          </s.Tab>
          <s.Tab
            active={!isDepositActive}
            onClick={() => setIsDepositActive(false)}
            style={{
              borderTopRightRadius: 5,
            }}
          >
            {withdrawString}
          </s.Tab>
        </s.ButtonGroup>
        {/*<p
          style={{
            backgroundColor: "blue",
          }}
        >
          Your payment selection: {isDepositActive ? "OK" : "JUAS"}
        </p>*/}
        <s.SpacerSmall />
        <s.TextDescription
          style={{
            textAlign: "center",
            color: "var(--primary-text)",
          }}
        >
          <s.StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
            {CONFIG.CONTRACT_ADDRESS}
          </s.StyledLink>
        </s.TextDescription>
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
            <s.Container ai={"center"} jc={"center"}>
              <Box
                style={{ width: "80%", textAlign: "center", color: "white" }}
              >
                <Slider
                  aria-label="Custom marks"
                  defaultValue={20}
                  marks={marks}
                  step={null}
                  onChange={handleDepositValueChange}
                />
              </Box>
            </s.Container>
            <s.SpacerMedium />
            <s.SpacerSmall />
            <s.Container ai={"center"} jc={"center"} fd={"row"}>
              <s.StyledButton
                disabled={claimingNft ? 1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  console.log("KOH: " + depositValue);

                  claimNFTs();
                  getData();
                }}
              >
                {claimingNft
                  ? "BUSY"
                  : isDepositActive
                  ? "DEPOSIT"
                  : "WITHDRAW"}
              </s.StyledButton>
            </s.Container>
          </>
        )}
      </s.Container>
    </>
  );
}

export default TabGroup;
