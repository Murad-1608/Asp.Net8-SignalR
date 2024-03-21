using Microsoft.AspNetCore.SignalR;
using SignalR.WebUI.Models;

namespace SignalR.WebUI.Hubs
{
    public class ExampleTypeSafe : Hub<IExampleTypeSafe>
    {
        private static int ConnectedCount = 0;
        public async Task BroadcastMessageToAllClients(string message)
        {
            await Clients.All.ReceiveMessageForAllClients(message);
        }

        public async Task BroadcastMessageToAllClientsComplex(ProductModel model)
        {
            await Clients.All.ReceiveMessageForAllClientsComplex(model);
        }

        public async Task SendMessageForCallerClient(string message)
        {
            await Clients.Caller.ReceiveMessageForCallerClient(message);
        }

        public async Task SendMessageForOtherClient(string message)
        {
            await Clients.Others.ReceiveMessageForOtherClient(message);
        }

        public async Task SendMessageForIndividualClient(string message, string connectionId)
        {
            await Clients.Client(connectionId).ReceiveMessageForIndividualClient(message, connectionId);
        }

        public async Task SendMessageToGroupClient(string groupName, string message)
        {
            await Clients.Group(groupName).ReceiveMessageForGroupClient(message);
        }

        public async Task AddGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.Caller.ReceiveMessageForAllClients($"You added to {groupName} group");

            await Clients.Group(groupName).ReceiveMessageForGroupClient(($"{Context.ConnectionId} user added to {groupName} group"));
        }

        public async Task RemoveGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Caller.ReceiveMessageForAllClients($"You exit to {groupName} group");

            await Clients.Group(groupName).ReceiveMessageForGroupClient(($"{Context.ConnectionId} user exit to {groupName} group"));
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
