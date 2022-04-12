import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import getExternalLinkProps from "../../util/getExternalLinkProps";
import Grid from "../../components/Box/Grid";
import Box from "../../components/Box/Box";
import getThemeValue from "../../util/getThemeValue";
import Text from "../../components/Text/Text";
import Heading from "../../components/Heading/Heading";
import { Button } from "../../components/Button";
import { ModalBody, ModalCloseButton, ModalContainer, ModalContainerInner, ModalHeader, ModalTitle } from "../Modal";
import WalletCard, { MoreWalletCard } from "./WalletCard";
import config, { walletLocalStorageKey } from "./config";
import { Config, Login } from "./types";

interface Props {
  login: Login;
  onDismiss?: () => void;
  displayCount?: number;
}

const WalletWrapper = styled(Box)`
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder}; */
`;

/**
 * Checks local storage if we have saved the last wallet the user connected with
 * If we find something we put it at the top of the list
 *
 * @returns sorted config
 */
const getPreferredConfig = (walletConfig: Config[]) => {
  const preferredWalletName = localStorage.getItem(walletLocalStorageKey);
  const sortedConfig = walletConfig.sort((a: Config, b: Config) => a.priority - b.priority);

  if (!preferredWalletName) {
    return sortedConfig;
  }

  const preferredWallet = sortedConfig.find((sortedWalletConfig) => sortedWalletConfig.title === preferredWalletName);

  if (!preferredWallet) {
    return sortedConfig;
  }

  return [
    preferredWallet,
    ...sortedConfig.filter((sortedWalletConfig) => sortedWalletConfig.title !== preferredWalletName),
  ];
};

const ConnectModal: React.FC<Props> = ({ login, onDismiss = () => null, displayCount = 3 }) => {
  const [showMore, setShowMore] = useState(false);
  const theme = useTheme();
  const sortedConfig = getPreferredConfig(config).filter((c) => c.title === "Metamask");
  const displayListConfig = showMore ? sortedConfig : sortedConfig.slice(0, displayCount);

  console.log("sortedConfig", sortedConfig);
  return (
    <ModalContainer minWidth="340px">
      <ModalContainerInner>
        <ModalHeader>
          <ModalTitle>
            <Heading>Connect Wallet</Heading>
          </ModalTitle>
          <ModalCloseButton onDismiss={onDismiss} />
        </ModalHeader>
        <ModalBody width={["340px", null, "480px"]}>
          <WalletWrapper paddingBottom="24px" maxHeight="453px" overflowY="auto">
            {displayListConfig.map((wallet) => (
              <Box key={wallet.title} paddingLeft="30px" paddingRight="30px">
                <WalletCard walletConfig={wallet} login={login} onDismiss={onDismiss} />
              </Box>
            ))}
            {/* {!showMore && <MoreWalletCard onClick={() => setShowMore(true)} />} */}
          </WalletWrapper>
          {/* <Box p="24px">
          <Text textAlign="center" color="textSubtle" as="p" mb="16px">
            Haven&#39;t got a crypto wallet yet?
          </Text>
          <Button
            as="a"
            href="https://docs.pancakeswap.finance/get-started/connection-guide"
            variant="subtle"
            width="100%"
            {...getExternalLinkProps()}
          >
            Learn How to Connect
          </Button>
        </Box> */}
        </ModalBody>
      </ModalContainerInner>
    </ModalContainer>
  );
};

export default ConnectModal;
