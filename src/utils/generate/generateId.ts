let count: number = 0; // max 1_000_000

const generateId = (): string => {
    const strTimeMark = Date.now().toString(16); // 1829129d7f2
    const strCount = count.toString(16).padStart(5, '0');
    const strRandom = Math.floor(Math.random() * 1_000_000)
        .toString(16)
        .padStart(5, '0');

    if (count > 1_000_000) {
        count = 0;
    } else {
        count += 1;
    }

    return `${strCount}${strTimeMark}${strRandom}`;
};

export default generateId;
