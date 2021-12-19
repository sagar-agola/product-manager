using System.Security.Cryptography;
using System.Text;

namespace PM.Business.Helpers
{
    /// <summary>
    /// Contains methods for Creating and Verifing password hash
    /// </summary>
    public class PasswordManager
    {
        /// <summary>
        /// Creates password Hash from plain string
        /// </summary>
        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using HMACSHA512 hmac = new HMACSHA512();

            passwordSalt = hmac.Key; // first time generate random key and assign it to salt
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)); // compute hash using salt
        }

        /// <summary>
        /// Computes Hash of plain string using provided Salt and compares result with already computed Hash
        /// </summary>
        /// <returns>Returns boolean based on plain text matches with Hash or not</returns>
        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            // create instanse of HMACSHA512 using existing salt this will compute hash of plain string always same
            using (HMACSHA512 hmac = new HMACSHA512(passwordSalt))
            {
                byte[] computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

                // compare each byte of computed hash with previously computed hash and return false if atleast one byte is changed
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                    {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}
