const accentsMap = [
    'aàảãáạăằẳẵắặâầẩẫấậ',
    'dđ',
    'eèẻẽéẹêềểễếệ',
    'iìỉĩíị',
    'oòỏõóọôồổỗốộơờởỡớợ',
    'uùủũúụưừửữứự',
    'yỳỷỹýỵ',
];

const removeAccents = (str: string) => {
    for (let i = 0; i < accentsMap.length; i++) {
        const re = new RegExp('[' + accentsMap[i].substring(1) + ']', 'g');
        const char = accentsMap[i].charAt(0);
        str = str.replace(re, char);
    }
    return str;
};

const processKeyword = (v: string) => {
    if (typeof v !== 'string') {
        console.error(v, ` is not a string`);
        return '';
    }
    return removeAccents(v.toLowerCase().replace(/\s+/g, ' ').trim());
};

export default processKeyword;
