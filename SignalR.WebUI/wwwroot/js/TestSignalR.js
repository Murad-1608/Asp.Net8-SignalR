$(document).ready(function () {

    const connection = new signalR.HubConnectionBuilder().
        withUrl("/exampletypesafe").
        configureLogging(signalR.LogLevel.Information).
        build();

    const broadcastingMessageToAllClientMethodCall = "BroadcastMessageToAllClients";

    const broadcastMessageToAllClientsComplexMethodCall = "BroadcastMessageToAllClientsComplex";
    const receiveMessageForAllClientsComplexMethodCall = "ReceiveMessageForAllClientsComplex";

    const ReceiveMessageForAllClientsClientMethodCall = "ReceiveMessageForAllClients";
    const ReceiveClientConnectedCountAllClientsMethodCall = "ReceiveClientConnectedCountAllClients";

    const SendMessageForCallerClientMethodCall = "SendMessageForCallerClient";
    const ReceiveMessageForCallerClientMethodCall = "ReceiveMessageForCallerClient";

    const SendMessageForOtherClientMethodCall = "SendMessageForOtherClient";
    const ReceiveMessageForOtherClientMethodCall = "ReceiveMessageForOtherClient";

    const SendMessageForIndividualClientMethodCall = "SendMessageForIndividualClient";
    const ReceiveMessageForIndividualClientMethodCall = "ReceiveMessageForIndividualClient";



    //const groupA = "GroupA";
    //const groupB = "GroupB";


    //dfdfd
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













    //Subscribe to method
    connection.on(ReceiveMessageForAllClientsClientMethodCall, (message) => {
        console.log("Incoming message", message);
    });

    connection.on(receiveMessageForAllClientsComplexMethodCall, (product) => {
        console.log(product);
    });


    connection.on(ReceiveMessageForCallerClientMethodCall, (message) => {
        console.log("Message for caller", message);
    });

    connection.on(ReceiveMessageForOtherClientMethodCall, (message) => {
        console.log("Message for other clients", message);
    });


    connection.on(ReceiveMessageForIndividualClientMethodCall, (message, connectionId) => {
        console.log(`Message for from ${connectionId}`, message);
    });


    //Hub'in isleme prosesi: button.click -> hub.Method -> connection.On(method)



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

    $("#btn-send-message-individual-client").click(function () {
        const message = "hello world";
        const connectionId = $("#input_connectionId").val();

        connection.invoke(SendMessageForIndividualClientMethodCall, message, connectionId).
            catch(err => console.error("Error"));
    });

    $("#btn-send-message-all-client-complex").click(function () {
        const product = {
            id: 1,
            name: "Murad",
            surname: "Muradov"
        };

        connection.invoke(broadcastMessageToAllClientsComplexMethodCall, product).
            catch(err => console.error("Error"));
    });
});