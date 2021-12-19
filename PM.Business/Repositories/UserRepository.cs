using Microsoft.EntityFrameworkCore;
using PM.Business.Contracts;
using PM.Business.Core.Consts;
using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.User;
using PM.Business.Helpers;
using PM.Database.DataContext;
using PM.Database.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace PM.Business.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ProductManagerDbContext _context;
        private readonly PasswordManager _passwordManager;
        private readonly TokenManager _tokenManager;

        public UserRepository(ProductManagerDbContext context,
                              PasswordManager passwordManager,
                              TokenManager tokenManager)
        {
            _context = context;
            _passwordManager = passwordManager;
            _tokenManager = tokenManager;
        }

        #region Login

        public async Task<ExecutionResult<LoginResponseModel>> Login(LoginRequestModel model)
        {
            var user = await _context.Users
                .Where(u => u.Email == model.Email && !u.DeletedAt.HasValue)
                .Select(u => new
                {
                    u.Id,
                    u.FirstName,
                    u.LastName,
                    u.Email,
                    u.IsEmailConfirmed,
                    u.PasswordHash,
                    u.PasswordSalt
                }).FirstOrDefaultAsync();

            if (user == null)
            {
                return new ExecutionResult<LoginResponseModel>(new ErrorInfo(MessageHelper.InvalidCredentials));
            }

            if (user.IsEmailConfirmed == false)
            {
                return new ExecutionResult<LoginResponseModel>(new ErrorInfo(MessageHelper.EmailNotConfirmed));
            }

            bool isCorrectPassword = _passwordManager.VerifyPasswordHash(model.Password, user.PasswordHash, user.PasswordSalt);
            if (isCorrectPassword == false)
            {
                return new ExecutionResult<LoginResponseModel>(new ErrorInfo(MessageHelper.InvalidCredentials));
            }

            LoginResponseModel result = new LoginResponseModel
            {
                AccessToken = _tokenManager.BuildToken(user.Id),
                Email = user.Email,
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
            };

            return new ExecutionResult<LoginResponseModel>(result);
        }

        #endregion

        #region Register

        public async Task<ExecutionResult> Register(RegisterRequestModel model)
        {
            bool isEmailExists = await _context.Users.AnyAsync(u => u.Email == model.Email && !u.DeletedAt.HasValue);
            if (isEmailExists)
            {
                return new ExecutionResult(
                    new ErrorInfo(
                        string.Format(
                            MessageHelper.ResourceAlreadyExists,
                            "User",
                            $"with \"{ model.Email }\" email")
                        )
                    );
            }

            _passwordManager.CreatePasswordHash(model.Password, out byte[] hash, out byte[] salt);

            User user = new User
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                PasswordHash = hash,
                PasswordSalt = salt,
                EmailToken = Guid.NewGuid(),
                IsEmailConfirmed = false,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return new ExecutionResult(new InfoMessage(string.Format(MessageHelper.SuccessMessage, "User", "registered")));
        }

        #endregion

        #region Confirm Email

        public async Task<ExecutionResult> ConfirmEmail(ConfirmEmailRequestModel model)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Id == model.Id && !u.DeletedAt.HasValue);

            if (user == null)
            {
                return new ExecutionResult(new ErrorInfo(string.Format(MessageHelper.NotFound, "User")));
            }

            if (user.IsEmailConfirmed)
            {
                return new ExecutionResult(new InfoMessage(MessageHelper.EmailAlreadyConfirmed));
            }

            if (model.EmailToken != user.EmailToken)
            {
                return new ExecutionResult(new ErrorInfo(string.Format(MessageHelper.Invalid, "Email Token")));
            }

            user.IsEmailConfirmed = true;
            user.EmailToken = null; // once email token is used set it to null so it can't be used again

            await _context.SaveChangesAsync();

            return new ExecutionResult(new InfoMessage(string.Format(MessageHelper.SuccessMessage, "Email", "Confirmed")));
        }

        #endregion
    }
}
