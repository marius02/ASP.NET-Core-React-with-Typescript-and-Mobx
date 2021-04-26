﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;

            public Handler(IUserAccessor userAccessor, IPhotoAccessor photoAccessor, DataContext context)
            {
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(
                    u => u.UserName == _userAccessor.GetUserName(), cancellationToken: cancellationToken);

                var photo = user?.Photos.FirstOrDefault(x => x.Id == request.Id);
                if (photo is null) return null;
                if (photo.IsMain) return Result<Unit>.Failure("You cannot delete your main photo");
                var result = await _photoAccessor.DeletePhoto(photo.Id);
                if(result is null) return Result<Unit>.Failure("Problem deleting photo");
                user.Photos.Remove(photo);
                var success = await _context.SaveChangesAsync(cancellationToken) > 0;
                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem deleting photo from api");
            }
        }
    }
}
