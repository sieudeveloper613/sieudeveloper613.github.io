import { useContext } from 'react';
import { ImageFieldContext } from './ImageFieldProvider';

function useImageFieldStore() {
    return useContext(ImageFieldContext);
}

export default useImageFieldStore;