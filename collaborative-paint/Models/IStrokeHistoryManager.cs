using System.Collections.Concurrent;
using System.Collections.Generic;

namespace collaborative_paint.Models
{
    public interface IStrokeHistoryManager
    {
        ConcurrentQueue<Stroke> StrokeHistory { get; } 

        void SaveToHistory(IList<int> startXList, IList<int> startYList, IList<int> endXList,
            IList<int> endYList, string color);

        string ToJson();
    }
}
