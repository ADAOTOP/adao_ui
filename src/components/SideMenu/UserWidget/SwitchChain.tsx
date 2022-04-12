import React from 'react';
import { Text, Flex, useTooltip, Heading } from '@my/ui';
import BscSvg from '../imgs/icon_bsc.svg';
import SelectedSvg from '../imgs/icon_select.svg';
import SdnSvg from '../imgs/icon_sd.png';
import SlSvg from '../imgs/icon_sl.svg';
import { chainKey } from '../config';
const SwitchChain = () => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(SwitchChainTooltip, {
    trigger: 'click',
    tootipStyle: { padding: '30px 34px 20px' },
    placement: 'top-end',
    hideArrow: false,
    tooltipOffset: [20, 10],
  });
  return (
    <>
      {tooltipVisible && tooltip}
      <Flex
        style={{ cursor: 'pointer', transition: 'all .3s ease' }}
        ref={targetRef}
        alignItems="center"
        height="40px"
        width="92px"
        justifyContent="space-between"
        padding="0px 12px"
      >
        {/*  @ts-ignore */}
        {chainKey === 'SDN' ? (
          <>
            <img style={{ width: '20px' }} src={SdnSvg} alt="" />
            <Text color="text" fontSize="14px" bold>
              SDN
            </Text>
          </>
        ) : (
          <>
            <img style={{ width: '20px' }} src={BscSvg} alt="" />
            <Text color="text" fontSize="14px" bold>
              BSC
            </Text>
          </>
        )}
        <img
          style={{ width: '9px', height: '5px', transform: tooltipVisible ? '' : 'scaleY(-1)' }}
          src={SlSvg}
          alt=""
        />
      </Flex>
    </>
  );
};

const SwitchChainTooltip = (
  <div>
    <Heading>Select a Network</Heading>
    {/* <h3 style={{ fontSize: '16px', fontWeight: 800, color: theme.colors.primary }}>Select a Network</h3> */}
    <Text width="80%" fontSize="12px" bold mb="26px" mt="12px" color="textSubtle">
      {/*  @ts-ignore */}
      You are currently browsing ADao on {chainKey === 'SDN' ? 'SDN' : 'BSC'} network
    </Text>
    <Flex
      style={{ cursor: 'pointer' }}
      mb="12px"
      py="14px"
      px="19px"
      alignItems="center"
      justifyContent="space-between"
      background="#1A1A22"
      borderRadius="16px"
      onClick={() => (window.location.href = 'https://www.ADao.finance/')}
    >
      <Flex alignItems="center">
        <img src={BscSvg} width="24px" alt="" />
        <Text color="primary" bold ml="21px">
          BSC
        </Text>
      </Flex>
      {/*  @ts-ignore */}
      {chainKey === 'SDN' ? null : <img src={SelectedSvg} style={{ width: '24px' }} alt="" />}
    </Flex>

    <Flex
      style={{ cursor: 'pointer' }}
      mb="12px"
      py="14px"
      px="19px"
      alignItems="center"
      justifyContent="space-between"
      background="#1A1A22"
      borderRadius="16px"
      onClick={() => (window.location.href = 'https://shiden.ADao.finance/')}
    >
      <Flex alignItems="center">
        <img src={SdnSvg} width="24px" alt="" />
        <Text color="primary" bold ml="21px">
          SDN
        </Text>
      </Flex>
      {/*  @ts-ignore */}
      {chainKey === 'SDN' ? <img src={SelectedSvg} style={{ width: '24px' }} alt="" /> : null}
    </Flex>
  </div>
);

export default SwitchChain;
