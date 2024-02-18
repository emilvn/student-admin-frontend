import { PropsWithChildren, useState } from "react";
import House, { houseIcons } from "../helpers/House.ts";
import { Toaster } from "react-hot-toast";

interface IPageLayoutProps extends PropsWithChildren {
    title?: string;
}

function PageLayout({ children, title = "Hogwarts Admin" }: IPageLayoutProps) {
    const [house, setHouse] = useState<House>(House.GRYFFINDOR);

    const cycleHouse = () => {
        const houses = Object.values(House);
        const currentIndex = houses.indexOf(house);
        const nextIndex = (currentIndex + 1) % houses.length;
        setHouse(houses[nextIndex]);
    };

    const colors: Record<House, string> = {
        [House.GRYFFINDOR]: "bg-red-950 text-yellow-600",
        [House.HUFFLEPUFF]: "bg-yellow-600 text-black",
        [House.RAVENCLAW]: "bg-blue-950 text-slate-300",
        [House.SLYTHERIN]: "bg-green-950 text-slate-300"
    };
    const waterMarks: Record<House, string> = {
        [House.GRYFFINDOR]: "bg-gryffindor",
        [House.HUFFLEPUFF]: "bg-hufflepuff",
        [House.RAVENCLAW]: "bg-ravenclaw",
        [House.SLYTHERIN]: "bg-slytherin"
    };
    return (<>
            <div className={`${colors[house]} text-4xl p-4 font-semibold flex gap-2 select-none`}>
                <img src={houseIcons[house]} alt={house} className="w-12" onClick={cycleHouse} />
                {title}
            </div>
            <main className={`flex justify-center items-center min-h-screen mt-4 text-green-600`}>
                {children}

                <div
                    className={`${waterMarks[house]} absolute opacity-5 w-full h-full min-h-screen bg-no-repeat bg-contain bg-center pointer-events-none`}></div>
            </main>
            <Footer />
            <Toaster position={"bottom-center"} />
        </>
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