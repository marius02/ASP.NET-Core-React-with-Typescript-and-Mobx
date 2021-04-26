using System.Threading.Tasks;
using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfileController : BaseApiController
    {
        public ProfileController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string userName)
        {
            return HandleResult(await Mediator.Send(new Details.Query {Username = userName}));
        }
    }
}
