using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(
                    u => u.UserName == _userAccessor.GetUserName(), cancellationToken: cancellationToken);

                var photo = user?.Photos.FirstOrDefault(x => x.Id == request.Id);
                if (photo is null) return null;
                var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
                if (currentMain is not null) currentMain.IsMain = false;
                photo.IsMain = true;
                var result = await _context.SaveChangesAsync(cancellationToken) > 0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem setting the main photo");
            }
        }
    }
}
