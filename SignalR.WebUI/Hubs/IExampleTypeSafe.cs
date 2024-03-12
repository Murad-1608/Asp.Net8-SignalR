namespace SignalR.WebUI.Hubs
{
    public interface IExampleTypeSafe
    {
        public Task ReceiveMessageForAllClients(string message);
        public Task ReceiveClientConnectedCountAllClients(int count);
    }
}
