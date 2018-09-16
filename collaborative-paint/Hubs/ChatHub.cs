using collaborative_paint.Models;
using System;
using System.Collections.Generic;
using System.Linq;
//using System.Reactive.Linq;
using System.Threading.Channels;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
    private IStrokeHistoryManager _strokeHistoryManager;

    public ChatHub(IStrokeHistoryManager strokeHistoryManager)
    {
        _strokeHistoryManager = strokeHistoryManager;
    }

    public async Task BroadcastPaint(IList<int> startX, IList<int> startY, IList<int> endX, IList<int> endY, string color)
    {
        if (startX.Any())
        {
            _strokeHistoryManager.SaveToHistory(startX, startY, endX, endY, color);

            await Clients.AllExcept(Context.ConnectionId).SendAsync("ReceivePaint", startX, startY, endX, endY, color);
        }
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