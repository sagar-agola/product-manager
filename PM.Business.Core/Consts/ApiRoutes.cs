namespace PM.Business.Core.Consts
{
    /// <summary>
    /// Holds all api routes of system
    /// </summary>
    public class ApiRoutes
    {
        /// <summary>
        /// common prefix for all routes
        /// for versioning version prefix can be added here and it will be reflected to all routes
        /// </summary>
        private const string _root = "api/";

        public static class Product
        {
            private const string _base = _root + "products/";

            /// <summary>
            /// api/products
            /// </summary>
            public const string GetAll = _base;

            /// <summary>
            /// api/products/{id}
            /// </summary>
            public const string Get = _base + "{id}";

            /// <summary>
            /// api/products/save
            /// </summary>
            public const string Save = _base + "save";

            /// <summary>
            /// api/products/{id}
            /// </summary>
            public const string Delete = _base + "{id}";
        }
    }
}
