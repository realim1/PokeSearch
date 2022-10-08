import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Card from "./Card";

describe("Renders", () => {
	it("should render Card Header", () => {
		const { getByText } = render(<Card.Header>Test Card Header</Card.Header>);
		const cardHeaderElem = getByText("Test Card Header");
		expect(cardHeaderElem).toBeInTheDocument();
		expect(cardHeaderElem).toHaveClass("Card__header");
	});
	it("should render Card Body", () => {
		const { getByText } = render(<Card.Body>Test Card Body</Card.Body>);
		const cardBodyElem = getByText("Test Card Body");
		expect(cardBodyElem).toBeInTheDocument();
		expect(cardBodyElem).toHaveClass("Card__body");
	});
	it("should render Card Footer", () => {
		const { getByText } = render(<Card.Footer>Test Card Footer</Card.Footer>);
		const cardFooterElem = getByText("Test Card Footer");
		expect(cardFooterElem).toBeInTheDocument();
		expect(cardFooterElem).toHaveClass("Card__footer");
	});
	it("should render Card Img", () => {
		const { getByAltText } = render(
			<Card.Img src='https://picsum.photos/200/300' alt='picsum' />
		);
		const cardImgElem = getByAltText("picsum");
		expect(cardImgElem).toBeInTheDocument();
		expect(cardImgElem).toHaveClass("Card__img");
	});
});
