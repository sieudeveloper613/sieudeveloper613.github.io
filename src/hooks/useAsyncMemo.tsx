import * as React from 'react';

type DependencyList = ReadonlyArray<unknown>;

export default function useAsyncMemo<T>(defaultValue: T, factory: () => Promise<T> | T, deps: DependencyList): T {
    const [data, setData] = React.useState<T>(defaultValue);

    React.useEffect(() => {
        const cb = async () => {
            const [factoryResult] = await Promise.all([factory()]);
            setData(factoryResult);
        };
        cb();
    }, [...deps]); // Important !

    return data;
}
