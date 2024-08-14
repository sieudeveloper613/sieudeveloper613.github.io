export enum EResource {
    agriculturalProduce = 'agricultural-produce', //Nông sản
    customerProducts = 'customer-products', //sản phẩm tiêu dùng
    shippingService = 'shipping-service', // dịch vụ vận chuyển
    medicine = 'medicine',
    master = 'master',
    participants = 'participants', // đối tác
    MeatProduce = 'MeatProduce', //Thịt
    fisheries = 'fisheries', //thủy sản
    molluscs = 'molluscs', //Nhuyễn thể
    traceabilityChain = 'traceabilityChain', //Quản lý chuỗi TXNG
}
export enum EAgriculturalProducesRole {
    farmOrGarden = 'farm_garden', //trang trại
    processingFacility = 'processing-facility', //cơ sở chế biến
    distributionCenter = 'distribution-center',
    supermarket = 'supermarket',
    restaurant = 'restaurant',
}

export enum EMeatProducesRole {
    foodProcessingFacility = 'food-processing-facility', //cơ sở sản xuất thức ăn
    feedProcessingFacility = 'feed-facility', //cơ sở chăn nuôi
    slaughterProcessingFacility = 'slaughter-facility', //cơ sở giết mổ
    processingFacility = 'processing-facility', //cơ sở chế biến
}

export enum EFisheries {
    catchFacility = 'catchFacility', //cơ sở đánh bắt
    portFacility = 'portFacility', //cơ sở kinh doanh tại cảng
    processingFacility = 'processing-facility', //cơ sở chế biến
}

export enum EMolluscs {
    foodProcessingFacility = 'foodProcessingFacility', //cơ sở sản xuất thức ăn
    feedProcessingFacility = 'feedProcessingFacility', //cơ sở chăn nuôi
    processingFacility = 'processing-facility', //cơ sở chế biến
}

export enum ETraceabilityChain {
    wholesaleMarket = 'wholesaleMarket', //chợ đầu mối
    distributionCenter = 'distribution-center', //nhà phân phối
    processingFacility = 'processing-facility',
    dealerStore = 'dealerStore',
    supermarket = 'supermarket',
    restaurant = 'restaurant',
    hospital = 'hospital',
    drupStore = 'drupStore',
    supplierPage = 'supplierPage',
    companyLogistic = 'companyLogistic',
}

export enum ECustomerProductsRole {
    processingFacility = 'processing-facility', //cơ sở chế biến
    distributionCenter = 'distribution-center', //nhà phân phối
    supermarket = 'supermarket', //sieu thị
    restaurant = 'restaurant', //nhà hàng
    companyLogistic = 'companyLogistic', //đơn vị vận chuyển
    retail = 'retail', //cửa hàng bán lẻ
    materialpartner = 'supplierPage', //Đối tác nguyên liệu thô
}

export enum EMedicineRole {
    processingFacility = 'processing-facility',
    distributionCenter = 'distribution-center',
    hospitalOrDrugstore = 'hospital_drugstore',
}

export enum EParticipantsRole {
    processingFacility = 'processing-facility',
    distributionCenter = 'distribution-center',
    retail = 'retail',
    supermarket = 'supermarket',
    restaurant = 'restaurant',
    drupStore = 'drupStore',
    hospital = 'hospital',
}

export enum EStatisticalReportsRole {
    farmOrGarden = 'farm_garden',
    processingFacility = 'processing-facility',
    distributionCenter = 'distribution-center',
    retail = 'retail',
    hospital = 'hospital',
    drupStore = 'drupStore',
    dealerStore = 'dealerStore',
    supermarket = 'supermarket',
    restaurant = 'restaurant',
    companyLogistic = 'companyLogistic',
}

export enum ETransportSystemRole {
    supplier = 'supplier',
    gragage = 'gragage',
}

type TMakePermission<Resource, Role> = {
    resource: Resource;
    role: Role;
};

type TPermission =
    | TMakePermission<EResource.agriculturalProduce, EAgriculturalProducesRole>
    | TMakePermission<EResource.customerProducts, ECustomerProductsRole>
    | TMakePermission<EResource.shippingService, ETransportSystemRole>
    | TMakePermission<EResource.shippingService, 'undefined'>
    | TMakePermission<EResource.medicine, EMedicineRole>
    | TMakePermission<EResource.master, 'undefined'>
    | TMakePermission<EResource.participants, EParticipantsRole>
    | TMakePermission<EResource.MeatProduce, EMeatProducesRole>
    | TMakePermission<EResource.fisheries, EFisheries>
    | TMakePermission<EResource.molluscs, EMolluscs>
    | TMakePermission<EResource.traceabilityChain, ETraceabilityChain>;

export default TPermission;
