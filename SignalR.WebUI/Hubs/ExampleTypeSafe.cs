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
    }
}
