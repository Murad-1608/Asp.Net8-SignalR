﻿using Microsoft.AspNetCore.SignalR.Client;
using SignalR.ConsoleApp.Models;

var connection = new HubConnectionBuilder().WithUrl("https://localhost:44379/exampletypesafe").Build();

connection.StartAsync().ContinueWith((result) =>
{
    Console.WriteLine(result.IsCompletedSuccessfully ? "connected" : "connectedFail");
});


connection.On<ProductModel>("ReceiveMessageForAllClientsComplex", handler: (product) =>
{
    Console.WriteLine($"Received message: {product.Id} - {product.Name} - {product.Surname}");
});

Console.ReadKey();