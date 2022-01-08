using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PM.Database.Models;

namespace PM.Database.Configurations
{
    public class FormAnswerConfiguration : IEntityTypeConfiguration<FormAnswer>
    {
        public void Configure(EntityTypeBuilder<FormAnswer> builder)
        {
            builder.Property(p => p.AnswerData).HasConversion(
                c => JsonConvert.SerializeObject(c, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }),
                c => JsonConvert.DeserializeObject<JObject>(c, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore })
            );
        }
    }
}
