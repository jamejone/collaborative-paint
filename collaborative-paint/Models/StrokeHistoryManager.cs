using Newtonsoft.Json;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace collaborative_paint.Models
{
    public class StrokeHistoryManager : IStrokeHistoryManager
    {
        public ConcurrentQueue<Stroke> StrokeHistory { get; set; } = new ConcurrentQueue<Stroke>();

        public void SaveToHistory(IList<int> startXList, IList<int> startYList, IList<int> endXList,
            IList<int> endYList, string color)
        {
            Stroke s = new Stroke() 
            {
                StartXList = startXList,
                StartYList = startYList,
                EndXList = endXList,
                EndYList = endYList,
                Color = color
            };

            StrokeHistory.Enqueue(s);

            if (StrokeHistory.Count > 100) 
            {
                Stroke dummy;
                StrokeHistory.TryDequeue(out dummy);
            }
        }

        public string ToJson()
        {
            return JsonConvert.SerializeObject(StrokeHistory);
        }

        public void Clear()
        {
            StrokeHistory.Clear();
        }
    }

    public class Stroke
    {
        public IList<int> StartXList;
        public IList<int> StartYList;
        public IList<int> EndXList;
        public IList<int> EndYList;
        public string Color;
    }
}