import styles from "./loader.module.scss";

interface LoaderProps {
    children: JSX.Element;
    isLoading: boolean;
    height?: number;
    width?: number;
}

const Loader = ({ children, isLoading = false, height = 40, width = 120 }: LoaderProps) => {
    return isLoading ? (
        <div className={styles.loaderContainer} style={{ width, height }}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
        </div>
    ) : (
        children
    );
};

export default Loader;
