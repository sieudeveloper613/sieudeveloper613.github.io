import styles from './NoContentPage.module.scss';

type Props = {};

function NoContentPage({}: Props) {
    return (
        <div className={styles['wp-no-content']}>
            <h2>Xin lỗi, trang này đang được phát triển. Vui lòng quay lại sau.</h2>
        </div>
    );
}

export default NoContentPage;
