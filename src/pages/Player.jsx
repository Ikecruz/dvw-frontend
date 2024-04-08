import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSinglePlayer } from "../store/players";
import Plot from "react-plotly.js"

export default function Player() {

    // eslint-disable-next-line no-unused-vars
    const [socket, setSocket] = useState();
    const { player } = useParams()

    const [selectedPlayer, setSelectedPlayer] = useState();

    const [actualData, setActualData] = useState();
    const [predictedData, setPredictedData] = useState();

    const [sentimentDate, setSentimentData] = useState({
        values: [0, 0, 0],
        labels: ['Positive', 'Negative', 'Neutral'],
        type: "pie"
    })

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
                setActualData(response.actual);
                setPredictedData(response.predicted)
            }

            let posCount = 0;
            let negCount = 0;
            let neutralCount = 0;

            if (response.sentiments) {
                const sentiments = response.sentiments[0];
                console.log(sentiments)
                sentiments.forEach(sentiment => {
                    if (sentiment == "pos") posCount++
                    else if (sentiment == "neg") negCount++
                    else if (sentiment == "neutral") neutralCount++
                });

                setSentimentData({
                    values: [posCount, negCount, neutralCount],
                    labels: ['Positive', 'Negative', 'Neutral'],
                    type: "pie"
                })

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
                    <div className="w-[90%] m-auto my-10">
                        <p>Player Name: {selectedPlayer.name}</p>
                        <div className="flex gap-10">
                            <div>
                                <Plot
                                    data={[
                                        {
                                            x: actualData?.x,
                                            y: actualData?.y,
                                            type: 'scatter',
                                            mode: 'lines+markers',
                                            name: "Actual Points"
                                        },
                                        {
                                            x: predictedData?.x,
                                            y: predictedData?.y,
                                            type: 'scatter',
                                            mode: 'lines+markers',
                                            name: "Predicted Points"
                                        },
                                    ]}
                                    layout={{ width: 1200, height: 800, title: `${selectedPlayer.name}` }}
                                />
                            </div>
                            <div>
                                <Plot
                                    data={[sentimentDate]}
                                    layout={{
                                        title: selectedPlayer.name + " Sentiment Analysis",
                                        height: 400,
                                        width: 500
                                    }}

                                />
                            </div>
                        </div>
                    </div>
                </div> :
                <div>Loading...</div>
        }
    </>

}
