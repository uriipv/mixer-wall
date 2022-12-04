import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import * as s from "../styles/globalStyles";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import DepositPopup from "./DepositPopup.js";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function TabGroup({ config }) {
  const depositString = "Deposit";
  const withdrawString = "Withdraw";

  const [validationDepositMessage, setValidationDepositMessage] = useState("");
  const [validationWithdrawMessage, setValidationWithdrawMessage] =
    useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [isDepositActive, setIsDepositActive] = useState(true);
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const [depositValue, setDepositValue] = useState(10);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [inputPrivateKey, setInputPrivateKey] = useState(false);

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
    handleOpen();
    setValidationDepositMessage("");
  };

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

  const deposit = () => {
    handleClose();

    let totalCostWei = blockchain.web3.utils.toWei(
      depositValue.toString(),
      "ether"
    );
    let totalGasLimit = config.GAS_LIMIT;
    blockchain.smartContract.methods
      .deposit(privateKey)
      .send({
        gasLimit: totalGasLimit.toString(),
        to: config.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        setValidationDepositMessage(
          "There has been an error. Deposit could not be made."
        );
      })
      .then((receipt) => {
        setValidationDepositMessage(
          "Your deposit has been successfully completed."
        );
      });
  };

  const withdrawMoney = () => {
    blockchain.smartContract.methods
      .withdraw(inputPrivateKey)
      .send({
        gasLimit: config.GAS_LIMIT.toString(),
        to: config.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: 0,
      })
      .once("error", (err) => {
        setValidationWithdrawMessage(
          "There has been an error. Withdraw could not be made."
        );
      })
      .then((receipt) => {
        setValidationWithdrawMessage(
          "Your withdraw has been successfully completed."
        );
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
        <s.ButtonGroup
          style={{
            visibility:
              blockchain.account === "" || blockchain.smartContract === null
                ? "hidden"
                : "visible",
            height:
              blockchain.account === "" || blockchain.smartContract === null
                ? 0
                : 44,
          }}
        >
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
        <s.SpacerSmall />
        <s.TextDescription
          style={{
            textAlign: "center",
            color: "var(--primary-text)",
          }}
        >
          <s.StyledLink target={"_blank"} href={""}>
            {config.CONTRACT_ADDRESS}
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
              Connect to the {config.NETWORK.NAME} network
            </s.TextDescription>
            <s.SpacerSmall />
            <s.StyledButton
              onClick={(e) => {
                e.preventDefault();
                dispatch(connect());
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
            {isDepositActive ? (
              <>
                <s.Container ai={"center"} jc={"center"}>
                  <Box
                    style={{
                      width: "80%",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    <Slider
                      defaultValue={20}
                      marks={marks}
                      step={null}
                      onChange={handleDepositValueChange}
                    />
                  </Box>
                </s.Container>
                <s.SpacerMedium />
                <s.SpacerSmall />
                <s.TextDescription
                  style={{
                    textAlign: "center",
                    color: "var(--primary-text)",
                  }}
                >
                  {validationDepositMessage}
                </s.TextDescription>
                <s.Container ai={"center"} jc={"center"} fd={"row"}>
                  <s.StyledButton
                    onClick={(e) => {
                      e.preventDefault();
                      generatePrivateKey();
                    }}
                  >
                    DEPOSIT
                  </s.StyledButton>
                </s.Container>
              </>
            ) : (
              <>
                <s.SpacerXSmall />
                <s.Container ai={"center"} jc={"center"}>
                  <s.TextDescription
                    style={{
                      textAlign: "left",
                      color: "var(--primary-text)",
                    }}
                  >
                    Paste the private key linked to your deposit in order to
                    withdraw your funds.
                  </s.TextDescription>
                  <Box
                    component="form"
                    sx={{ "& > :not(style)": { m: 0.2, width: "40ch" } }}
                    style={{ backgroundColor: "white", borderRadius: "3px" }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Private key"
                      variant="filled"
                      size="small"
                      onChange={(e) => {
                        setInputPrivateKey(e.target.value);
                      }}
                    />
                  </Box>
                </s.Container>
                <s.SpacerMedium />
                <s.SpacerSmall />
                <s.TextDescription
                  style={{
                    textAlign: "center",
                    color: "var(--primary-text)",
                  }}
                >
                  {validationWithdrawMessage}
                </s.TextDescription>
                <s.Container ai={"center"} jc={"center"} fd={"row"}>
                  <s.StyledButton
                    onClick={(e) => {
                      e.preventDefault();
                      withdrawMoney();
                    }}
                  >
                    WITHDRAW
                  </s.StyledButton>
                </s.Container>
              </>
            )}
          </>
        )}
      </s.Container>
      <DepositPopup
        open={open}
        handleClose={handleClose}
        privateKey={privateKey}
        deposit={deposit}
      />
    </>
  );
}

export default TabGroup;
