import type { NextPage } from "next";
import { useRouter } from "next/router";
import ClientOnly from "../../components/ClientOnly/ClientOnly";
import Pokemon from "../../components/Pokemon/Pokemon";

const Index: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const identifier = id ? +id : null;

	return (
		<div>
			<ClientOnly>
				<Pokemon identifier={identifier} />
			</ClientOnly>
		</div>
	);
};

export default Index;
