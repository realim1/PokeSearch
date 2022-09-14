import type { NextPage } from "next";
import { useRouter } from "next/router";

const Index: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;

	return <div>{id}</div>;
};

export default Index;
