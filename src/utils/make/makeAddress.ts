import IAddress from '../../sharetype/types/IAddress';

const makeAddress = (address: IAddress) => {
    return `${address.addressLine}, ${address.ward}, ${address.district}, ${address.city}`;
};

export default makeAddress;
