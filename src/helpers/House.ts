enum House {
    GRYFFINDOR = "gryffindor",
    HUFFLEPUFF = "hufflepuff",
    RAVENCLAW = "ravenclaw",
    SLYTHERIN = "slytherin"
}

const houseIcons = {
    [House.GRYFFINDOR]: "./icons/gryffindor.png",
    [House.HUFFLEPUFF]: "./icons/hufflepuff.png",
    [House.RAVENCLAW]: "./icons/ravenclaw.png",
    [House.SLYTHERIN]: "./icons/slytherin.png"
};

export default House;
export { houseIcons };