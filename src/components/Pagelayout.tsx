import {ReactNode} from "react";

interface PagelayoutProps {
	children: ReactNode;
}
function Pagelayout({children}: PagelayoutProps) {
	return (
		<div>
			{children}
		</div>
	);
}

export default Pagelayout;