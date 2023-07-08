import React from "react";
import * as s from "../styles/styles";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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

function DepositPopup({ open, handleClose, privateKey, deposit }) {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5">Your private key</Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please backup your private key. In order to withdraw and get your
            deposit back you will need it.
            <s.SpacerSmall />
            <s.ResponsiveWrapper flex={1}>
              <s.StyledLink
                target={"_blank"}
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
            </s.ResponsiveWrapper>
          </Typography>
          <s.SpacerMedium />
          <s.StyledButton onClick={deposit}>DEPOSIT</s.StyledButton>
        </Box>
      </Modal>
    </>
  );
}

export default DepositPopup;
