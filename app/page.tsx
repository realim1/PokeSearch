import Link from "next/link";
import PokesearchTemplate from "../templates/PokesearchTemplate/PokesearchTemplate";
import styles from "../styles/Home.module.scss";
import Search from "../components/Search/Search";

export default function Page() {
	return (
		<PokesearchTemplate>
			<main className={styles.main}>
				<h1 className={styles.title}>
					<span>Poké</span>Search
				</h1>
				<Search />
				<Link
					className={`${styles.link} ${styles["pixel-corners--wrapper"]}`}
					legacyBehavior={false}
					href={"/whos-that-pokemon"}>
					Try to Guess That Pokémon
				</Link>
			</main>
		</PokesearchTemplate>
	);
}
