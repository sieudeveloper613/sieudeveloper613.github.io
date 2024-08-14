import * as React from 'react';
import { GardenCodeContext } from './GardenCodeProvider';

function useGardenCodeStore() {
    return React.useContext(GardenCodeContext);
}

export default useGardenCodeStore;
