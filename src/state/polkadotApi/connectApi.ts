import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { TypeRegistry } from '@polkadot/types';
import { buildTypes } from './utils';

let endpoint = '';
let apiPromise: ApiPromise | null = null;
const registry = new TypeRegistry();
const types = buildTypes();
registry.register(types);
const profileApiUrl = '/bind';

export const connected = async (endpoint: string, f?: () => Promise<any>) => {
  let api: ApiPromise | null = null;
  try {
    api = await connect(endpoint);
    if (f) {
      await f();
    }
    return api;
  } catch (e) {
    console.error(e);
    if (api) {
      await api.disconnect();
    }
  }
};

export const connect = async (newEndpoint: string) => {
  if (apiPromise) {
    if (endpoint === newEndpoint) {
      return apiPromise;
    }
    await apiPromise.disconnect();
  }
  endpoint = newEndpoint;
  // if we don't pass `types` here,
  // it seems the types data will be cleared when the runtime upgrade occurs
  const provider = new WsProvider(endpoint);
  // @ts-ignore
  apiPromise = new ApiPromise({
    provider,
  });
  await apiPromise.isReady;

  apiPromise.on('error', (error: Error) => console.error(error.message));
  return apiPromise;
};

export const disconnect = async () => {
  const api = getApi();
  console.log(1231231222222);
  api.disconnect();
};

const getApi = () => {
  if (apiPromise) {
    return apiPromise;
  }
  throw new Error('not connected');
};

export const checkIsEnableIndividualClaim = async (api: ApiPromise): Promise<boolean> => {
  try {
    const version = await api.query.dappsStaking.storageVersion();
    if (!version) {
      throw Error('invalid version');
    }
    const isEnableIndividualClaim = version.toHuman() !== 'V2_0_0';
    return isEnableIndividualClaim;
  } catch (error) {
    return false;
  }
};
// export const query = <T>(f: (query: ApiPromise['query']) => Promise<T>): Promise<T> => {
//   const api = getApi();
//   return f(api.query);
// };

// export const rpc = <T>(f: (rpc: ApiPromise['rpc']) => Promise<T>): Promise<T> => {
//   const api = getApi();
//   return f(api.rpc);
// };

// export const derive = <T>(f: (derive: ApiPromise['derive']) => Promise<T>): Promise<T> => {
//   const api = getApi();
//   return f(api.derive);
// };

// export const tx = (
//   f: (tx: ApiPromise['tx']) => SubmittableExtrinsic<'promise'>,
//   account: KeyringPairOrAddressAndSigner,
//   powSolution?: BN,
// ) => {
//   const api = getApi();

//   const [pairOrAddress, options] = extractTxArgs(account, powSolution);

//   return new Promise<Hash>(async (resolve, reject) => {
//     const unsub = await f(api.tx)
//       .signAndSend(pairOrAddress, options, (result: SubmittableResult) => {
//         if (!result.isCompleted) {
//           return;
//         }
//         if (unsub) {
//           unsub();
//         }
//         if (result.isError) {
//           reject('tx: result.isError');
//           return;
//         }
//         if (result.findRecord('system', 'ExtrinsicSuccess')) {
//           const sudid = result.findRecord('sudo', 'Sudid');
//           if (sudid) {
//             const d = sudid.event.data[0] as any;
//             if (d && d.isError) {
//               reject(`sudo: ${buildErrorText(api, d.asError.asModule)}`);
//               return;
//             }
//           }
//           const status = result.status;
//           const hash = status.isInBlock ? status.asInBlock : status.asFinalized;
//           resolve(hash);
//           return;
//         }
//         if (result.dispatchError) {
//           if (result.dispatchError.isModule) {
//             reject(buildErrorText(api, result.dispatchError.asModule));
//             return;
//           } else {
//             reject(`tx: ${result.dispatchError.toString()}`);
//             return;
//           }
//         }
//         reject('tx: unknown state');
//         return;
//       })
//       .catch(() => {
//         reject('tx: failed');
//         return;
//       });
//   });
// };

// export const sudo = (f: (tx: ApiPromise['tx']) => SubmittableExtrinsic<'promise'>, account: IKeyringPair) => {
//   const api = getApi();
//   return tx((tx) => api.tx.sudo.sudo(f(tx)), account);
// };

// const buildErrorText = (api: ApiPromise, mod: DispatchErrorModule) => {
//   const { docs, index, name, section } = api.registry.findMetaError(mod);
//   return `tx: ${section}.${name}: (${index}) ${docs.join(' ')}`;
// };

export const getRuntimeVersion = () => getApi().runtimeVersion;

// export const createType = <T extends Codec = Codec, K extends string = string>(
//   type: K,
//   ...params: unknown[]
// ): DetectCodec<T, K> => registry.createType(type, ...params);

// slow, be careful
export const buildKeyringPair = (mnemonic: string) => new Keyring({ type: 'ed25519' }).createFromUri(mnemonic);
// 查询绑定地址
export const getSignAddress = async (publickeys: string[]): Promise<any> => {
  try {
    const response = await fetch(`${profileApiUrl}/sign/address?polkadotKeys=${publickeys.join(',')}`);
    if (response.status !== 200) {
      return null;
    }
    const signAddresses = await response.json();
    return signAddresses;
  } catch (error) {
    return null;
  }
};

// 绑定
export const postSignAddress = async (
  sigInfos: {
    polkadotKey: string;
    evmAddress: string;
    signature: string;
  }[],
): Promise<any> => {
  try {
    const response = await fetch(`${profileApiUrl}/sign/address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sigInfos: sigInfos,
      }),
    });
    if (response.status !== 200) {
      return null;
    }
    const signAddressRes = await response.json();
    return signAddressRes;
  } catch (error) {
    return null;
  }
};
