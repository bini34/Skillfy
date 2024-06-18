using Microsoft.AspNetCore.Mvc;
using Skillfy.Server.Repo;
using System.Text.Json;

namespace Skillfy.Server.Api
{
    [ApiController]
    [Route("api/muxcallback")]
    public class muxcallback : ControllerBase
    {
        public Ilessonrepo _lrepo;
        public muxcallback(Ilessonrepo repo) {
            _lrepo = repo;
              
        }

        
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] JsonElement payload)
        {
            var muxEvent = JsonSerializer.Deserialize<MuxEvent>(payload.ToString());

            if (muxEvent.Type == "video.asset.ready")
            {
                var playbackUrl = muxEvent.Data.PlaybackIds.FirstOrDefault()?.PlaybackUrl;             
                var chapId = muxEvent.Data.AssetMetadata.Chapterid;
                var title = muxEvent.Data.AssetMetadata.Title;


                await _lrepo.SaveLessonAsync(chapId, playbackUrl, title);

                return Ok();
            }

            return BadRequest("Event type not handled.");
        }
    }

    public class MuxEvent
    {
        public string Type { get; set; }
        public MuxEventData Data { get; set; }
    }

    public class MuxEventData
    {
        public string Id { get; set; }
        public List<MuxPlaybackId> PlaybackIds { get; set; }
        public MuxAssetMetadata AssetMetadata { get; set; }
    }

    public class MuxPlaybackId
    {
        public string PlaybackUrl { get; set; }
    }
    public class MuxAssetMetadata
    {
        public int Chapterid { get; set; }
        public string Title { get; set; }
    }
}
