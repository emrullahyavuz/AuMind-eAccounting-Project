using AutoMapper;
using eMuhasebeServer.Application.Services;
using eMuhasebeServer.Domain.Entities;
using eMuhasebeServer.Domain.Events;
using GenericRepository;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace eMuhasebeServer.Application.Features.Auth.Register;

internal sealed class RegisterCommandHandler(
    UserManager<AppUser> userManager,
    IUnitOfWork unitOfWork,
    ICacheService cacheService,
    IMediator mediator,
    IMapper mapper) : IRequestHandler<RegisterCommand, Result<string>>
{
    public async Task<Result<string>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        bool isUserNameExists = await userManager.Users
            .AnyAsync(u => u.UserName == request.UserName, cancellationToken);

        if (isUserNameExists)
        {
            return Result<string>.Failure("Bu kullanıcı adı daha önce alınmış. Lütfen farklı bir kullanıcı adı deneyin.");
        }

        bool isEmailExists = await userManager.Users
            .AnyAsync(u => u.Email == request.Email, cancellationToken);

        if (isEmailExists)
        {
            return Result<string>.Failure("Bu e-posta adresi daha önce alınmış. Lütfen farklı bir e-posta adresi deneyin.");
        }

        AppUser appUser = mapper.Map<AppUser>(request);

        IdentityResult result = await userManager.CreateAsync(appUser, request.Password);

        if (!result.Succeeded)
        {
            return Result<string>.Failure(result.Errors.Select(e => e.Description).ToList());
        }

        await unitOfWork.SaveChangesAsync(cancellationToken);
        cacheService.Remove("users");
        await mediator.Publish(new AppUserEvent(appUser.Id), cancellationToken);

        return "Kayıt işlemi başarıyla tamamlandı.";
    }
}