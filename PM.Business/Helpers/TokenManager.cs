using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PM.Business.Core.AppSettings;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PM.Business.Helpers
{
    public class TokenManager
    {
        private readonly AppSettings _appSettings;

        public TokenManager(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        /// <summary>
        /// Generates JTW token from userId 
        /// </summary>
        public string BuildToken(int userId)
        {
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Token));
            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            Claim[] claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.NameId, userId.ToString())
            };

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: _appSettings.JwtIssuer,
                audience: _appSettings.JwtAudience,
                claims: claims,
                expires: DateTime.Now.AddHours(_appSettings.TokenExpiryHour),
                signingCredentials: creds
            );

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            return tokenHandler.WriteToken(token);
        }
    }
}
