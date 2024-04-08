import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSinglePlayer } from "../store/players";

export default function Player() {

    // eslint-disable-next-line no-unused-vars
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
            const tempPlayer = getSinglePlayer(player);
            sendMessage(newSocket, tempPlayer.name);
        }

        newSocket.onclose = () => {
            console.log("Socket disconnected");
        }

        newSocket.onmessage = (message) => {
            const response = JSON.parse(message.data)

            if (response.predicted || response.actual) {
                console.log(response);
            }  
        }

        setSocket(newSocket);

        return () => {
            if (newSocket) {
                newSocket.close();
            }
        }

    }, [])

    const sendMessage = (mySocket, playerName) => {
        let msgObject = {
            action: "sendMessage",
            data: playerName
        };

        //Send message
        mySocket.send(JSON.stringify(msgObject));
    }

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
