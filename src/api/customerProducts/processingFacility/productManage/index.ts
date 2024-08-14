import create from './create';
import find from './find';
import list from './list';
import listProducts from './listProducts';
import listSuppliers from './listSuppliers';
import listCodeMaterial from './listCodeMaterial';
import remove from './remove';
import update from './update';
import findByPid from './findByPId';
const productManage = {
    findByPid,
    find,
    create,
    remove,
    update,
    list,
    listProducts,
    listCodeMaterial,
    listSuppliers,
};

export default productManage;
