import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Pill from "./Pill";

describe("Renders", () => {
	it("should render", () => {
		const { getByText } = render(<Pill>Test Pill</Pill>);
		const pillElem = getByText("Test Pill");
		expect(pillElem).toBeInTheDocument();
	});
	it("should render with children", () => {
		const { getByText } = render(
			<Pill>
				Test Pill <div>Element</div>
			</Pill>
		);
		const pillElem = getByText("Test Pill");
		expect(pillElem.children.length).toBeGreaterThan(0);
	});
	it("should add className to Pill", () => {
		const { getByText } = render(<Pill className='Pill__test'>Test Pill</Pill>);
		const pillElem = getByText("Test Pill");
		expect(pillElem).toHaveClass("Pill__test");
	});
});
