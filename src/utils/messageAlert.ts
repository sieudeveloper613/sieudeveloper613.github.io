import { toast } from 'react-toastify';

const toastConfig = Object.freeze({
    position: 'top-right',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

const messageAlert = (t: 'error' | 'success' | 'warning' | 'info' | 'default', mgs: string,time=3000) => {
    if (t === 'default') {
        toast(mgs, {...toastConfig,autoClose:time});
        return;
    }

    toast[t](mgs, {...toastConfig,autoClose:time});
};

export default messageAlert;
