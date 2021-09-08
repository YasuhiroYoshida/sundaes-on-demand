import { createContext, useContext, useState, useMemo } from 'react';

const OrderPhase = createContext();

export const useOrderPhase = () => {
  const context = useContext(OrderPhase);
  if (!context)
    throw new Error('useOrderPhase must be used within an OrderPhaseProvider');

  return context;
};

export const OrderPhaseProvider = (props) => {
  const [orderPhase, setOrderPhase] = useState('inProgress');
  const value = useMemo(() => {
    return [orderPhase, setOrderPhase];
  }, [orderPhase]);
  return <OrderPhase.Provider value={value} {...props} />;
};
