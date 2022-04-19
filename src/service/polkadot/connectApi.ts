import { ApiPromise } from '@polkadot/api';
// import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts } from '@polkadot/extension-dapp';
// import type { InjectedExtension } from '@polkadot/extension-inject/types';
import { keyring } from '@polkadot/ui-keyring';
import { isTestChain } from '@polkadot/util';
import { cryptoWaitReady } from '@polkadot/util-crypto';
// import { objToArray } from 'utils';
// import { getInjectedExtensions } from './wallet';
interface InjectedAccountExt {
  address: string;
  meta: {
    name: string;
    source: string;
    whenCreated: number;
  };
}

const loadAccounts = async (api: ApiPromise) => {
  await cryptoWaitReady();
  const [systemChain, injectedAccounts] = await Promise.all([
    api.rpc.system.chain() as any,
    web3Accounts().then((accounts): InjectedAccountExt[] =>
      accounts.map(
        ({ address, meta }, whenCreated): InjectedAccountExt => ({
          address,
          meta: {
            ...meta,
            name: `${meta.name} (
          ${meta.source === 'polkadot-js' ? 'extension' : meta.source}
          )`,
            whenCreated,
          },
        }),
      ),
    ),
  ]);
  const isDevelopment = isTestChain(systemChain ? systemChain.toString() : '<unknown>');
  keyring.loadAll(
    {
      genesisHash: api.genesisHash,
      isDevelopment,
      ss58Format: 5,
    },
    injectedAccounts,
  );
};
export default {};
