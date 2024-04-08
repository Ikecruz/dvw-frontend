import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSinglePlayer } from "../store/players";

export default function Player() {

    const [socket, setSocket] = useState();
    const { player } = useParams()

    const [selectedPlayer, setSelectedPlayer] = useState();

    useEffect(() => {
        const tempPlayer = getSinglePlayer(player);
        setSelectedPlayer(tempPlayer);
    }, [player])

    useEffect(() => {

        const URL = "wss://muefqknypf.execute-api.us-east-1.amazonaws.com/production/";

        const newSocket = new WebSocket(URL);

        newSocket.onopen = () => {
            console.log("Socket connected");
        }

        newSocket.onclose = () => {
            console.log("Socket disconnected");
        }

        setSocket(newSocket);

        return () => {
            if (newSocket) {
                newSocket.close();
            }
        }

    }, [])

    return <>
        {
            selectedPlayer ?
                <div className="">
                    <p>Player Name: {selectedPlayer.name}</p>
                </div> :
                <div>Loading...</div>
        }
    </>

}
