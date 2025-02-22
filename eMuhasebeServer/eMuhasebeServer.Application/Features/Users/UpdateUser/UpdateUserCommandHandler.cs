﻿using AutoMapper;
using eMuhasebeServer.Domain.Entities;
using eMuhasebeServer.Domain.Events;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace eMuhasebeServer.Application.Features.Users.UpdateUser;

internal sealed class UpdateUserCommandHandler(
    IMediator mediator,
    UserManager<AppUser> userManager, 
    IMapper mapper) : IRequestHandler<UpdateUserCommand, Result<string>>
{
    public async Task<Result<string>> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        AppUser? appUser = await userManager.FindByIdAsync(request.Id.ToString());
        bool isMailChanged = false;

        if (appUser is null)
        {
            return Result<string>.Failure("User not found.");
        }

        if(appUser.UserName != request.UserName)
        {
            bool isUserNameExists = await userManager.Users.AnyAsync(p => p.UserName == request.UserName, cancellationToken);

            if (isUserNameExists)
            {
                return Result<string>.Failure("Bu kullanıcı adı daha önce alınmış. Lütfen farklı bir kullanıcı adı deneyin");
            }
        }

        if (appUser.Email != request.Email)
        {
            bool isEmailExists = await userManager.Users.AnyAsync(p => p.Email == request.Email, cancellationToken);

            if (isEmailExists)
            {
                return Result<string>.Failure("Bu e-posta adresi daha önce alınmış. Lütfen farklı bir e-posta adresi deneyin");
            }

            isMailChanged = true;
            appUser.EmailConfirmed = false;
        }

        mapper.Map(request, appUser);

        IdentityResult identityResult = await userManager.UpdateAsync(appUser);

        if (!identityResult.Succeeded)
        {
            return Result<string>.Failure(identityResult.Errors.Select(s => s.Description).ToList());
        }

        if (request.Password is not null)
        {
            string token = await userManager.GeneratePasswordResetTokenAsync(appUser);
            identityResult = await userManager.ResetPasswordAsync(appUser, token, request.Password);

            if (!identityResult.Succeeded)
            {
                return Result<string>.Failure(identityResult.Errors.Select(s => s.Description).ToList());
            }
        }
       
        if (isMailChanged) 
        { 
            await mediator.Publish(new AppUserEvent(appUser.Id));
        }

        return "Kullanıcı bilgileri başarıyla güncellendi.";
    }
}
