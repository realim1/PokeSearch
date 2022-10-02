import styles from "./ProgressBar.module.scss";

interface ProgressBarProps {
	label?: string;
	value: number;
	maxValue: number;
	className?: string;
}

const ProgressBar = ({
	label,
	value,
	maxValue,
	className = "",
}: ProgressBarProps) => {
	const calWidth = () => {
		return ((value / maxValue) * 100).toFixed(2);
	};

	return (
		<div className={styles["ProgressBar"]}>
			<div className={`${styles["ProgressBar__label"]}`}>{label}</div>
			<div className={styles["ProgressBar__progress"]}>
				<div
					className={`${styles["ProgressBar__progressbar"]} ${className}`}
					style={{ width: `${calWidth()}%` }}
					aria-valuemax={maxValue}
					aria-valuemin={0}
					aria-valuenow={value}>
					{value}
				</div>
			</div>
		</div>
	);
};

export default ProgressBar;
