using System;
using System.Collections.Generic;
//using System.Reactive.Linq;
using System.Threading.Channels;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
    public async Task BroadcastPaint(IList<int> startX, IList<int> startY, IList<int> endX, IList<int> endY, string color)
    {
        await Clients.AllExcept(Context.ConnectionId).SendAsync("ReceivePaint", startX, startY, endX, endY, color);
    }

    public override async Task OnConnectedAsync()
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, "Default");
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, "Default");
        await base.OnDisconnectedAsync(exception);
    }
}