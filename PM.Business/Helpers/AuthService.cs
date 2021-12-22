using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using PM.Business.Helpers.Contracts;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace PM.Business.Helpers
{
    public class AuthService : IAuthService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// access token from request headers 
        /// </summary>
        private JwtSecurityToken SecurityToken
        {
            get
            {
                // make sure 'authorization' header is present in request
                bool isHeaderPresent = _httpContextAccessor.HttpContext?.Request?.Headers?.TryGetValue("authorization", out StringValues authHeader) ?? false;

                if (isHeaderPresent == false)
                {
                    return null;
                }

                // remove 'bearer' word from header value
                // 'bearer <token value>   =>  <token value>
                string token = authHeader.ToString().Split(' ')?[1] ?? string.Empty;

                JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
                return handler.ReadToken(token) as JwtSecurityToken;
            }
        }

        public int UserId
        {
            get
            {
                if (SecurityToken == null)
                {
                    return 0;
                }

                Claim userId = SecurityToken.Claims.FirstOrDefault(c => c.Type == "nameid");

                return userId == null ? 0 : Convert.ToInt32(userId.Value);
            }
        }

        public int TimeZoneOffset
        {
            get
            {
                bool isHeaderPresent = _httpContextAccessor.HttpContext?.Request?.Headers?.TryGetValue("TimeZoneOffset", out StringValues header) ?? false;
                return isHeaderPresent ? int.Parse(header) : 0;
            }
        }
    }
}
