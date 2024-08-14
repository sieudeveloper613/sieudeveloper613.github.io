import create from './create';
import list from './list';
import remove from './remove';
import update from './update';
import reset from './reset';

const gardenCode = Object.freeze({
    remove,
    list,
    create,
    update,
    reset,
});

export default gardenCode;
