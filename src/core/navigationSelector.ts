import navigationConfig from '../config/navigationConfig';
import { TNavigationConfig } from '../config/navigationConfig/Types';
import TPermission, {
    EnterpriseRole,
    EAgriculturalProducesRole,
    EResource,
    ETraceabilityChain,
    ECustomerProductsRole,
    EMeatProducesRole,
    EParticipantsRole,
    ETransportSystemRole,
    EMedicineRole,
} from '../sharetype/TPermission';

const navigationSelector = (permission: TPermission): TNavigationConfig | undefined => {
    switch (permission.resource) {
        case EResource.master: {
            switch (permission.role) {
                case 'undefined': {
                    return navigationConfig.master;
                }
            }
            return undefined;
        }
        case EResource.agriculturalProduce: {
            switch (permission.role) {
                case EAgriculturalProducesRole.farmOrGarden: {
                    return navigationConfig.agriculturalProduce.farmGarden;
                }
                case EAgriculturalProducesRole.distributionCenter: {
                    return navigationConfig.agriculturalProduce.distributionCenter;
                }
                case EAgriculturalProducesRole.processingFacility: {
                    return navigationConfig.agriculturalProduce.processingFacility;
                }
                case EAgriculturalProducesRole.restaurant: {
                    return navigationConfig.agriculturalProduce.restaurant;
                }
                case EAgriculturalProducesRole.supermarket: {
                    return navigationConfig.agriculturalProduce.supermarket;
                }
            }
            return undefined;
        }
        case EResource.enterprise: { // TK doanh nghiep
            switch (permission.role) {
                case EnterpriseRole.enterprise: {
                    return navigationConfig.enterprise.Enterprise;
                }
                case EnterpriseRole.farmOrGarden: {
                    return navigationConfig.enterprise.farmGarden;
                }
                case EnterpriseRole.processingFacility: {
                    return navigationConfig.enterprise.processingFacility;
                }
                case EnterpriseRole.distributionCenter: {
                    return navigationConfig.enterprise.distributionCenter;
                }
                case EnterpriseRole.dealerStore: {
                    return navigationConfig.enterprise.dealerStore;
                }
                case EnterpriseRole.supermarket: {
                    return navigationConfig.enterprise.supermarket;
                }
                case EnterpriseRole.restaurant: {
                    return navigationConfig.enterprise.restaurant;
                }
            }
            return undefined;
        }
        case EResource.shippingService: {
            switch (permission.role) {
                // case 'undefined': {
                //     return navigationConfig.transportation;
                // }
                case ETransportSystemRole.supplier: {
                    return navigationConfig.transportation;
                }

            }
            return undefined;
        }
        case EResource.traceabilityChain: {
            switch (permission.role) {
                case ETraceabilityChain.distributionCenter: {
                    return navigationConfig.traceabilityChain.distributionCenter;
                }
                case ETraceabilityChain.supermarket: {
                    return navigationConfig.traceabilityChain.supermarket;
                }
                case ETraceabilityChain.dealerStore: {
                    return navigationConfig.traceabilityChain.dealerStore;
                }
                case ETraceabilityChain.restaurant: {
                    return navigationConfig.traceabilityChain.restaurant;
                }
                case ETraceabilityChain.companyLogistic: {
                    return navigationConfig.traceabilityChain.companyLogistic;
                }
                case ETraceabilityChain.wholesaleMarket:{
                    return navigationConfig.traceabilityChain.wholesaleMarket
                }
                case ETraceabilityChain.supplierPage:{
                    return navigationConfig.traceabilityChain.supplierPage
                }
            }
            return undefined;
        }
        case EResource.customerProducts: {
            switch (permission.role) {
                case ECustomerProductsRole.processingFacility: {
                    return navigationConfig.customerProducts.processingFacility;
                }
            }
            return undefined;
        }
        case EResource.medicine: {
            switch (permission.role) {
                case EMedicineRole.processingFacility: {
                    return navigationConfig.medicine.processingFacility;
                }
            }
            return undefined;
        }

        case EResource.participants: {
            switch (permission.role) {
                case EParticipantsRole.processingFacility: {
                    return navigationConfig.agriculturalProduce.processingFacility;
                }
                case EParticipantsRole.distributionCenter: {
                    return navigationConfig.agriculturalProduce.distributionCenter;
                }
                case EParticipantsRole.retail: {
                    return navigationConfig.traceabilityChain.dealerStore;
                }
                case EParticipantsRole.restaurant: {
                    return navigationConfig.traceabilityChain.restaurant;
                }
            }
            return undefined
        }
    }

    return undefined;
};

export default navigationSelector;
