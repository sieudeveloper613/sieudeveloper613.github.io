import { useContext } from 'react';
import { TextFieldContext } from './TextFieldProvider';

function useTextFieldStore() {
    return useContext(TextFieldContext);
}

export default useTextFieldStore;
