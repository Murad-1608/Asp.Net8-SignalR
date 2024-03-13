namespace SignalR.WebUI.Hubs
{
    public interface IExampleTypeSafe
    {
        public Task ReceiveMessageForAllClients(string message);
        public Task ReceiveClientConnectedCountAllClients(int count);
        public Task ReceiveMessageForCallerClient(string message);
        public Task ReceiveMessageForOtherClient(string message);
    }
}
