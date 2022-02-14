import { Percent } from '@kaco/sdkv2';
import React from 'react';
import { ONE_BIPS } from '../../../config/constants';
import { Text } from '@kaco/adao_ui';

/**
 * Formatted version of price impact text with warning colors
 */
export default function FormattedPriceImpact({ priceImpact }: { priceImpact?: Percent }) {
  return (
    <Text fontSize="12px" color="#9da6a6">
      {priceImpact ? (priceImpact.lessThan(ONE_BIPS) ? '<0.01%' : `${priceImpact.toFixed(2)}%`) : '-'}
    </Text>
  );
}
