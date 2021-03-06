import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import pricePerIndex from '../constants';
import { formatCurrency } from '../utilities';

const OrderDetails = createContext();

export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      'useOrderDetails must be used within an OrderDetailsProvider'
    );
  }

  return context;
};

export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const updateItemCount = useCallback(
    (itemName, itemCount, optionType) => {
      const { [optionType]: prevOptionMap } = optionCounts;
      const newOptionMap = new Map(prevOptionMap);
      newOptionMap.set(itemName, parseInt(itemCount));

      const newOptionCounts = { ...optionCounts };
      newOptionCounts[optionType] = newOptionMap;

      setOptionCounts(newOptionCounts);
    },
    [optionCounts]
  );
  const resetOrder = () => {
    setOptionCounts({
      scoops: new Map(),
      toppings: new Map(),
    });
  };
  const value = [{ ...optionCounts, totals }, updateItemCount, resetOrder]; // first element will be called orderDetails by caller

  return <OrderDetails.Provider value={value} {...props} />;
};

const calculateSubtotal = (optionType, optionCounts) => {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerIndex[optionType];
};
