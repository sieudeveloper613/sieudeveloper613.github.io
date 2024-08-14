import processKeyword from './processKeyword';
import removeAllSpace from './removeAllSpace';

const preProcess = {
    removeAllSpace,
    keyword: processKeyword,
};

export default Object.freeze(preProcess);
