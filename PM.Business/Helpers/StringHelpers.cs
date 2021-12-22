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

        /// <summary>
        /// Capitalize first character and rest as it was
        /// </summary>
        public static string ToPascaleCase(this string input)
        {
            if (string.IsNullOrEmpty(input) || string.IsNullOrWhiteSpace(input))
            {
                return string.Empty;
            }

            if(input.Length == 1)
            {
                return input.ToUpper();
            }
            else
            {
                return $"{ input[0].ToString().ToUpper() }{ input[1..] }";
            }
        }
    }
}
