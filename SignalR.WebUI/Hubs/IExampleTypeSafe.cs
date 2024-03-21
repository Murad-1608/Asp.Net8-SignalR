using SignalR.WebUI.Models;

namespace SignalR.WebUI.Hubs
{
    public interface IExampleTypeSafe
    {
        public Task ReceiveMessageForAllClients(string message);
        public Task ReceiveMessageForAllClientsComplex(ProductModel product);
        public Task ReceiveClientConnectedCountAllClients(int count);
        public Task ReceiveMessageForCallerClient(string message);
        public Task ReceiveMessageForOtherClient(string message);
        public Task ReceiveMessageForIndividualClient(string message, string connectionId);
        public Task ReceiveMessageForGroupClient(string message);
    }
}
