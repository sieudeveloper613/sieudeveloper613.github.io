const makeResult = <T>(callback: () => T): T => {
    return callback();
};

export default makeResult;
