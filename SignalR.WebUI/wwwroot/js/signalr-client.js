$(document).ready(function () {

    const broadcastingMessageToAllClientMethodCall = "BroadcastMessageToAllClients";

    const ReceiveMessageForAllClientsClientMethodCall = "ReceiveMessageForAllClients";
    const ReceiveClientConnectedCountAllClientsMethodCall = "ReceiveClientConnectedCountAllClients";

    const SendMessageForCallerClientMethodCall = "SendMessageForCallerClient";
    const ReceiveMessageForCallerClientMethodCall = "ReceiveMessageForCallerClient";

    const SendMessageForOtherClientMethodCall = "SendMessageForOtherClient";
    const ReceiveMessageForOtherClientMethodCall = "ReceiveMessageForOtherClient";
    //Connected with signalr
    //const connection = new signalR.HubConnectionBuilder().
    //    withUrl("/exampletypesafe").
    //    configureLogging(signalR.LogLevel.Information).
    //    build();


    function start() {
        connection.start().then(() => {
            $("#connectionId").html(`ConnectionId : ${connection.connectionId}`);

            console.log("Connected signalr", "ConnectionId:connection.connectionId");


        });

    }

    try {
        //start();
    } catch {
        setTimeout(() => start(), 5000);
    }







    //Subscribe to method
    connection.on(ReceiveMessageForAllClientsClientMethodCall, (message) => {
        console.log("Incoming message", message);
    });

    connection.on(ReceiveMessageForCallerClientMethodCall, (message) => {
        console.log("Message for caller", message);
    });

    connection.on(ReceiveMessageForOtherClientMethodCall, (message) => {
        console.log("Message for other clients", message);
    });


    //Show connected clients count with hub
    var span_client_count = $("#span-connected-client-count");
    connection.on(ReceiveClientConnectedCountAllClientsMethodCall, (count) => {
        span_client_count.text(count);
    });

    $("#btn-send-message-all-client").click(function () {
        const message = "hello world";

        connection.invoke(broadcastingMessageToAllClientMethodCall, message).
            catch(err => console.error("Error"));
    });

    $("#btn-send-message-caller-client").click(function () {
        const message = "hello world";

        connection.invoke(SendMessageForCallerClientMethodCall, message).
            catch(err => console.error("Error"));

    });

    $("#btn-send-message-other-client").click(function () {
        const message = "hello world";

        connection.invoke(SendMessageForOtherClientMethodCall, message).
            catch(err => console.error("Error"));
    });
});