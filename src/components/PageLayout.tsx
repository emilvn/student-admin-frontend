import {PropsWithChildren} from "react";
import House from "../helpers/House.ts";

interface IPageLayoutProps extends PropsWithChildren {
	title?: string;
	house?: House;
}

function PageLayout({children, title = "Hogwarts admin", house = House.HOGWARTS}: IPageLayoutProps) {
	return (<>
			<Header house={house}>
				{title}
			</Header>
			<main className="flex justify-center items-center min-h-screen p-4 text-green-600">
				{children}
			</main>
			<Footer/>
		</>
	);
}

interface IHeaderProps extends PropsWithChildren {
	house: House;
}

function Header({children, house}: IHeaderProps) {
	const colors: Record<House, string> = {
		[House.GRYFFINDOR]: "bg-red-950 text-yellow-600",
		[House.HUFFLEPUFF]: "bg-yellow-600 text-black",
		[House.RAVENCLAW]: "bg-blue-950 text-slate-300",
		[House.SLYTHERIN]: "bg-green-950 text-slate-300",
		[House.HOGWARTS]: "bg-gray-800 text-white"
	};
	return (
		<div className={`text-4xl p-4 font-semibold ${colors[house]}`}>
			{children}
		</div>
	);
}

function Footer() {
	return (
		<div className="flex flex-row p-2 gap-2 text-gray-500 text-xs justify-center">
			<div className="flex-col">
				<div>
					Gryffindor Crest by Whitney Rosenberg from <a
					href="https://thenounproject.com/browse/icons/term/gryffindor-crest/" target="_blank"
					title="Gryffindor Crest Icons">Noun Project</a> (CC BY 3.0)
				</div>
				<div>
					Hufflepuff Crest by Whitney Rosenberg from <a
					href="https://thenounproject.com/browse/icons/term/hufflepuff-crest/" target="_blank"
					title="Hufflepuff Crest Icons">Noun Project</a> (CC BY 3.0)
				</div>
				<div>
					Slytherin Crest by Whitney Rosenberg from <a
					href="https://thenounproject.com/browse/icons/term/slytherin-crest/" target="_blank"
					title="Slytherin Crest Icons">Noun Project</a> (CC BY 3.0)
				</div>
			</div>
			<div className="flex-col">
				<div>
					Ravenclaw Crest by Whitney Rosenberg from <a
					href="https://thenounproject.com/browse/icons/term/ravenclaw-crest/" target="_blank"
					title="Ravenclaw Crest Icons">Noun Project</a> (CC BY 3.0)
				</div>
				<div>
					Hogwarts shield by Locad from <a
					href="https://thenounproject.com/browse/icons/term/hogwarts-shield/" target="_blank"
					title="Hogwarts shield Icons">Noun Project</a> (CC BY 3.0)
				</div>
			</div>
		</div>
	);
}


export default PageLayout;