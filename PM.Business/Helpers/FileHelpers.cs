using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace PM.Business.Helpers
{
    public static class FileHelpers
    {
        public static async Task<string> UploadImage(IFormFile image)
        {
            string uniqueImageName = Guid.NewGuid() + Path.GetExtension(image.FileName);
            string path = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\Images\Products", uniqueImageName);

            using (FileStream fileStream = new FileStream(path, FileMode.Create))
            {
                await image.CopyToAsync(fileStream);
            }

            return @"Images\Products\" + uniqueImageName;
        }

        public static void Delete(string relativePath)
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), relativePath);

            if (File.Exists(path))
            {
                File.Delete(path);
            }
        }
    }
}
