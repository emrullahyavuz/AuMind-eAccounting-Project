using AutoMapper;
using eMuhasebeServer.Domain.Entities;
using eMuhasebeServer.Domain.Events;
using MediatR;
using Microsoft.AspNetCore.Identity;
using TS.Result;

namespace eMuhasebeServer.Application.Features.Auth.SendConfirmEmail;

public sealed record SendConfirmEmailCommand(
    string Email) : IRequest<Result<string>>;

internal sealed class SendConfirmEmailCommandHandler(
    UserManager<AppUser> userManager,
    IMediator mediator) : IRequestHandler<SendConfirmEmailCommand, Result<string>>
{
    public async Task<Result<string>> Handle(SendConfirmEmailCommand request, CancellationToken cancellationToken)
    {
        AppUser? appUser = await userManager.FindByEmailAsync(request.Email);
        if (appUser == null)
        {
            return "Mail adresi sistemde kayıtlı değil.";
        }

        if (appUser.EmailConfirmed)
        {
            return "Mail adresi zaten onaylanmış.";
        }

        await mediator.Publish(new AppUserEvent(appUser.Id));

        return "Onay maili başarıyla gönderildi.";
    }
}