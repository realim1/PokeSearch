import type { NextPage } from "next";
import { useRouter } from "next/router";
import ClientOnly from "../../components/ClientOnly/ClientOnly";
import Pokemon from "../../components/Pokemon/Pokemon";

const Index: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	let idNum: number = typeof id === "string" ? parseInt(id) : NaN;
	return (
		<div>
			<ClientOnly>
				<Pokemon id={idNum} name={id} />
			</ClientOnly>
		</div>
	);
};

export default Index;
