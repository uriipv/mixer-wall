import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ResponsiveWrapper } from "./App";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function TabGroup() {
  const depositString = "Deposit";
  const withdrawString = "Withdraw";

  const [privateKey, setPrivateKey] = useState("");
  const [isDepositActive, setIsDepositActive] = useState(true);
  const dispatch = useDispatch();
  const [claimingNft, setClaimingNft] = useState(false);
  const blockchain = useSelector((state) => state.blockchain);
  const [mintAmount, setMintAmount] = useState(1);
  const [depositValue, setDepositValue] = useState(10);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const generatePrivateKey = () => {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 36;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    setPrivateKey(password);
    handleOpen(false);
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
    if (privateKey.length == 0) {
      generatePrivateKey();
      return;
    }
    let totalCostWei = blockchain.web3.utils.toWei(
      depositValue.toString(),
      "ether"
    );
    let totalGasLimit = CONFIG.GAS_LIMIT;
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .deposit("hola")
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
        console.log("RECEPTION:");
        console.log(receipt.events["DepositDone"].returnValues["privateKey"]);

        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const withdrawMoney = () => {
    let totalGasLimit = CONFIG.GAS_LIMIT;
    setClaimingNft(true);
    blockchain.smartContract.methods
      .withdraw("hola")
      .send({
        gasLimit: totalGasLimit.toString(),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: 0,
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
        <s.TextDescription
          style={{
            textAlign: "center",
            color: "var(--primary-text)",
          }}
        ></s.TextDescription>
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
              /*onClick={handleOpen}*/
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
                hidden={!isDepositActive}
                onClick={(e) => {
                  e.preventDefault();
                  console.log("KOH: " + depositValue);

                  claimNFTs();
                  getData();
                }}
              >
                DEPOSIT
              </s.StyledButton>
              <s.StyledButton
                disabled={claimingNft ? 1 : 0}
                hidden={isDepositActive}
                onClick={(e) => {
                  e.preventDefault();
                  console.log("KOH: " + depositValue);

                  withdrawMoney();
                  getData();
                }}
              >
                WITHDRAW
              </s.StyledButton>
            </s.Container>
          </>
        )}
      </s.Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5">Your private key</Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p>
              Please backup your private key. In order to withdraw and get your
              deposit back you will need.
            </p>
            <s.SpacerSmall />
            <ResponsiveWrapper flex={1}>
              <s.StyledLink
                target={"_blank"}
                href="#"
                onClick={() => {
                  navigator.clipboard.writeText(privateKey);
                }}
              >
                {privateKey}
              </s.StyledLink>
              <s.SpacerSmall />
              <s.StyledRoundButton
                onClick={() => {
                  navigator.clipboard.writeText(privateKey);
                }}
              >
                <ContentCopyIcon style={{ color: "white" }} />
              </s.StyledRoundButton>
            </ResponsiveWrapper>
          </Typography>
          <s.SpacerMedium />
          <s.StyledButton onClick={handleClose}>DEPOSIT</s.StyledButton>
        </Box>
      </Modal>
    </>
  );
}

export default TabGroup;
