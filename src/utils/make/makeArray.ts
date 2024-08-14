interface IMakeArrayConfig {
    start: number;
    stop: number;
    step: number;
}

const makeArray = <T>(config: Partial<IMakeArrayConfig>, callback: (i: number) => T) => {
    const _config: IMakeArrayConfig = {
        start: 0,
        stop: 0,
        step: 1,
        ...config,
    };

    const result: T[] = [];

    for (let i = _config.start; i < _config.stop; i += _config.step) {
        result.push(callback(i));
    }

    return result;
};

export default makeArray;
