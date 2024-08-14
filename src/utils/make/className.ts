type TStyles = {
    readonly [key: string]: string;
};

const makeClassName = (_classNames: any[], styles: TStyles | undefined = undefined): string => {
    let classNames: string[] = _classNames
        .filter((element) => {
            if (!element) return false;
            return true;
        })
        .map((element) => {
            const strClassName = String(element);
            return strClassName.replace(/\s+/, ' ').trim();
        })
        .filter((element) => {
            if (element === 'true' || element === 'false') return false;
            // remove empty string and element is 'undefined'
            return element.length > 0;
        });

    let strClassNameResult = classNames.join(' ');

    if (styles === undefined) {
        return strClassNameResult;
    }

    return strClassNameResult
        .split(' ')
        .map((elmnt) => {
            return styles[elmnt];
        })
        .join(' ');
};

export default makeClassName;
