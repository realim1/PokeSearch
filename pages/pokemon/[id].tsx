import type { NextPage } from "next";
import { useRouter } from "next/router";
import ClientOnly from "../../components/ClientOnly/ClientOnly";
import Pokemon from "../../components/Pokemon/Pokemon";

const Index: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const idNum: number = typeof id === "string" ? parseInt(id) : NaN;
	const name: string = isNaN(idNum) && typeof id === "string" ? id : "";
	return (
		<div>
			<ClientOnly>
				<Pokemon id={idNum} name={name.toLowerCase()} />
			</ClientOnly>
		</div>
	);
};

export default Index;
