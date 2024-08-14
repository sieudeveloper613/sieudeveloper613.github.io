import * as React from 'react';
import { Self } from '../..';
import CommonForm from './CommonForm'

import WindowFormContainer, { WindowForm } from '../../../../../../../common/WindowFormContainer';
import useProductTypeStore from '../../useProductTypeStore';
import styles from './ProductTypeForm.module.scss';

type IPartnerFormProps = {};

function PartnerForm(props: IPartnerFormProps) {
    const {
        displayForm,
    } = useProductTypeStore();



    return (
            <CommonForm displayForm={displayForm} />
    );
}

export default PartnerForm;
