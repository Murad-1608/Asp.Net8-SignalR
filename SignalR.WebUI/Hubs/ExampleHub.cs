﻿using Microsoft.AspNetCore.SignalR;

namespace SignalR.WebUI.Hubs
{
    public class ExampleHub : Hub, IExampleTypeSafe
    {
        public async Task BroadcastMessageToAllClients(string message)
        {
            await Clients.All.SendAsync("ReceiveMessageForAllClients", message);
        }
    }
}
