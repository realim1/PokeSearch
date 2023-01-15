import type { NextPage } from "next";
import { useRouter } from "next/router";
import { removeSpecialChars } from "../../utils/utils";

import ClientOnly from "../../components/ClientOnly/ClientOnly";
import Pokemon from "../../components/Pokemon/Pokemon";

const Index: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const idNum: number =
		typeof id === "string" ? parseInt(removeSpecialChars(id)) : NaN;
	const name: string =
		isNaN(idNum) && typeof id === "string" ? removeSpecialChars(id) : "";

	return (
		<div>
			<ClientOnly>
				<Pokemon id={idNum} name={name.toLowerCase()} />
			</ClientOnly>
		</div>
	);
};

export default Index;
