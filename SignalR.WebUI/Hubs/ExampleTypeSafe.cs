using Microsoft.AspNetCore.SignalR;

namespace SignalR.WebUI.Hubs
{
    public class ExampleTypeSafe : Hub<IExampleTypeSafe>
    {
        public async Task BroadcastMessageToAllClients(string message)
        {
            await Clients.All.ReceiveMessageForAllClients(message);
        }
    }
}
