import { createContext, useContext } from 'react';
import { createOrderRequest } from '../api/payment';

const PaymentContext = createContext();

export const usePayment = () => {
  return useContext(PaymentContext);
};

// eslint-disable-next-line react/prop-types
export const PaymentProvider = ({ children }) => {

  const createOrder = async () => {
    try {
      const response = await createOrderRequest();
      window.location.href = response.data.initPoint;
      console.log(response.data.initPoint)
    } catch (error) {
      console.error('Error al crear la orden de pago:', error);
    }
  };


  const contextValue = {
    createOrder, // Puedes exponer esta función si necesitas llamarla manualmente desde el componente
  };


  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
    </PaymentContext.Provider>
  );
};
