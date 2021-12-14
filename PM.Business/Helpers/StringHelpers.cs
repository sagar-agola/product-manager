namespace PM.Business.Helpers
{
    public static class StringHelpers
    {
        public static string CreateSlug(this string input)
        {
            if (string.IsNullOrEmpty(input) || string.IsNullOrWhiteSpace(input))
            {
                return string.Empty;
            }

            return input.ToLower().Replace(" ", "-");
        }
    }
}
