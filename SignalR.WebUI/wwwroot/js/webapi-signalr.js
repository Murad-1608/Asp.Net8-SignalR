$(document).ready(function () {

    const connection = new signalR.HubConnectionBuilder().
        withUrl("https://localhost:7050/myhub").
        configureLogging(signalR.LogLevel.Information).
        build();

    const sendAll = "sendAllMessage";

    connection.on(sendAll, (message) => {
        console.log("Message from WebApi", message);
    });



    async function start() {
        try {
            await connection.start().then(() => {
                $("#connectionId").html(`ConnectionId : ${connection.connectionId}`);

                console.log("Connected with signalr");

            });

        } catch (err) {
            console.log("Can't connection with hub", err);
            setTimeout(() => start(), 3000);
        }
    }

    start();
});