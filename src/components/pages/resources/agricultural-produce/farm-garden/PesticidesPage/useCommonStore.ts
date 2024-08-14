import * as React from 'react';
import { CommonContext } from './CommonProvider';

export default function useCommonStore() {
    return React.useContext(CommonContext);
}
