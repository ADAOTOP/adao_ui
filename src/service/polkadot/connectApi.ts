import { ApiPromise, WsProvider } from '@polkadot/api';
// import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts } from '@polkadot/extension-dapp';
import type { InjectedExtension } from '@polkadot/extension-inject/types';
import { keyring } from '@polkadot/ui-keyring';
import { isTestChain } from '@polkadot/util';
import { cryptoWaitReady } from '@polkadot/util-crypto';
// import { objToArray } from 'utils';
import { TypeRegistry } from '@polkadot/types';
// import { getInjectedExtensions } from './wallet';
import { objToArray } from 'utils';
import { getInjectedExtensions } from './wallet';
import { buildTypes } from 'components/SideMenu/UserWidget/WalletAccountInfo/utils/utils';
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
export async function connectApi(endpoint: string, networkIdx: number, store: any) {
  const provider = new WsProvider(endpoint);
  const registry = new TypeRegistry();
  const types = buildTypes();
  registry.register(types);
  const api = await ApiPromise.create({
    provider: provider,
    registry,
    types,
  });
  // todo
  store.commit('connecting');

  api.on('error', (error: Error) => console.error('ApiPromise error-' + error.message));
  try {
    await api.isReadyOrError;
  } catch (e) {
    console.error('ApiPromise error2-' + e);
  }
  const injectedPromise = await getInjectedExtensions();
  let extensions: InjectedExtension[] = [];
  try {
    extensions = await injectedPromise;
  } catch (e) {
    console.error('injectedPromise error-' + e);
  }
  try {
    await loadAccounts(api);
    keyring.accounts.subject.subscribe((accounts) => {
      if (accounts) {
        const accountArray = objToArray(accounts);
        const accountMap = accountArray.map((account) => {
          const { address, meta } = account.json;
          return {
            address,
            name: meta.name.replace('\n              ', ''),
            source: meta.source,
          };
        });
        store.commitAccountMap(accountMap);
      }
    });
    store.commit('connected');
  } catch (err) {
    console.error(err);
    store.commit('offline');
  }
  return {
    api,
    extensions,
  };
}
