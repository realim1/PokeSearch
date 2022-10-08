import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Card from "./Card";

describe("Renders", () => {
	describe("Card Header => ", () => {
		it("should render Card Header", () => {
			const { getByText } = render(<Card.Header>Test Card Header</Card.Header>);
			const cardHeaderElem = getByText("Test Card Header");
			expect(cardHeaderElem).toBeInTheDocument();
			expect(cardHeaderElem).toHaveClass("Card__header");
		});
		it("should render Card Header with children", () => {
			const { container } = render(
				<Card>
					<Card.Header>
						<h1>Header Title</h1>
					</Card.Header>
				</Card>
			);
			const cardHeaderElem = container.querySelector(".Card__header");
			expect(cardHeaderElem?.children.length).toBeGreaterThan(0);
		});
		it("should add className to Card Header", () => {
			const { getByText } = render(
				<Card>
					<Card.Header className='Card__test'>Card Header Test</Card.Header>
				</Card>
			);
			const cardHeaderElem = getByText("Card Header Test");
			expect(cardHeaderElem).toHaveClass("Card__test");
		});
	});
	describe("Card Body => ", () => {
		it("should render Card Body", () => {
			const { getByText } = render(<Card.Body>Test Card Body</Card.Body>);
			const cardBodyElem = getByText("Test Card Body");
			expect(cardBodyElem).toBeInTheDocument();
			expect(cardBodyElem).toHaveClass("Card__body");
		});
		it("should render Card Body with children", () => {
			const { container } = render(
				<Card>
					<Card.Body>
						<section>Title</section>
						<div>Description</div>
					</Card.Body>
				</Card>
			);
			const cardBodyElem = container.querySelector(".Card__body");
			expect(cardBodyElem?.children.length).toBeGreaterThan(0);
		});
		it("should add className to Card Body", () => {
			const { getByText } = render(
				<Card>
					<Card.Header className='Card__test'>Card Body Test</Card.Header>
				</Card>
			);
			const cardBodyElem = getByText("Card Body Test");
			expect(cardBodyElem).toHaveClass("Card__test");
		});
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
