using Microsoft.AspNetCore.SignalR;

namespace SignalR.WebUI.Hubs
{
    public class ExampleTypeSafe : Hub<IExampleTypeSafe>
    {
        private static int ConnectedCount = 0;
        public async Task BroadcastMessageToAllClients(string message)
        {
            await Clients.All.ReceiveMessageForAllClients(message);
        }

        public async Task SendMessageForCallerClient(string message)
        {
            await Clients.Caller.ReceiveMessageForCallerClient(message);
        }

        public async Task SendMessageForOtherClient(string message)
        {
            await Clients.Others.ReceiveMessageForOtherClient(message);
        }


        #region OnConnectionAndDisConnection
        public override async Task OnConnectedAsync()
        {
            ConnectedCount++;
            await Clients.All.ReceiveClientConnectedCountAllClients(ConnectedCount);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            ConnectedCount--;

            await Clients.All.ReceiveClientConnectedCountAllClients(ConnectedCount);
        }
        #endregion

    }
}
