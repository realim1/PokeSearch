import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import ClientOnly from "../../components/ClientOnly/ClientOnly";
import Pokemon from "../../components/Pokemon/Pokemon";

const Index: NextPage = (pokemon) => {
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
