import React, { useEffect, useState } from "react";
import * as s from "./styles/styles";
import MainView from "./views/MainView";

function App() {
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    GAS_LIMIT: 0,
  });

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

  return (
    <s.Screen>
      <s.Container
        flex={1}
        ai={"center"}
        style={{ padding: 24, backgroundColor: "var(--primary)" }}
        image="/config/images/bg2.png"
      >
        <s.StyledLogo alt={"logo"} src={"/config/images/logo.png"} />

        <s.SpacerSmall />

        <s.ResponsiveWrapper flex={1} style={{ padding: 24 }}>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <s.StyledImg alt={"example"} src={"/config/images/example.gif"} />
          </s.Container>
          <s.SpacerLarge />

          <MainView config={CONFIG} />

          <s.SpacerLarge />
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <s.StyledImg alt={"example"} src={"/config/images/example.gif"} />
          </s.Container>
        </s.ResponsiveWrapper>

        <s.SpacerMedium />
      </s.Container>
    </s.Screen>
  );
}

export default App;
