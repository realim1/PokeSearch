import { removeSpecialChars } from "../../../utils/utils";

import ClientOnly from "../../../components/ClientOnly/ClientOnly";
import PokesearchTemplate from "../../../templates/PokesearchTemplate/PokesearchTemplate";
import Pokemon from "../../../components/Pokemon/Pokemon";

const Index = ({ params }: { params: { id: string } }) => {
	const id = params.id;
	const idNum: number =
		typeof id === "string" ? parseInt(removeSpecialChars(id)) : NaN;
	const name: string =
		isNaN(idNum) && typeof id === "string" ? removeSpecialChars(id) : "";

	return (
		<PokesearchTemplate>
			<ClientOnly>
				<Pokemon id={idNum} name={name.toLowerCase()} />
			</ClientOnly>
		</PokesearchTemplate>
	);
};

export default Index;
