$(document).ready(function () {

    const broadcastingMessageToAllClientMethodCall = "BroadcastMessageToAllClients";

    const ReceiveMessageForAllClientsClientMethodCall = "ReceiveMessageForAllClients";

    //Connected with signalr
    const connection = new signalR.HubConnectionBuilder().
        withUrl("/examplehub").
        configureLogging(signalR.LogLevel.Information).
        build();


    function start() {
        connection.start().then(() => console.log("Connected with signalr"));

    }

    try {
        start();
    } catch {
        setTimeout(() => start(), 5000);
    }

    //Subscribe to method
    connection.on(ReceiveMessageForAllClientsClientMethodCall, (message) => {
        console.log("Incoming message",message);
    });

    $("#btn-send-message-all-client").click(function () {
        const message = "hello world";

        connection.invoke(broadcastingMessageToAllClientMethodCall, message).
            catch(err => console.error("Error"));


    });

});