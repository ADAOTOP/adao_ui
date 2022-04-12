import { ChainId } from '..';
/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */
export declare class Currency {
    readonly decimals: number;
    readonly symbol?: string;
    readonly name?: string;
    /**
     * The only instance of the base class `Currency`.
     */
    static readonly ETHER: {
        56: Currency;
        87: Currency;
        336: Currency;
        82: Currency;
        592: Currency;
        81: Currency;
    };
    /**
     * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
     * @param decimals decimals of the currency
     * @param symbol symbol of the currency
     * @param name of the currency
     */
    protected constructor(decimals: number, symbol?: string, name?: string);
}
declare const ETHER: {
    56: Currency;
    87: Currency;
    336: Currency;
    82: Currency;
    592: Currency;
    81: Currency;
};
export { ETHER };
