export const players = [
    {
        key: "lebron",
        name: "LeBron James",
        image: "https://coolwallpapers.me/picsup/5061685-american-basketball-lebron-james-nba.jpg",
        team: "LA Lakers"
    },
    {
        key: "giannis",
        name: "Giannis Antetokounmpo",
        image: "https://api.time.com/wp-content/uploads/2017/10/giannis-antetokounmpo-next-generation-leaders.jpg?quality=85&w=1012",
        team: "Milwaukee Bucks"
    },
    {
        key: "russell",
        name: "Russell Westbrook",
        image: "https://www.hiptoro.com/wp-content/uploads/2019/07/Russel-Westbrook-Deals-e1562618668291.jpg",
        team: "LA Clippers"
    },
    {
        key: "durant",
        name: "Kevin Durant",
        image: "https://basketballforever.nyc3.cdn.digitaloceanspaces.com/wp-content/uploads/2020/05/10235510/Kevin-Durant-Brooklyn-Nets.jpg",
        team: "Phoenix Suns"
    },
    {
        key: "curry",
        name: "Stephen Curry",
        image: "https://www.varchev.com/wp-content/uploads/2018/05/curry1.jpg",
        team: "Golden State Warriors"
    }
]

export function getSinglePlayer(key) {
    const player = players.find((p) => p.key === key);
    return player;
}