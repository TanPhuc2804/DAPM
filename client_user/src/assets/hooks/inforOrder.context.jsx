
import { createContext, useContext, useState } from 'react';

export const InforOrder = createContext({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phonenumber: "",
    paymentMethod: ""
});

export const InforOrderWapper = ({ children }) => {
    const [infor, setInfor] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        phonenumber: "",
        paymentMethod: ""
    });

    return (
        <InforOrder.Provider value={{ infor, setInfor }}>
            {children}
        </InforOrder.Provider>
    );
};


export const useInfor = () => useContext(InforOrder);
